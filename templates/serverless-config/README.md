# Serverless Config

This directory is used to configure your serverless deployment. As part of the serverless preparation process (aka, `yarn prep`) the `serverless-config/build.ts` file will kick off a process which is geared to make sure your `serverless.yml` file is setup perfectly. 

> It is generally best **not** to directly modify the `serverless.yml` file; in most cases any changes you make will just be written over by this prep/build process anyway.

```sh
yarn prep
# alternatively
yarn build
```

The `do-devops` repo will prep the build process by:

- Searching through the `/src/handlers` folders for handler functions and building a `./functions/inline.ts` file
- It will also build some useful Typescript typings in `/src/@types/functions.ts`
- It will then handoff responsibility to the local `./build.ts` file to convert the serverless config into a `serverless.yml` file.

## Sections

- **Provider**

  The provider section lets you setup the AWS profile/project you're going to use, specify your default region, and add permissions where needed for your lambda functions. This section tends not to be too large so it typically is just defined in `serverless-config/provider.ts` but can be further decomposed in it's own directory if that's appropriate.

- **Functions**

  Typically in a serverless project you write "handler functions" and then _also_ write a function configuration for that function. With modern versions of `do-devops` you can now write both in a single file. How? Just export your handler function as `handler` and then separately export your configuration as `config`:

  `src/handlers/foobar.ts`

  ```typescript
  import { IServerlessFunction, IDictionary } from 'common-types';
  export const config: IServerlessFunction = {
    description: "Do incredible things in a non-descript, almost abstract way",
    timeout: 10,
    memorySize: 1024,
  }

  export const handler: (event, context) => { ... }
  ```

  Note that this convention implies that any given file should define and export only _one_ function. This should not be a limitation though as this is generally a good practice more broadly (similar to JS and Java's one class per file rule).

- **Step Functions**

  Step functions are not always used but if they are then the build process will automatically add the `serverless-step-functions` plugin for you. What is left for you to do is to define the various step-functions. For an example of that see the `index.ts` and `example.ts` files.

## Serverless Typings

All the _typings_ for serverless functions come from the `common-types` library and can be found here: [typings](https://github.com/lifegadget/common-types/blob/master/src/serverless.ts). 
