resource "aws_dynamodb_table" "user_table" {
  name           = "UserTable"
  billing_mode   = "PAY_PER_REQUEST"

  hash_key       = "email"

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  attribute {
    name = "email"
    type = "S"
  }
}
