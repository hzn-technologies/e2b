/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/files": {
    /** Download a file */
    get: {
      parameters: {
        query: {
          path?: components["parameters"]["FilePath"];
          username: components["parameters"]["User"];
        };
      };
      responses: {
        200: components["responses"]["DownloadSuccess"];
        400: components["responses"]["InvalidUser"];
        403: components["responses"]["DirectoryPathError"];
        404: components["responses"]["FileNotFound"];
        500: components["responses"]["InternalServerError"];
      };
    };
    /** Upload a file and ensure the parent directories exist. If the file exists, it will be overwritten. */
    post: {
      parameters: {
        query: {
          path?: components["parameters"]["FilePath"];
          username: components["parameters"]["User"];
        };
      };
      requestBody: components["requestBodies"]["File"];
      responses: {
        204: components["responses"]["UploadSuccess"];
        400: components["responses"]["InvalidUser"];
        403: components["responses"]["DirectoryPathError"];
        500: components["responses"]["InternalServerError"];
        507: components["responses"]["NotEnoughDiskSpace"];
      };
    };
  };
  "/health": {
    /** Check the health of the service */
    get: {
      responses: {
        /** @description The service is healthy */
        204: {
          content: never;
        };
      };
    };
  };
  "/sync": {
    /** Ensure the time and metadata is synced with the host */
    post: {
      responses: {
        /** @description The time and metadata is synced with the host */
        204: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Error: {
      /** @description Error code */
      code: number;
      /** @description Error message */
      message: string;
    };
  };
  responses: {
    /** @description Directory path error */
    DirectoryPathError: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Entire file downloaded successfully. */
    DownloadSuccess: {
      content: {
        "application/octet-stream": string;
      };
    };
    /** @description File not found */
    FileNotFound: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Internal server error */
    InternalServerError: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Invalid user */
    InvalidUser: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Not enough disk space */
    NotEnoughDiskSpace: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description The file was uploaded successfully. */
    UploadSuccess: {
      content: never;
    };
  };
  parameters: {
    /** @description Path to the file, URL encoded. Can be relative to user's home directory. */
    FilePath?: string;
    /** @description User used for setting the owner, or resolving relative paths. */
    User: string;
  };
  requestBodies: {
    File: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file?: string;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
