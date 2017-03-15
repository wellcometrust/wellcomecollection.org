variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "wellcomecollection_key_path" {}
variable "wellcomecollection_key_name" {}
variable "wellcomecollection_ssl_cert_arn" {}
variable "build_state_bucket" {}
variable "container_tag" {}

module "wellcomecollection" {
  source                          = "templates/"
  project_name                    = "wellcomecollection"
  container_definitions           = "${file("container-definitions.json")}"
  aws_region                      = "eu-west-1"
  aws_node_ami                    = "ami-ffaad08c"
  aws_access_key                  = "${var.aws_access_key}"
  aws_secret_key                  = "${var.aws_secret_key}"
  wellcomecollection_key_path     = "${var.wellcomecollection_key_path}"
  wellcomecollection_key_name     = "${var.wellcomecollection_key_name}"
  wellcomecollection_ssl_cert_arn = "${var.wellcomecollection_ssl_cert_arn}"
  container_tag                   = "${var.container_tag}"
  build_state_bucket              = "${var.build_state_bucket}"
}

output "ami_id" {
  value = "${module.wellcomecollection.ami_id}"
}
