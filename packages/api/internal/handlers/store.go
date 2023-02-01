package handlers

import (
	"fmt"
	"net/http"
	"os"
	"sync"

	"github.com/devbookhq/devbook-api/packages/api/internal/api"
	"github.com/devbookhq/devbook-api/packages/api/internal/nomad"
	"github.com/devbookhq/devbook-api/packages/api/internal/supabase"
	"github.com/gin-gonic/gin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/trace"
)

type APIStore struct {
	sessionsCache *nomad.SessionCache
	nomad         *nomad.NomadClient
	supabase      *supabase.DB
	NextId        int64
	Lock          sync.Mutex
	tracer        trace.Tracer
}

func NewAPIStore() *APIStore {
	fmt.Println("Initializing API store")

	tracer := otel.Tracer("api")

	nomadClient := nomad.InitNomadClient()
	fmt.Println("Initialized Nomad client")
	supabaseClient, err := supabase.NewClient()
	if err != nil {
		panic(err)
	}
	fmt.Println("Initialized Supabase client")

	// TODO: Build only templates that changed
	// go func() {
	// 	err := nomadClient.RebuildTemplates(tracer)
	// 	if err != nil {
	// 		fmt.Fprintf(os.Stderr, "Error rebuilding templates\n: %s", err)
	// 	}
	// }()

	var initialSessions []*api.Session
	initialSessions, sessionErr := nomadClient.GetSessions()
	if sessionErr != nil {
		initialSessions = []*api.Session{}
		fmt.Fprintf(os.Stderr, "Error loading current sessions from Nomad\n: %s", sessionErr)
	}

	cache := nomad.NewSessionCache(nomadClient.DeleteSession, initialSessions)
	// go cache.KeepInSync(nomadClient)

	return &APIStore{
		nomad:         nomadClient,
		supabase:      supabaseClient,
		NextId:        1000,
		sessionsCache: cache,
		tracer:        tracer,
	}
}

func (a *APIStore) Close() {
	a.nomad.Close()
	a.supabase.Close()
}

func (a *APIStore) validateAPIKey(apiKey *string) (string, bool, error) {
	if apiKey == nil {
		return "", false, fmt.Errorf("no API key")
	}

	if *apiKey == "" {
		return "", false, fmt.Errorf("no API key")
	}

	if *apiKey == api.APIAdminKey {
		return "admin", true, nil
	}

	user, err := a.supabase.GetUserID(*apiKey)

	if err != nil || user == nil {
		return "", false, fmt.Errorf("error validating API key: %+v", err)
	}

	return user.ID, false, nil
}

// This function wraps sending of an error in the Error format, and
// handling the failure to marshal that.
func (a *APIStore) sendAPIStoreError(c *gin.Context, code int, message string) {
	apiErr := api.Error{
		Code:    int32(code),
		Message: message,
	}

	c.Error(fmt.Errorf(message))
	c.JSON(code, apiErr)
}

func (a *APIStore) GetHealth(c *gin.Context) {
	c.String(http.StatusOK, "Health check successful")
}

func (a *APIStore) isOwner(codeSnippetID string, userID string) (bool, error) {
	codeSnippets, err := a.supabase.GetCodeSnippets(userID)
	if err != nil {
		return false, fmt.Errorf("error getting code snippets from Supabase: %+v", err)
	}

	found := false
	for _, v := range *codeSnippets {
		if v.ID == codeSnippetID {
			found = true
		}
	}

	return found, nil
}
