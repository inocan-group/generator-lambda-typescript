# Step Functions

You will often not need [Step Functions](https://docs.aws.amazon.com/step-functions) when working with Lambda but they are a handy tool state management and are particularly useful when you need to need to orchestrate the "fan-in" pattern. 

## Configuration

Due to our use of Typescript for configuration you get strong typing support when building a state machine which is important because to deploy step functions (or do updates) you must do a _full_ deploy which can get  slow as the repo grows. The `example.ts` file shows how you might configure a step function. 

When you're ready to have your _real_ step function be deployed just add it to the default export in `index.ts` under the `stateMachines` dictionary. This will automatically turn on the required `serverless-step-functions` plugin which will have already been installed as part of the Yeoman scaffolding process you went through when you created this repo.
