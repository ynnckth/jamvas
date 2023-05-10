# Infrastructure as Code
This project is using Terraform to provision infrastructure resources to Azure.
Find the infrastructure definitions for this project inside `demo/main.tf`.

## Initial setup
1. We want to manage our terraform state in [Terraform Cloud](https://app.terraform.io)
   1. Register a Terraform Cloud account. Make sure to grant access to your repository in the new Github Application that is created as part of this.
   2. Create an organization
   3. Create a workspace
   4. Connect the workspace to the Github repository and set the working directory to `jamvas-infrastructure/demo`

2. Register environment variables/secrets for Github Packages container registry credentials
   1. Create a new Personal Access Token (PAT) in Github to pull docker images from container Github Packages container registry
   2. Create two new variables in Terraform Cloud
   ```
   TF_VAR_github_packages_username=<your github username>
   TF_VAR_github_packages_password=<the previously created PAT>
   ```

3. Create an Azure Service Principal
   1. Download and install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-macos) on your local machine (if not already done)
   2. Follow [this guide](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret) to create an Azure Service Principal using the Azure CLI.
      This will create a service principal with the contributor role for Terraform Cloud to provision resources.
   3. As described in the guide, define environment variables for the service principal details in Terraform Cloud to allow it to provision resources to Azure

