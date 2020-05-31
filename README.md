# Lambda Typescript GENERATOR

This Yeoman generator is intended for backend services using AWS Lambda's Serverless stack as well as writing code in Typescript. This library provides strong typing support for the serverless config, Lambda Functions, Step Functions, and several other features in the Serverless landscape that were a bit underserved.

## Install

```sh
# install Yoeman CLI if you haven't already
npm i -g yo
# install this scaffold
npm i -g generator-lambda-typescript
```

Once installed you only need type `yo lambda-typescript` in a new directory that you want to convert into a new project. Note, that the intent is to be fully non-destructive with updates so if you want to pickup updates that may have come through updates to the scaffold it should be safe to re-run whenever you like. If there is a file conflict it will tell you and you can decide whether to take the change or pass on it.

## Related/Included Efforts

The following libraries were authored by the same group and are included in your scaffolded project:

- `common-types` - handy TS typings for AWS, Serverless, and more
- `universal-fire` - if you choose one of the Firebase DB options we provide a convenient API that sits on top of the Firebase SDK (although will be very familiar to you if you use Firestore) which provides the same API for the real-time-db as for Firestore while offering an in-memory mocked database capability.
- `firemodel` - provides full modeling capabilities for your data entities and allows a very low friction way of interacting with your Firebase databases
- `do-devops` - most of the devops commands, including a wrapper over the Serverless CLI, are provided by this library which helps with handy defaults and opens up giving your Serverless configuration to be defined and worked with in Typescript (versus YAML) and therefore gaining all the benefits that come with typing.