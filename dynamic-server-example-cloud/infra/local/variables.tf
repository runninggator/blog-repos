variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "localstack_endpoint" {
  type    = string
  default = "http://localhost:4566"
}

variable "aws_account_id" {
  type    = string
  default = "000000000000"
}

variable "ssh_key_name" {
  type    = string
  default = null
}

