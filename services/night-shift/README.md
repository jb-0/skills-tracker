# Nightshift

This service runs an overnight job based on a defined frequency, the job performs a count to update saved user searches.
It uses AWS Lambda and EventBridge (CloudWatch Events) to achieve this.

## Requirements

You will need to have Node.js installed to run this project, please visit the node site for install
instructions: https://nodejs.org/en/download/

## Installation

```
yarn install
```

## Environment variables

- **DB_PATH** - The path to your development mongo instance, for example:
  mongodb://127.0.0.1:27017/skillsearch
- **REED_TOKEN** - REED API key converted to base64 https://www.reed.co.uk/developers/jobseeker
- **TF_CLOUD_ORGANIZATION** - The name of the terraform cloud organization

## Running the function

To run the function you can execute the below command when in the night-shift directory, this will perform a dry run of
the function. To perform a live run, update the runType in the package.json to "STANDARD".

```bash
yarn dev
```

## Infrastructure

The AWS infrastructure is managed by Terraform, the configuration can be found in the terraform directory. For
convenience two commands have been added to the package.json to make it easier to manage the infrastructure locally.
However the actual deployment is managed through the GitHub actions, see `night-shift.yml` for more details.

To run a terraform plan locally, run the following command:

```bash
yarn plan
```

To run a terraform apply locally, run the following command:

```bash
yarn apply
```
