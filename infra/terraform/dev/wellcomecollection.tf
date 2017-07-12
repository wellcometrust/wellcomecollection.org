variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_profile" {}
variable "wellcomecollection_key_path" {}
variable "wellcomecollection_key_name" {}
variable "wellcomecollection_ssl_cert_arn" {}

variable "website_uri" {
  default = "next.dev-wellcomecollection.org"
}

variable "container_tag" {}

provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  profile    = "${var.aws_profile}"
  region     = "eu-west-1"
}

module "wellcomecollection" {
  source                          = "../templates"
  project_name                    = "wellcomecollection"
  ssl_cert_name                   = "*.dev-wellcomecollection.org"
  alb_log_bucket                  = "wellcomecollection-dev-logs"
  container_definitions           = "${file("../container-definitions.json")}"
  container_definitions_thumbor   = "${file("../container-definitions-thumbor.json")}"
  wellcomecollection_key_path     = "${var.wellcomecollection_key_path}"
  wellcomecollection_key_name     = "${var.wellcomecollection_key_name}"
  wellcomecollection_ssl_cert_arn = "${var.wellcomecollection_ssl_cert_arn}"
  website_uri                     = "${var.website_uri}"
  container_tag                   = "${var.container_tag}"
  platform_team_account_id        = "${var.platform_team_account_id}"
}

output "ami_id" {
  value = "${module.wellcomecollection.ami_id}"
}
