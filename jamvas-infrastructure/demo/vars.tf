variable "github_packages_username" {
  description = "Username for Github Packages container registry"
  type        = string
  default     = null
}
variable "github_packages_password" {
  description = "Password for Github Packages container registry"
  type        = string
  default     = null
}
variable "github_packages_server_url" {
  description = "Github Packages container registry server url"
  type        = string
  default     = "https://ghcr.io"
}
variable "github_packages_docker_image" {
  description = "Github Packages docker image"
  type        = string
  default     = "ghcr.io/ynnckth/jamvas"
}
variable "github_packages_docker_image_tag" {
  description = "Github Packages docker image tag"
  type        = string
  default     = "latest"
}