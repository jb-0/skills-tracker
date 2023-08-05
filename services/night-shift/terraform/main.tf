provider "aws" {
  region = var.aws_region
}

# Create the s3 bucket to store the lambda code
resource "aws_s3_bucket" "night_shift_lambda_bucket" {
  bucket = "night-shift-lambda-bucket"
}

# Set the bucket to private
resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.night_shift_lambda_bucket.id
  acl    = "private"
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

resource "aws_lambda_function" "night_shift" {
  function_name = "NightShift"

  s3_bucket = aws_s3_bucket.night_shift_lambda_bucket.id
  s3_key    = aws_s3_object.night_shift_lambda_zip.key

  runtime = "nodejs16.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.night_shift_lambda_zip.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "night_shift" {
  name = "/aws/lambda/${aws_lambda_function.night_shift.function_name}"

  retention_in_days = 30
}

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

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
