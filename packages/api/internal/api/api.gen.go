// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.16.2 DO NOT EDIT.
package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/oapi-codegen/runtime"
)

// ServerInterface represents all server handlers.
type ServerInterface interface {

	// (GET /envs)
	GetEnvs(c *gin.Context)

	// (POST /envs)
	PostEnvs(c *gin.Context)

	// (DELETE /envs/{envID})
	DeleteEnvsEnvID(c *gin.Context, envID EnvID)

	// (POST /envs/{envID})
	PostEnvsEnvID(c *gin.Context, envID EnvID)

	// (GET /envs/{envID}/builds/{buildID})
	GetEnvsEnvIDBuildsBuildID(c *gin.Context, envID EnvID, buildID BuildID, params GetEnvsEnvIDBuildsBuildIDParams)

	// (POST /envs/{envID}/builds/{buildID}/logs)
	PostEnvsEnvIDBuildsBuildIDLogs(c *gin.Context, envID EnvID, buildID BuildID)

	// (GET /health)
	GetHealth(c *gin.Context)

	// (GET /instances)
	GetInstances(c *gin.Context)

	// (POST /instances)
	PostInstances(c *gin.Context)

	// (POST /instances/{instanceID}/refreshes)
	PostInstancesInstanceIDRefreshes(c *gin.Context, instanceID InstanceID)

	// (GET /sandboxes)
	GetSandboxes(c *gin.Context)

	// (POST /sandboxes)
	PostSandboxes(c *gin.Context)

	// (DELETE /sandboxes/{sandboxID})
	DeleteSandboxesSandboxID(c *gin.Context, sandboxID SandboxID)

	// (GET /sandboxes/{sandboxID}/logs)
	GetSandboxesSandboxIDLogs(c *gin.Context, sandboxID SandboxID, params GetSandboxesSandboxIDLogsParams)

	// (POST /sandboxes/{sandboxID}/refreshes)
	PostSandboxesSandboxIDRefreshes(c *gin.Context, sandboxID SandboxID)

	// (GET /templates)
	GetTemplates(c *gin.Context)

	// (POST /templates)
	PostTemplates(c *gin.Context)

	// (DELETE /templates/{templateID})
	DeleteTemplatesTemplateID(c *gin.Context, templateID TemplateID)

	// (POST /templates/{templateID})
	PostTemplatesTemplateID(c *gin.Context, templateID TemplateID)

	// (GET /templates/{templateID}/builds/{buildID})
	GetTemplatesTemplateIDBuildsBuildID(c *gin.Context, templateID TemplateID, buildID BuildID, params GetTemplatesTemplateIDBuildsBuildIDParams)

	// (POST /templates/{templateID}/builds/{buildID}/logs)
	PostTemplatesTemplateIDBuildsBuildIDLogs(c *gin.Context, templateID TemplateID, buildID BuildID)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandler       func(*gin.Context, error, int)
}

type MiddlewareFunc func(c *gin.Context)

// GetEnvs operation middleware
func (siw *ServerInterfaceWrapper) GetEnvs(c *gin.Context) {

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetEnvs(c)
}

// PostEnvs operation middleware
func (siw *ServerInterfaceWrapper) PostEnvs(c *gin.Context) {

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostEnvs(c)
}

