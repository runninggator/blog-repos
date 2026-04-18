resource "random_uuid" "jws" {}

resource "aws_ssm_parameter" "secret" {
  name        = "/jws/signing_key"
  description = "Secret key for JWS encryption"
  type        = "SecureString"
  value       = random_uuid.jws.result
}
