# Output value definitions

output "night_shift_lambda_bucket_name" {
  description = "Name of the S3 bucket used to store function code."

  value = aws_s3_bucket.night_shift_lambda_bucket.id
}
