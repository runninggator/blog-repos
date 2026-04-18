# IAM role for Lambda execution
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "example" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Package the Lambda function code
data "archive_file" "example" {
  type        = "zip"
  output_path = "${path.module}/../../backend/built/function.zip"
  source_dir  = "${path.module}/../../backend/built"
  excludes    = ["function.zip", "function"] 
}

# Lambda function
resource "aws_lambda_function" "example" {
  filename         = data.archive_file.example.output_path
  function_name    = "example_lambda_function"
  role             = aws_iam_role.example.arn
  handler          = "lambda.handler"
  source_code_hash = data.archive_file.example.output_base64sha256
  memory_size = 512

  runtime = "nodejs22.x"

  environment {
    variables = {
      ENVIRONMENT          = "development"
      LOG_LEVEL            = "info"
      AWS_HOST             = "localhost.localstack.cloud"
      USER_TABLE_NAME      = aws_dynamodb_table.user_table.name
      AWS_PORT             = "4566"
      JWS_SECRET           = aws_ssm_parameter.secret.value
    }
  }
}
