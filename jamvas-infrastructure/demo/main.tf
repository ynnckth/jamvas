terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "ynnckth"
    workspaces {
      name = "jamvas"
    }
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  location = "asia-south-east"
  prefix = "jamvas-demo"
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "jamvas-demo"
  location = local.location
}

# App Service Plan
resource "azurerm_app_service_plan" "app_service_plan" {
  name = "${local.prefix}-app-service-plan"
  location = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind = "Linux"
  reserved = true
  sku {
    tier = "Free"
    size = "F1"
  }
}

# App Service
resource "azurerm_app_service" "jamvas-backend" {
  name = "${local.prefix}-backend"
  location = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.app_service_plan.id
  https_only = true

  site_config {
    linux_fx_version = "DOCKER|ghcr.io/ynnckth/jamvas:latest"
    always_on = "true"
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL = "https://ghcr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = var.github_packages.username
    DOCKER_REGISTRY_SERVER_PASSWORD = var.github_packages.password
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    WEBSITE_HTTPLOGGING_RETENTION_DAYS = 5
  }
}