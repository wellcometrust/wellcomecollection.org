terraform {
  required_version = ">= 0.11"

  backend "s3" {
    key            = "build-state/toggles.tfstate"
    dynamodb_table = "terraform-locktable"
    region         = "eu-west-1"
    bucket         = "wellcomecollection-infra"
    role_arn       = "arn:aws:iam::130871440101:role/experience-developer"
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "eu-west-1"
  assume_role {
    role_arn = "arn:aws:iam::130871440101:role/experience-developer"
  }
}

provider "aws" {
  version = "~> 2.1"
  region  = "us-east-1"
  alias   = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::130871440101:role/experience-developer"
  }
}

provider "template" {
  version = "~> 2.1"
}

module "static" {
  source              = "../../infrastructure/modules/s3_website"
  website_uri         = "toggles.wellcomecollection.org"
  acm_certificate_arn = "arn:aws:acm:us-east-1:130871440101:certificate/bb840c52-56bb-4bf8-86f8-59e7deaf9c98"
}

