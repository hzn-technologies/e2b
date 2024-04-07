// Package orchestrator provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.16.2 DO NOT EDIT.
package orchestrator

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/oapi-codegen/runtime"
)

// Error defines model for Error.
type Error struct {
	// Code Error code
	Code int32 `json:"code"`

	// Message Error
	Message string `json:"message"`
}

// NewSandbox defines model for NewSandbox.
type NewSandbox struct {
	ClientID  string `json:"clientID"`
	SandboxID string `json:"sandboxID"`
}

// Sandbox defines model for Sandbox.
type Sandbox struct {
	Alias              string  `json:"alias"`
	BuildID            string  `json:"buildID"`
	ClientID           *string `json:"clientID,omitempty"`
	ConsulToken        string  `json:"consulToken"`
	EnvID              string  `json:"envID"`
	EnvsDisk           string  `json:"envsDisk"`
	FirecrackerVersion string  `json:"firecrackerVersion"`
	HugePages          bool    `json:"hugePages"`
	InstanceID         string  `json:"instanceID"`
	KernelVersion      string  `json:"kernelVersion"`
	LogsProxyAddress   string  `json:"logsProxyAddress"`
	MaxInstanceLength  int32   `json:"maxInstanceLength"`
	Metadata           string  `json:"metadata"`
	SpanID             string  `json:"spanID"`
	TeamID             string  `json:"teamID"`
	TraceID            string  `json:"traceID"`
}

// SandboxID defines model for sandboxID.
type SandboxID = string

// N500 defines model for 500.
type N500 = Error

// PostSandboxesJSONRequestBody defines body for PostSandboxes for application/json ContentType.
type PostSandboxesJSONRequestBody = Sandbox

// RequestEditorFn  is the function signature for the RequestEditor callback function
type RequestEditorFn func(ctx context.Context, req *http.Request) error

// Doer performs HTTP requests.
//
// The standard http.Client implements this interface.
type HttpRequestDoer interface {
	Do(req *http.Request) (*http.Response, error)
}

// Client which conforms to the OpenAPI3 specification for this service.
type Client struct {
	// The endpoint of the server conforming to this interface, with scheme,
	// https://api.deepmap.com for example. This can contain a path relative
	// to the server, such as https://api.deepmap.com/dev-test, and all the
	// paths in the swagger spec will be appended to the server.
	Server string

	// Doer for performing requests, typically a *http.Client with any
	// customized settings, such as certificate chains.
	Client HttpRequestDoer

	// A list of callbacks for modifying requests which are generated before sending over
	// the network.
	RequestEditors []RequestEditorFn
}

// ClientOption allows setting custom parameters during construction
type ClientOption func(*Client) error

// Creates a new Client, with reasonable defaults
func NewClient(server string, opts ...ClientOption) (*Client, error) {
	// create a client with sane default values
	client := Client{
		Server: server,
	}
	// mutate client and add all optional params
	for _, o := range opts {
		if err := o(&client); err != nil {
			return nil, err
		}
	}
	// ensure the server URL always has a trailing slash
	if !strings.HasSuffix(client.Server, "/") {
		client.Server += "/"
	}
	// create httpClient, if not already present
	if client.Client == nil {
		client.Client = &http.Client{}
	}
	return &client, nil
}

// WithHTTPClient allows overriding the default Doer, which is
// automatically created using http.Client. This is useful for tests.
func WithHTTPClient(doer HttpRequestDoer) ClientOption {
	return func(c *Client) error {
		c.Client = doer
		return nil
	}
}

// WithRequestEditorFn allows setting up a callback function, which will be
// called right before sending the request. This can be used to mutate the request.
func WithRequestEditorFn(fn RequestEditorFn) ClientOption {
	return func(c *Client) error {
		c.RequestEditors = append(c.RequestEditors, fn)
		return nil
	}
}

// The interface specification for the client above.
type ClientInterface interface {
	// GetHealth request
	GetHealth(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error)

	// GetSandboxes request
	GetSandboxes(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error)

	// PostSandboxesWithBody request with any body
	PostSandboxesWithBody(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*http.Response, error)

	PostSandboxes(ctx context.Context, body PostSandboxesJSONRequestBody, reqEditors ...RequestEditorFn) (*http.Response, error)

	// DeleteSandboxesSandboxID request
	DeleteSandboxesSandboxID(ctx context.Context, sandboxID SandboxID, reqEditors ...RequestEditorFn) (*http.Response, error)
}

