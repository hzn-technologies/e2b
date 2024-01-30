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
  "/instances": {
    /** List all running instances */
    get: {
      responses: {
        /** Successfully returned all running instances */
        200: {
          content: {
            "application/json": components["schemas"]["RunningInstance"][];
          };
        };
        400: components["responses"]["400"];
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
    /** Create an instance from the environment */
    post: {
      responses: {
        /** The instance was created successfully */
        201: {
          content: {
            "application/json": components["schemas"]["Instance"];
          };
        };
        400: components["responses"]["400"];
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["NewInstance"];
        };
      };
    };
  };
  "/instances/{instanceID}/refreshes": {
    /** Refresh the instance extending its time to live */
    post: {
      parameters: {
        path: {
          instanceID: components["parameters"]["instanceID"];
        };
      };
      responses: {
        /** Successfully refreshed the instance */
        204: never;
        401: components["responses"]["401"];
        404: components["responses"]["404"];
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description Duration for which the instance should be kept alive in seconds */
            duration?: number;
          };
        };
      };
    };
  };
  "/envs": {
    /** List all environments */
    get: {
      responses: {
        /** Successfully returned all environments */
        200: {
          content: {
            "application/json": components["schemas"]["Environment"][];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
    /** Create a new environment */
    post: {
      responses: {
        /** The build has started */
        202: {
          content: {
            "application/json": components["schemas"]["Environment"];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "multipart/form-data": {
            /** @description Alias of the environment */
            alias?: string;
            /**
             * Format: binary
             * @description Docker build context
             */
            buildContext: string;
            /** @description Dockerfile content */
            dockerfile: string;
            /** @description Start command to execute in the template after the build */
            startCmd?: string;
          };
        };
      };
    };
  };
  "/envs/{envID}": {
    /** Rebuild an environment */
    post: {
      parameters: {
        path: {
          envID: components["parameters"]["envID"];
        };
      };
      responses: {
        /** The build has started */
        202: {
          content: {
            "application/json": components["schemas"]["Environment"];
          };
        };
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
      requestBody: {
        content: {
          "multipart/form-data": {
            /** @description Alias of the environment */
            alias?: string;
            /**
             * Format: binary
             * @description Docker build context
             */
            buildContext: string;
            /** @description Dockerfile content */
            dockerfile: string;
            /** @description Start command to execute in the template after the build */
            startCmd?: string;
          };
        };
      };
    };
    /** Delete an environment */
    delete: {
      parameters: {
        path: {
          envID: components["parameters"]["envID"];
        };
      };
      responses: {
        /** The environment was deleted successfully */
        204: never;
        401: components["responses"]["401"];
        500: components["responses"]["500"];
      };
    };
  };
  "/envs/{envID}/builds/{buildID}": {
    /** Get environment build info */
    get: {
      parameters: {
        path: {
          envID: components["parameters"]["envID"];
          buildID: components["parameters"]["buildID"];
        };
        query: {
          /** Index of the starting build log that should be returned with the environment */
          logsOffset?: number;
        };
      };
      responses: {
        /** Successfully returned the environment */
        200: {
          content: {
            "application/json": components["schemas"]["EnvironmentBuild"];
          };
        };
        401: components["responses"]["401"];
        404: components["responses"]["404"];
        500: components["responses"]["500"];
      };
    };
  };
  "/envs/{envID}/builds/{buildID}/logs": {
    /** Add a build log */
    post: {
      parameters: {
        path: {
          envID: components["parameters"]["envID"];
          buildID: components["parameters"]["buildID"];
        };
      };
      responses: {
        /** Successfully added log */
        201: unknown;
        401: components["responses"]["401"];
        404: components["responses"]["404"];
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description API secret */
            apiSecret: string;
            logs: string[];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    InstanceMetadata: { [key: string]: string };
    NewInstance: {
      /** @description Identifier of the required environment */
      envID: string;
      metadata?: components["schemas"]["InstanceMetadata"];
    };
    Environment: {
      /** @description Identifier of the environment */
      envID: string;
      /** @description Identifier of the last successful build for given environment */
      buildID: string;
      /** @description Whether the environment is public or only accessible by the team */
      public: boolean;
      /** @description Aliases of the environment */
      aliases?: string[];
    };
    EnvironmentBuild: {
      /**
       * @description Build logs
       * @default []
       */
      logs: string[];
      /** @description Identifier of the environment */
      envID: string;
      /** @description Identifier of the build */
      buildID: string;
      /**
       * @description Status of the environment
       * @enum {string}
       */
      status?: "building" | "ready" | "error";
    } & {
      finished: unknown;
    };
    Instance: {
      /** @description Identifier of the environment from which is the instance created */
      envID: string;
      /** @description Identifier of the instance */
      instanceID: string;
      /** @description Alias of the environment */
      alias?: string;
      /** @description Identifier of the client */
      clientID: string;
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
    RunningInstance: {
      /** @description Identifier of the environment from which is the instance created */
      envID: string;
      /** @description Alias of the environment */
      alias?: string;
      /** @description Identifier of the instance */
      instanceID: string;
      /** @description Identifier of the client */
      clientID: string;
      /**
       * Format: date-time
       * @description Time when the instance was started
       */
      startedAt: string;
      metadata?: components["schemas"]["InstanceMetadata"];
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
    envID: string;
    buildID: string;
    instanceID: string;
  };
}

export interface operations {}

export interface external {}
