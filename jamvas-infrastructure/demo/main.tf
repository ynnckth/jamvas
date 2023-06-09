# Using Terraform Cloud as the backend to manage the terraform state:
# https://app.terraform.io
#
# Check the Azure Pricing Calculator calculate the expected infrastructure costs:
# https://azure.microsoft.com/en-us/pricing/calculator/
terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "ynnckth"
    workspaces {
      name = "jamvas"
    }
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.55.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  location = "southeastasia"
  prefix   = "jamvas-demo"
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "jamvas-demo"
  location = local.location
}

# App Service Plan
resource "azurerm_service_plan" "app_service_plan" {
  name                = "${local.prefix}-app-service-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

# App Service
resource "azurerm_linux_web_app" "jamvas-backend" {
  name                = "jamvas"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.app_service_plan.id

  site_config {
    application_stack {
      docker_image     = var.github_packages_docker_image
      docker_image_tag = var.github_packages_docker_image_tag
    }
    always_on = false
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = var.github_packages_server_url
    DOCKER_REGISTRY_SERVER_USERNAME = var.github_packages_username
    DOCKER_REGISTRY_SERVER_PASSWORD = var.github_packages_password
    APPINSIGHTS_INSTRUMENTATIONKEY  = azurerm_application_insights.jamvas-app-insights.instrumentation_key
  }
}

# App service's diagnostic setting to ship application logs from file system to log analytics workspace
resource "azurerm_monitor_diagnostic_setting" "jamvas-application-logs-setting" {
  name               = "${local.prefix}-application-logs-setting"
  target_resource_id = azurerm_linux_web_app.jamvas-backend.id

  enabled_log {
    category = "AppServiceConsoleLogs"
    retention_policy {
      enabled = true
      days    = 1
    }
  }

  # Destination where the logs should be sent to
  log_analytics_workspace_id = azurerm_log_analytics_workspace.jamvas-log-analytics-workspace.id
}

# Log analytics workspace
# Pricing details: https://azure.microsoft.com/en-gb/pricing/details/monitor/
resource "azurerm_log_analytics_workspace" "jamvas-log-analytics-workspace" {
  name                = "${local.prefix}-log-analytics-workspace"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  daily_quota_gb      = 0.1 # ~100MB per day ~3GB per month < 5GB free per month
}

resource "azurerm_application_insights" "jamvas-app-insights" {
  name                       = "${local.prefix}-app-insights"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  application_type           = "other"
  retention_in_days          = 30
  daily_data_cap_in_gb       = 0.1 # ~100MB
  workspace_id               = azurerm_log_analytics_workspace.jamvas-log-analytics-workspace.id
  internet_ingestion_enabled = false
  internet_query_enabled     = false
}
