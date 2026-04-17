provider "aws" {
  region                      = var.aws_region
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    ec2 = var.localstack_endpoint
  }
}

locals {
  # LocalStack Community currently returns 501 for ECR APIs in this environment.
  # To keep `tflocal apply` working, we publish images to a local Docker registry instead.
  registry_host = "localhost:5001"
  image_tag    = "latest"
}

provider "docker" {
  registry_auth {
    address  = local.registry_host
    username = ""
    password = ""
  }
}

