/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/health": {
    /** Health check */
    get: {
      responses: {
        /** Request was successful */
        200: unknown;
        401: components["responses"]["401"];
      };
    };
  };
  "/teams": {
    /** List all teams */
    get: {
      responses: {
        /** Successfully returned all teams */
        200: {
          content: {
            "application/json": components["schemas"]["Team"][];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
  };
  "/sandboxes": {
    /** List all running sandboxes */
    get: {
      responses: {
        /** Successfully returned all running sandboxes */
        200: {
          content: {
            "application/json": components["schemas"]["RunningSandbox"][];
          };
        };
        400: components["responses"]["400"];
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
    /** Create a sandbox from the template */
    post: {
      responses: {
        /** The sandbox was created successfully */
        201: {
          content: {
            "application/json": components["schemas"]["Sandbox"];
          };
        };
        400: components["responses"]["400"];
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["NewSandbox"];
        };
      };
    };
  };
  "/sandboxes/{sandboxID}/logs": {
    /** Get sandbox logs */
    get: {
      parameters: {
        path: {
          sandboxID: components["parameters"]["sandboxID"];
        };
        query: {
          /** Starting timestamp of the logs that should be returned in milliseconds */
          start?: number;
          /** Maximum number of logs that should be returned */
          limit?: number;
        };
      };
      responses: {
        /** Successfully returned the sandbox logs */
        200: {
          content: {
            "application/json": components["schemas"]["SandboxLogs"];
          };
        };
        401: components["responses"]["401"];
        404: components["responses"]["404"];
        500: components["responses"]["500"];
      };
    };
  };
  "/sandboxes/{sandboxID}": {
    /** Kill a sandbox */
    delete: {
      parameters: {
        path: {
          sandboxID: components["parameters"]["sandboxID"];
        };
      };
      responses: {
        /** The sandbox was killed successfully */
        204: never;
        401: components["responses"]["401"];
        404: components["responses"]["404"];
        500: components["responses"]["500"];
      };
    };
  };
  "/sandboxes/{sandboxID}/timeout": {
    /** Set the timeout for the sandbox. The sandbox will expire x seconds from the time of the request. Calling this method multiple times overwrites the TTL, each time using the current timestamp as the starting point to measure the timeout duration. */
    post: {
      parameters: {
        path: {
          sandboxID: components["parameters"]["sandboxID"];
        };
      };
      responses: {
        /** Successfully set the sandbox timeout */
        204: never;
        401: components["responses"]["401"];
        404: components["responses"]["404"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "application/json": {
            /**
             * Format: int32
             * @description Timeout in seconds from the current time after which the sandbox should expire
             */
            timeout: number;
          };
        };
      };
    };
  };
  "/sandboxes/{sandboxID}/refreshes": {
    /** Refresh the sandbox extending its time to live */
    post: {
      parameters: {
        path: {
          sandboxID: components["parameters"]["sandboxID"];
        };
      };
      responses: {
        /** Successfully refreshed the sandbox */
        204: never;
        401: components["responses"]["401"];
        404: components["responses"]["404"];
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description Duration for which the sandbox should be kept alive in seconds */
            duration?: number;
          };
        };
      };
    };
  };
  "/templates": {
    /** List all templates */
    get: {
      parameters: {
        query: {
          teamID?: string;
        };
      };
      responses: {
        /** Successfully returned all templates */
        200: {
          content: {
            "application/json": components["schemas"]["Template"][];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
    /** Create a new template */
    post: {
      responses: {
        /** The build was accepted */
        202: {
          content: {
            "application/json": components["schemas"]["Template"];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["TemplateBuildRequest"];
        };
      };
    };
  };
  "/templates/{templateID}": {
    /** Rebuild an template */
    post: {
      parameters: {
        path: {
          templateID: components["parameters"]["templateID"];
        };
      };
      responses: {
        /** The build was accepted */
        202: {
          content: {
            "application/json": components["schemas"]["Template"];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["TemplateBuildRequest"];
        };
      };
    };
    /** Delete a template */
    delete: {
      parameters: {
        path: {
          templateID: components["parameters"]["templateID"];
        };
      };
      responses: {
        /** The template was deleted successfully */
        204: never;
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
  };
  "/templates/{templateID}/builds/{buildID}": {
    /** Start the build */
    post: {
      parameters: {
        path: {
          templateID: components["parameters"]["templateID"];
          buildID: components["parameters"]["buildID"];
        };
      };
      responses: {
        /** The build has started */
        202: unknown;
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
  };
  "/templates/{templateID}/builds/{buildID}/status": {
    /** Get template build info */
    get: {
      parameters: {
        path: {
          templateID: components["parameters"]["templateID"];
          buildID: components["parameters"]["buildID"];
        };
        query: {
          /** Index of the starting build log that should be returned with the template */
          logsOffset?: number;
        };
      };
      responses: {
        /** Successfully returned the template */
        200: {
          content: {
            "application/json": components["schemas"]["TemplateBuild"];
          };
        };
        401: components["responses"]["401"];
        404: components["responses"]["404"];
        500: components["responses"]["500"];
      };
    };
  };
}

export interface components {
  schemas: {
    Team: {
      /** @description Identifier of the team */
      teamID: string;
      /** @description Name of the team */
      name: string;
      /** @description API key for the team */
      apiKey: string;
      /** @description Whether the team is the default team */
      isDefault: boolean;
    };
    /**
     * Format: int32
     * @description CPU cores for the sandbox
     */
    CPUCount: number;
    /**
     * Format: int32
     * @description Memory for the sandbox in MB
     */
    MemoryMB: number;
    SandboxMetadata: { [key: string]: string };
    /** @description Log entry with timestamp and line */
    SandboxLog: {
      /**
       * Format: date-time
       * @description Timestamp of the log entry
       */
      timestamp: string;
      /** @description Log line content */
      line: string;
    };
    SandboxLogs: {
      /** @description Logs of the sandbox */
      logs: components["schemas"]["SandboxLog"][];
    };
    Sandbox: {
      /** @description Identifier of the template from which is the sandbox created */
      templateID: string;
      /** @description Identifier of the sandbox */
      sandboxID: string;
      /** @description Alias of the template */
      alias?: string;
      /** @description Identifier of the client */
      clientID: string;
      /** @description Version of the envd running in the sandbox */
      envdVersion: string;
    };
    RunningSandbox: {
      /** @description Identifier of the template from which is the sandbox created */
      templateID: string;
      /** @description Alias of the template */
      alias?: string;
      /** @description Identifier of the sandbox */
      sandboxID: string;
      /** @description Identifier of the client */
      clientID: string;
      /**
       * Format: date-time
       * @description Time when the sandbox was started
       */
      startedAt: string;
      cpuCount: components["schemas"]["CPUCount"];
      memoryMB: components["schemas"]["MemoryMB"];
      metadata?: components["schemas"]["SandboxMetadata"];
    };
    NewSandbox: {
      /** @description Identifier of the required template */
      templateID: string;
      /**
       * Format: int32
       * @description Time to live for the sandbox in seconds.
       * @default 15
       */
      timeout?: number;
      metadata?: components["schemas"]["SandboxMetadata"];
    };
    Template: {
      /** @description Identifier of the template */
      templateID: string;
      /** @description Identifier of the last successful build for given template */
      buildID: string;
      cpuCount: components["schemas"]["CPUCount"];
      memoryMB: components["schemas"]["MemoryMB"];
      /** @description Whether the template is public or only accessible by the team */
      public: boolean;
      /** @description Aliases of the template */
      aliases?: string[];
    };
    TemplateBuildRequest: {
      /** @description Alias of the template */
      alias?: string;
      /** @description Dockerfile for the template */
      dockerfile: string;
      /** @description Identifier of the team */
      teamID?: string;
      /** @description Start command to execute in the template after the build */
      startCmd?: string;
      cpuCount?: components["schemas"]["CPUCount"];
      memoryMB?: components["schemas"]["MemoryMB"];
    };
    TemplateBuild: {
      /**
       * @description Build logs
       * @default []
       */
      logs: string[];
      /** @description Identifier of the template */
      templateID: string;
      /** @description Identifier of the build */
      buildID: string;
      /**
       * @description Status of the template
       * @enum {string}
       */
      status: "building" | "ready" | "error";
    };
    Error: {
      /**
       * Format: int32
       * @description Error code
       */
      code: number;
      /** @description Error */
      message: string;
    };
  };
  responses: {
    /** Bad request */
    400: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** Authentication error */
    401: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** Not found */
    404: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** Server error */
    500: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  parameters: {
    templateID: string;
    buildID: string;
    sandboxID: string;
  };
}

export interface operations {}

export interface external {}
