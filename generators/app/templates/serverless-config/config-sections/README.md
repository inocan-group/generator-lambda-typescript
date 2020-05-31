# Serverless Configuration

This folder has a file _per section_ of the `serverless.yml` file (aka, the ultimate destination of all Serverless configuration). When you run `yarn prep` (alternatively `yarn build`) these configurations will be called on to rebuild the `serverless.yml`. They are designed to responsive to the environment they operate in and therefore won't need to be changed very often but they are there to be changed if need to be.

## Sections

| Section   | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| service   | This resides at the top of the file and primarily just states the "name" of the service   |
| package   | Describes how the functions should be "packaged"; rarely needs adjusting                  |
| custom    | Sets up variables that can be used in other parts of the configuration                    |
| plugins   | Instructs the Serverless framework on what optional _plugins_ you are using               |
| provider  | Describes identity information about the provider (AWS), region, stage, etc.              |
| iam       | Allows the setup/config of AWS's IAM roles which will be granted to your fn's at run time |
| resources | Allows you to setup non-function assets like S3, DynamoDB, etc.                           |

Not included in this list are **functions** and **step-functions** because their configuration is handled separately in the `./functions` and `./step-functions` directories respectively.