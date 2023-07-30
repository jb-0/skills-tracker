# Nightshift

This service runs an overnight job based on a defined frequency, the job performs a count to update saved user searches.
It uses AWS Lambda and CloudWatch to achieve this.

## Requirements

You will need to have Node.js installed to run this project, please visit the node site for install
instructions: https://nodejs.org/en/download/

## Installation

```
yarn install
```

## Environment variables

- **DEV_DB_PATH** - The path to your development mongo instance, for example
  mongodb://127.0.0.1:27017/skillsearch
- **REED_B64** - REED API key converted to base64 https://www.reed.co.uk/developers/jobseeker

## Running the function

To run the function you can execute the below command in the project root directory. The function
accepts an object containing the runType, currently only 'standard' is valid input.

```
node -e "(async () => console.log(await require('./index').handler({runType:'standard'})))();"
```

For convenience the above function is already defined in package.json as a test, so "npm test" can
also be executed to achieve the same result.

## Terraform

export TF_CLOUD_ORGANIZATION=super-org
