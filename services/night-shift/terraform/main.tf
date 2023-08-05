provider "aws" {
  region = var.aws_region
}

# Create the s3 bucket to store the lambda code
resource "aws_s3_bucket" "night_shift_lambda_bucket" {
  bucket = "night-shift-lambda-bucket"
}

# Set the bucket to private
resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket     = aws_s3_bucket.night_shift_lambda_bucket.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.night_shift_lambda_bucket.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

# Create the a zip file containing the lambda code
data "archive_file" "night_shift_lambda_zip" {
  type = "zip"

  source_dir  = "${path.module}/dist"
  output_path = "${path.module}/dist.zip"
}

# Upload the zip file to the s3 bucket
resource "aws_s3_object" "night_shift_lambda_zip" {
  bucket = aws_s3_bucket.night_shift_lambda_bucket.id

  key    = "dist.zip"
  source = data.archive_file.night_shift_lambda_zip.output_path

  etag = filemd5(data.archive_file.night_shift_lambda_zip.output_path)
}

# Create the lambda function
resource "aws_lambda_function" "night_shift" {
  function_name = "NightShift"

  s3_bucket = aws_s3_bucket.night_shift_lambda_bucket.id
  s3_key    = aws_s3_object.night_shift_lambda_zip.key

  runtime = "nodejs16.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.night_shift_lambda_zip.output_base64sha256

  role = aws_iam_role.lambda_exec.arn

  timeout = 60

  environment {
    variables = {
      DB_PATH    = var.db_path
      REED_TOKEN = var.reed_token
    }
  }
}

resource "aws_cloudwatch_log_group" "night_shift" {
  name = "/aws/lambda/${aws_lambda_function.night_shift.function_name}"

  retention_in_days = 30
}

# Create the IAM role for the lambda function
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

# Attach the basic lambda execution policy to the role
resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_cloudwatch_event_rule" "trigger_skill_search_count" {
  name = "trigger-skill-search-count"

  schedule_expression = "rate(14 days)"
}

resource "aws_cloudwatch_event_target" "trigger_skill_search_count_periodically" {
  rule      = aws_cloudwatch_event_rule.trigger_skill_search_count.name
  target_id = aws_lambda_function.night_shift.function_name
  arn       = aws_lambda_function.night_shift.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_night_shift" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.night_shift.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.trigger_skill_search_count.arn
}
