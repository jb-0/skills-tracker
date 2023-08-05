# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "eu-west-2"
}

variable "db_path" {
  description = "The path for the MongoDB instance"

  type        = string
}

variable "reed_token" {
  description = "The B64 token for the Reed API"

  type        = string
}
