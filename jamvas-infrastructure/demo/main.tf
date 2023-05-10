# Using Terraform Cloud as the backend to manage the terraform state:
# https://app.terraform.io
#
# Check the Azure Pricing Calculator calculate the expected infrastructure costs:
# https://azure.microsoft.com/en-us/pricing/calculator/
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
      version = "=3.55.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  location = "southeastasia"
  prefix = "jamvas-demo"
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "jamvas-demo"
  location = local.location
}

# App Service Plan
resource "azurerm_service_plan" "app_service_plan" {
  name = "${local.prefix}-app-service-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  os_type = "Linux"
  sku_name = "F1"
}

# App Service
resource "azurerm_linux_web_app" "jamvas-backend" {
  name = "jamvas"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  service_plan_id = azurerm_service_plan.app_service_plan.id

  site_config {
    application_stack {
      docker_image = var.github_packages_docker_image
      docker_image_tag = var.github_packages_docker_image_tag
    }
    always_on = false
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL = var.github_packages_server_url
    DOCKER_REGISTRY_SERVER_USERNAME = var.github_packages_username
    DOCKER_REGISTRY_SERVER_PASSWORD = var.github_packages_password
  }
}