func (c *Client) GetHealth(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewGetHealthRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) GetSandboxes(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewGetSandboxesRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) PostSandboxesWithBody(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewPostSandboxesRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) PostSandboxes(ctx context.Context, body PostSandboxesJSONRequestBody, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewPostSandboxesRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) DeleteSandboxesSandboxID(ctx context.Context, sandboxID SandboxID, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewDeleteSandboxesSandboxIDRequest(c.Server, sandboxID)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

// NewGetHealthRequest generates requests for GetHealth
func NewGetHealthRequest(server string) (*http.Request, error) {
	var err error

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/health")
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("GET", queryURL.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewGetSandboxesRequest generates requests for GetSandboxes
func NewGetSandboxesRequest(server string) (*http.Request, error) {
	var err error

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/sandboxes")
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("GET", queryURL.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewPostSandboxesRequest calls the generic PostSandboxes builder with application/json body
func NewPostSandboxesRequest(server string, body PostSandboxesJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewPostSandboxesRequestWithBody(server, "application/json", bodyReader)
}

// NewPostSandboxesRequestWithBody generates requests for PostSandboxes with any type of body
func NewPostSandboxesRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/sandboxes")
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", queryURL.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)

	return req, nil
}

// NewDeleteSandboxesSandboxIDRequest generates requests for DeleteSandboxesSandboxID
func NewDeleteSandboxesSandboxIDRequest(server string, sandboxID SandboxID) (*http.Request, error) {
	var err error

	var pathParam0 string

	pathParam0, err = runtime.StyleParamWithLocation("simple", false, "sandboxID", runtime.ParamLocationPath, sandboxID)
	if err != nil {
		return nil, err
	}

	serverURL, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	operationPath := fmt.Sprintf("/sandboxes/%s", pathParam0)
	if operationPath[0] == '/' {
		operationPath = "." + operationPath
	}

	queryURL, err := serverURL.Parse(operationPath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("DELETE", queryURL.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

func (c *Client) applyEditors(ctx context.Context, req *http.Request, additionalEditors []RequestEditorFn) error {
	for _, r := range c.RequestEditors {
		if err := r(ctx, req); err != nil {
			return err
		}
	}
	for _, r := range additionalEditors {
		if err := r(ctx, req); err != nil {
			return err
		}
	}
	return nil
}

// ClientWithResponses builds on ClientInterface to offer response payloads
type ClientWithResponses struct {
	ClientInterface
}

// NewClientWithResponses creates a new ClientWithResponses, which wraps
// Client with return type handling
func NewClientWithResponses(server string, opts ...ClientOption) (*ClientWithResponses, error) {
	client, err := NewClient(server, opts...)
	if err != nil {
		return nil, err
	}
	return &ClientWithResponses{client}, nil
}

// WithBaseURL overrides the baseURL.
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) error {
		newBaseURL, err := url.Parse(baseURL)
		if err != nil {
			return err
		}
		c.Server = newBaseURL.String()
		return nil
	}
}

// ClientWithResponsesInterface is the interface specification for the client with responses above.
type ClientWithResponsesInterface interface {
	// GetHealthWithResponse request
	GetHealthWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*GetHealthResponse, error)

	// GetSandboxesWithResponse request
	GetSandboxesWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*GetSandboxesResponse, error)

	// PostSandboxesWithBodyWithResponse request with any body
	PostSandboxesWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*PostSandboxesResponse, error)

	PostSandboxesWithResponse(ctx context.Context, body PostSandboxesJSONRequestBody, reqEditors ...RequestEditorFn) (*PostSandboxesResponse, error)

	// DeleteSandboxesSandboxIDWithResponse request
	DeleteSandboxesSandboxIDWithResponse(ctx context.Context, sandboxID SandboxID, reqEditors ...RequestEditorFn) (*DeleteSandboxesSandboxIDResponse, error)
}

type GetHealthResponse struct {
	Body         []byte
	HTTPResponse *http.Response
}

// Status returns HTTPResponse.Status
func (r GetHealthResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r GetHealthResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type GetSandboxesResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *[]Sandbox
	JSON500      *N500
}

// Status returns HTTPResponse.Status
func (r GetSandboxesResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r GetSandboxesResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type PostSandboxesResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON201      *NewSandbox
	JSON500      *N500
}

// Status returns HTTPResponse.Status
func (r PostSandboxesResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r PostSandboxesResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type DeleteSandboxesSandboxIDResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON500      *N500
}

// Status returns HTTPResponse.Status
func (r DeleteSandboxesSandboxIDResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r DeleteSandboxesSandboxIDResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

// GetHealthWithResponse request returning *GetHealthResponse
func (c *ClientWithResponses) GetHealthWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*GetHealthResponse, error) {
	rsp, err := c.GetHealth(ctx, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParseGetHealthResponse(rsp)
}

// GetSandboxesWithResponse request returning *GetSandboxesResponse
func (c *ClientWithResponses) GetSandboxesWithResponse(ctx context.Context, reqEditors ...RequestEditorFn) (*GetSandboxesResponse, error) {
	rsp, err := c.GetSandboxes(ctx, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParseGetSandboxesResponse(rsp)
}

// PostSandboxesWithBodyWithResponse request with arbitrary body returning *PostSandboxesResponse
func (c *ClientWithResponses) PostSandboxesWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*PostSandboxesResponse, error) {
	rsp, err := c.PostSandboxesWithBody(ctx, contentType, body, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParsePostSandboxesResponse(rsp)
}

func (c *ClientWithResponses) PostSandboxesWithResponse(ctx context.Context, body PostSandboxesJSONRequestBody, reqEditors ...RequestEditorFn) (*PostSandboxesResponse, error) {
	rsp, err := c.PostSandboxes(ctx, body, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParsePostSandboxesResponse(rsp)
}

// DeleteSandboxesSandboxIDWithResponse request returning *DeleteSandboxesSandboxIDResponse
func (c *ClientWithResponses) DeleteSandboxesSandboxIDWithResponse(ctx context.Context, sandboxID SandboxID, reqEditors ...RequestEditorFn) (*DeleteSandboxesSandboxIDResponse, error) {
	rsp, err := c.DeleteSandboxesSandboxID(ctx, sandboxID, reqEditors...)
	if err != nil {
		return nil, err
	}
	return ParseDeleteSandboxesSandboxIDResponse(rsp)
}

// ParseGetHealthResponse parses an HTTP response from a GetHealthWithResponse call
func ParseGetHealthResponse(rsp *http.Response) (*GetHealthResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &GetHealthResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	return response, nil
}

// ParseGetSandboxesResponse parses an HTTP response from a GetSandboxesWithResponse call
func ParseGetSandboxesResponse(rsp *http.Response) (*GetSandboxesResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &GetSandboxesResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		var dest []Sandbox
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON200 = &dest

	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 500:
		var dest N500
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON500 = &dest

	}

	return response, nil
}

// ParsePostSandboxesResponse parses an HTTP response from a PostSandboxesWithResponse call
func ParsePostSandboxesResponse(rsp *http.Response) (*PostSandboxesResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &PostSandboxesResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 201:
		var dest NewSandbox
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON201 = &dest

	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 500:
		var dest N500
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON500 = &dest

	}

	return response, nil
}

// ParseDeleteSandboxesSandboxIDResponse parses an HTTP response from a DeleteSandboxesSandboxIDWithResponse call
func ParseDeleteSandboxesSandboxIDResponse(rsp *http.Response) (*DeleteSandboxesSandboxIDResponse, error) {
	bodyBytes, err := io.ReadAll(rsp.Body)
	defer func() { _ = rsp.Body.Close() }()
	if err != nil {
		return nil, err
	}

	response := &DeleteSandboxesSandboxIDResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 500:
		var dest N500
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON500 = &dest

	}

	return response, nil
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/7RWTW/cRgz9KwLbo2BtnPaiW1IHrdGgNeqgl8AHWuJK0x3NKBzK8cLQfy9mtPrY3dHC",
	"B+ek1XJIPr7HIfUChW1aa8iIg/wFWmRsSIjDm0NTPtrn2xv/ogzk0KLUkILBhiBf2FNg+tYpphJy4Y5S",
	"cEVNDXpH2bfhsLAyFfR97w+71hpHIcuvm41/FNYIGfE/sW21KlCUNdl/zpqAZYr3M9MWcvgpm6Fng9Vl",
	"n5gtDzlKcgWr1geBHO6Jn4gTOthHfAHA4OSrZ9sSixpwFbYk/zwOFA4nwZbC1nKDAjkoI++vIR1rVUao",
	"IoY+hYacw2ot0Owy0bOk8iscEo1RHvoU/qLv9wPxEcxakZFBsJPA6bGcl9MulZ1i+uSrmVGrgc2ztI+d",
	"0uUKpIt4C2tcp7/YHZmonczTiieZJ3ej3C5q3CqmgrHYEf9L7JSNR6+7iu6womVRj9ZqQuPNyjhBU9AK",
	"gh2xIX0pvraVu2P7vP9Qlkwuzl2Dz7eHRJ/JVFL7U6/qOsESBeN90KJZgS2EzZqJcaXa094Zwh/rN/uP",
	"us2NkR6a54jUCEGnrEalXIg/lRPjccHRUuuHMDuU2dpQqBLtK/10/TH5cHcLKTyNisLm6t3VxhNjWzLY",
	"Ksjh/dXmagNpmJJBz6wm1INoFcn5DPgjmJOipsLD9fcpTL3bEnL4nWSww8nAvB4G5nGof+hbR06S7+gS",
	"1xUFObfttB+FfQrZ4T4P/lEon5WTBLVOuDNGmSqZXSLA7hfGGLZXD3Ml1Bzmh/57C/nXy/N9HD+9n0WH",
	"NkRm3Edn/kSD3idM0rGhcqXGPh33UCz9VGLmD/lMgpVbDMrQOSm01kWo/Y0JhRIc0yVbtk0iNSVCTatR",
	"6IziO+tOOA7qfrTl/s125cTl8QX267s/U/Xdm6VdrK+IZl9qmmjyrVwE7spFS+v9m4h1dCuyl2nh9YN+",
	"miSys/9UWs86nql2E9wm3e4XS3T5YbXS4/ORbF6//cOZFL+c4zplbae0/iGkzf+/nHwE+jv00P8fAAD/",
	"/4j7xhBQCgAA",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
