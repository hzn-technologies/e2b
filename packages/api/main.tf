terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
    google = {
      source  = "hashicorp/google"
      version = "5.6.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.5.1"
    }
  }
}


resource "google_service_account_key" "google_service_key" {
  service_account_id = var.google_service_account_email
}

resource "google_artifact_registry_repository" "custom_environments_repository" {
  format        = "DOCKER"
  repository_id = "${var.prefix}custom-environments"
  labels        = var.labels
}

resource "google_artifact_registry_repository_iam_member" "custom_environments_repository_member" {
  repository = google_artifact_registry_repository.custom_environments_repository.name
  role       = "roles/artifactregistry.repoAdmin"
  member     = "serviceAccount:${var.google_service_account_email}"
}

resource "google_artifact_registry_repository" "orchestration_repository" {
  format        = "DOCKER"
  repository_id = "e2b-orchestration"
  labels        = var.labels
}

resource "google_artifact_registry_repository_iam_member" "orchestration_repository_member" {
  repository = google_artifact_registry_repository.orchestration_repository.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${var.google_service_account_email}"
}

data "docker_registry_image" "api_image" {
  name = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.orchestration_repository.name}/api:latest"
}

resource "docker_image" "api_image" {
  name          = data.docker_registry_image.api_image.name
  pull_triggers = [data.docker_registry_image.api_image.sha256_digest]
}

resource "google_secret_manager_secret" "postgres_connection_string" {
  secret_id = "${var.prefix}postgres-connection-string"

  replication {
    auto {}
  }
}

data "google_secret_manager_secret_version" "postgres_connection_string" {
  secret = google_secret_manager_secret.postgres_connection_string.name
}

resource "google_secret_manager_secret" "posthog_api_key" {
  secret_id = "${var.prefix}posthog-api-key"

  replication {
    auto {}
  }
}

data "google_secret_manager_secret_version" "posthog_api_key" {
  secret = google_secret_manager_secret.posthog_api_key.name
}

resource "random_password" "api_secret" {
  length  = 32
  special = false
}

resource "google_secret_manager_secret" "api_secret" {
  secret_id = "${var.prefix}api-secret"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "api_secret_value" {
  secret = google_secret_manager_secret.api_secret.id

  secret_data = random_password.api_secret.result
}

