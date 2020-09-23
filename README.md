# Lambda Typescript GENERATOR

This Yeoman generator is intended for backend services using AWS Lambda's Serverless stack as well as writing code in Typescript. This library provides strong typing support for the serverless config, Lambda Functions, Step Functions, and several other features in the Serverless landscape that were a bit underserved.

## Install

```sh
# install Yoeman CLI if you haven't already
npm i -g yo
# install this scaffold
npm i -g generator-lambda-typescript
```

Once installed you only need type `yo lambda-typescript` in a the directory where your new project will reside. Note, that the intent is to be fully non-destructive with updates so if you want to pickup updates to the scaffold in the future it should be safe to re-run whenever you like. If there is a file conflict it will tell you and you can decide whether to take the change or pass on it.

## Opinionated Start

Being opinionated allows users of this scaffolding to get start quickly, work efficiently and take advantage of some of the best practices learned at Inocan Group along the way. Below are the main areas where opinion has been used (hopefully) to your benefit:

### Serverless Framework and Typescript
We assume that serverless projects use the [**Serverless Framework**](https://serverless.com) and install the latest version into your repository. This generator also assumes that most (if not all) Lambda functions are written in Typescript.

### Enhanced CLI and developer build ergonomics

To provide enhanced functionality we wrap the Serverless CLI's commands (e.g., `deploy`, `test`, etc.). In addition we leverage the **aws-orchestrate**'s library's `wrapper` function for your handler functions. With these two advantages the following benefits are achieved:

- Handler functions exhibit strong typing on both the request and response regardless of their calling context (e.g., API Gateway, fn-to-fn, etc.):

    ```typescript
    /** aws-orchestrate wrapper function **/
    export const handler = wrapper(fn);
    /** 
     * your handler function ... 
     * which can count on consistent and strongly typed data
     **/
    const fn: IHandlerFunction<IRequest, IResponse> = (req, ctx) => { ... } 
    ```

- Handler function _configuration_ can be done within the handler function instead of putting it into the `serverless.yml` file and is strongly typed:

    ```typescript
    export const config: IHandlerConfig = {
      description: "my function description",
      timeout: 5000
    }

    export const handler: IHandlerFunction = (req, ctx) => {}
    ```

    > Note: the `serverless.yml` configuration file is still being _used_ when you deploy but it is now _generated_ for you when you run `yarn build` and the function config is local to the actual code.

- Auto-sensing configuration defaults:

    Because the build system generates your `serverless.yml` at _build time_, it can also dynamically look into your repos dependencies for clues on certain configuration options. For example, the package `serverless-step-functions` is a popular plugin to the Serverless framework. You'd likely install it if you were using AWS step-functions but not if you weren't.
    Based on it's inclusion, the build system will configure the `serverless.yml` to either include this plugin or ignore it.

- Full control over config with strong typing support:

    While there will many times that the build system will be able to automatically configure everything correctly, you still need the ability to state _exactly_ what you want when you need that. This scaffold/build solution accomodates that you can change any configuration setting but it let's you define this in Typescript (versus YAML) and therefore allows you to ensure your configuration is always correct before you deploy.

- A bespoke process for using **Webpack** to eliminate all dead code from your dependency tree that -- at least in our tests -- reduces the codes size substantially from the base webpack plugin.

## Optional Opinions

The CLI will guide you through a number of optional configurations which you may opt-in to:

- **Database** - `universal-fire` and `firemodel` can be added to provide full modeling capabilities for your data entities and allows a very low friction way of interacting with your Firebase databases while maintaining strong typing across repos.
- **Testing** - choose between Mocha/Chai (the default), Jest (has momenutum but kinda slow), or Uvu (blasingly fast). In the case of the first two, a [Wallaby.js](https://wallabyjs.com) will be provided so you can use Wallaby's real time test runner
- **Documentation** - you can choose to create a `docs` folder which will serve up a documentation site using [Vitepress](https://github.com/vuejs/vitepress)