// DeleteEnvsEnvID operation middleware
func (siw *ServerInterfaceWrapper) DeleteEnvsEnvID(c *gin.Context) {

	var err error

	// ------------- Path parameter "envID" -------------
	var envID EnvID

	err = runtime.BindStyledParameter("simple", false, "envID", c.Param("envID"), &envID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter envID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.DeleteEnvsEnvID(c, envID)
}

// PostEnvsEnvID operation middleware
func (siw *ServerInterfaceWrapper) PostEnvsEnvID(c *gin.Context) {

	var err error

	// ------------- Path parameter "envID" -------------
	var envID EnvID

	err = runtime.BindStyledParameter("simple", false, "envID", c.Param("envID"), &envID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter envID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostEnvsEnvID(c, envID)
}

// GetEnvsEnvIDBuildsBuildID operation middleware
func (siw *ServerInterfaceWrapper) GetEnvsEnvIDBuildsBuildID(c *gin.Context) {

	var err error

	// ------------- Path parameter "envID" -------------
	var envID EnvID

	err = runtime.BindStyledParameter("simple", false, "envID", c.Param("envID"), &envID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter envID: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "buildID" -------------
	var buildID BuildID

	err = runtime.BindStyledParameter("simple", false, "buildID", c.Param("buildID"), &buildID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter buildID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(AccessTokenAuthScopes, []string{})

	// Parameter object where we will unmarshal all parameters from the context
	var params GetEnvsEnvIDBuildsBuildIDParams

	// ------------- Optional query parameter "logsOffset" -------------

	err = runtime.BindQueryParameter("form", true, false, "logsOffset", c.Request.URL.Query(), &params.LogsOffset)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter logsOffset: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetEnvsEnvIDBuildsBuildID(c, envID, buildID, params)
}

// PostEnvsEnvIDBuildsBuildIDLogs operation middleware
func (siw *ServerInterfaceWrapper) PostEnvsEnvIDBuildsBuildIDLogs(c *gin.Context) {

	var err error

	// ------------- Path parameter "envID" -------------
	var envID EnvID

	err = runtime.BindStyledParameter("simple", false, "envID", c.Param("envID"), &envID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter envID: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "buildID" -------------
	var buildID BuildID

	err = runtime.BindStyledParameter("simple", false, "buildID", c.Param("buildID"), &buildID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter buildID: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostEnvsEnvIDBuildsBuildIDLogs(c, envID, buildID)
}

// GetHealth operation middleware
func (siw *ServerInterfaceWrapper) GetHealth(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetHealth(c)
}

// GetInstances operation middleware
func (siw *ServerInterfaceWrapper) GetInstances(c *gin.Context) {

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetInstances(c)
}

// PostInstances operation middleware
func (siw *ServerInterfaceWrapper) PostInstances(c *gin.Context) {

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostInstances(c)
}

// PostInstancesInstanceIDRefreshes operation middleware
func (siw *ServerInterfaceWrapper) PostInstancesInstanceIDRefreshes(c *gin.Context) {

	var err error

	// ------------- Path parameter "instanceID" -------------
	var instanceID InstanceID

	err = runtime.BindStyledParameter("simple", false, "instanceID", c.Param("instanceID"), &instanceID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter instanceID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostInstancesInstanceIDRefreshes(c, instanceID)
}

// GetSandboxes operation middleware
func (siw *ServerInterfaceWrapper) GetSandboxes(c *gin.Context) {

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetSandboxes(c)
}

// PostSandboxes operation middleware
func (siw *ServerInterfaceWrapper) PostSandboxes(c *gin.Context) {

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostSandboxes(c)
}

// DeleteSandboxesSandboxID operation middleware
func (siw *ServerInterfaceWrapper) DeleteSandboxesSandboxID(c *gin.Context) {

	var err error

	// ------------- Path parameter "sandboxID" -------------
	var sandboxID SandboxID

	err = runtime.BindStyledParameter("simple", false, "sandboxID", c.Param("sandboxID"), &sandboxID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter sandboxID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.DeleteSandboxesSandboxID(c, sandboxID)
}

// GetSandboxesSandboxIDLogs operation middleware
func (siw *ServerInterfaceWrapper) GetSandboxesSandboxIDLogs(c *gin.Context) {

	var err error

	// ------------- Path parameter "sandboxID" -------------
	var sandboxID SandboxID

	err = runtime.BindStyledParameter("simple", false, "sandboxID", c.Param("sandboxID"), &sandboxID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter sandboxID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(ApiKeyAuthScopes, []string{})

	// Parameter object where we will unmarshal all parameters from the context
	var params GetSandboxesSandboxIDLogsParams

	// ------------- Optional query parameter "offset" -------------

	err = runtime.BindQueryParameter("form", true, false, "offset", c.Request.URL.Query(), &params.Offset)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter offset: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Optional query parameter "limit" -------------

	err = runtime.BindQueryParameter("form", true, false, "limit", c.Request.URL.Query(), &params.Limit)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter limit: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetSandboxesSandboxIDLogs(c, sandboxID, params)
}

// PostSandboxesSandboxIDRefreshes operation middleware
func (siw *ServerInterfaceWrapper) PostSandboxesSandboxIDRefreshes(c *gin.Context) {

	var err error

	// ------------- Path parameter "sandboxID" -------------
	var sandboxID SandboxID

	err = runtime.BindStyledParameter("simple", false, "sandboxID", c.Param("sandboxID"), &sandboxID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter sandboxID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(ApiKeyAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostSandboxesSandboxIDRefreshes(c, sandboxID)
}

// GetTemplates operation middleware
func (siw *ServerInterfaceWrapper) GetTemplates(c *gin.Context) {

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetTemplates(c)
}

// PostTemplates operation middleware
func (siw *ServerInterfaceWrapper) PostTemplates(c *gin.Context) {

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostTemplates(c)
}

// DeleteTemplatesTemplateID operation middleware
func (siw *ServerInterfaceWrapper) DeleteTemplatesTemplateID(c *gin.Context) {

	var err error

	// ------------- Path parameter "templateID" -------------
	var templateID TemplateID

	err = runtime.BindStyledParameter("simple", false, "templateID", c.Param("templateID"), &templateID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter templateID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.DeleteTemplatesTemplateID(c, templateID)
}

// PostTemplatesTemplateID operation middleware
func (siw *ServerInterfaceWrapper) PostTemplatesTemplateID(c *gin.Context) {

	var err error

	// ------------- Path parameter "templateID" -------------
	var templateID TemplateID

	err = runtime.BindStyledParameter("simple", false, "templateID", c.Param("templateID"), &templateID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter templateID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(AccessTokenAuthScopes, []string{})

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostTemplatesTemplateID(c, templateID)
}

// GetTemplatesTemplateIDBuildsBuildID operation middleware
func (siw *ServerInterfaceWrapper) GetTemplatesTemplateIDBuildsBuildID(c *gin.Context) {

	var err error

	// ------------- Path parameter "templateID" -------------
	var templateID TemplateID

	err = runtime.BindStyledParameter("simple", false, "templateID", c.Param("templateID"), &templateID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter templateID: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "buildID" -------------
	var buildID BuildID

	err = runtime.BindStyledParameter("simple", false, "buildID", c.Param("buildID"), &buildID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter buildID: %w", err), http.StatusBadRequest)
		return
	}

	c.Set(AccessTokenAuthScopes, []string{})

	// Parameter object where we will unmarshal all parameters from the context
	var params GetTemplatesTemplateIDBuildsBuildIDParams

	// ------------- Optional query parameter "logsOffset" -------------

	err = runtime.BindQueryParameter("form", true, false, "logsOffset", c.Request.URL.Query(), &params.LogsOffset)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter logsOffset: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetTemplatesTemplateIDBuildsBuildID(c, templateID, buildID, params)
}

// PostTemplatesTemplateIDBuildsBuildIDLogs operation middleware
func (siw *ServerInterfaceWrapper) PostTemplatesTemplateIDBuildsBuildIDLogs(c *gin.Context) {

	var err error

	// ------------- Path parameter "templateID" -------------
	var templateID TemplateID

	err = runtime.BindStyledParameter("simple", false, "templateID", c.Param("templateID"), &templateID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter templateID: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "buildID" -------------
	var buildID BuildID

	err = runtime.BindStyledParameter("simple", false, "buildID", c.Param("buildID"), &buildID)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter buildID: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostTemplatesTemplateIDBuildsBuildIDLogs(c, templateID, buildID)
}

// GinServerOptions provides options for the Gin server.
type GinServerOptions struct {
	BaseURL      string
	Middlewares  []MiddlewareFunc
	ErrorHandler func(*gin.Context, error, int)
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router gin.IRouter, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, GinServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router gin.IRouter, si ServerInterface, options GinServerOptions) {
	errorHandler := options.ErrorHandler
	if errorHandler == nil {
		errorHandler = func(c *gin.Context, err error, statusCode int) {
			c.JSON(statusCode, gin.H{"msg": err.Error()})
		}
	}

	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandler:       errorHandler,
	}

	router.GET(options.BaseURL+"/envs", wrapper.GetEnvs)
	router.POST(options.BaseURL+"/envs", wrapper.PostEnvs)
	router.DELETE(options.BaseURL+"/envs/:envID", wrapper.DeleteEnvsEnvID)
	router.POST(options.BaseURL+"/envs/:envID", wrapper.PostEnvsEnvID)
	router.GET(options.BaseURL+"/envs/:envID/builds/:buildID", wrapper.GetEnvsEnvIDBuildsBuildID)
	router.POST(options.BaseURL+"/envs/:envID/builds/:buildID/logs", wrapper.PostEnvsEnvIDBuildsBuildIDLogs)
	router.GET(options.BaseURL+"/health", wrapper.GetHealth)
	router.GET(options.BaseURL+"/instances", wrapper.GetInstances)
	router.POST(options.BaseURL+"/instances", wrapper.PostInstances)
	router.POST(options.BaseURL+"/instances/:instanceID/refreshes", wrapper.PostInstancesInstanceIDRefreshes)
	router.GET(options.BaseURL+"/sandboxes", wrapper.GetSandboxes)
	router.POST(options.BaseURL+"/sandboxes", wrapper.PostSandboxes)
	router.DELETE(options.BaseURL+"/sandboxes/:sandboxID", wrapper.DeleteSandboxesSandboxID)
	router.GET(options.BaseURL+"/sandboxes/:sandboxID/logs", wrapper.GetSandboxesSandboxIDLogs)
	router.POST(options.BaseURL+"/sandboxes/:sandboxID/refreshes", wrapper.PostSandboxesSandboxIDRefreshes)
	router.GET(options.BaseURL+"/templates", wrapper.GetTemplates)
	router.POST(options.BaseURL+"/templates", wrapper.PostTemplates)
	router.DELETE(options.BaseURL+"/templates/:templateID", wrapper.DeleteTemplatesTemplateID)
	router.POST(options.BaseURL+"/templates/:templateID", wrapper.PostTemplatesTemplateID)
	router.GET(options.BaseURL+"/templates/:templateID/builds/:buildID", wrapper.GetTemplatesTemplateIDBuildsBuildID)
	router.POST(options.BaseURL+"/templates/:templateID/builds/:buildID/logs", wrapper.PostTemplatesTemplateIDBuildsBuildIDLogs)
}
