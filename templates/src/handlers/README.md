# Handlers

When using this opinionated set of tools which coming from the Yeoman `lambda-typescript` scaffolding you should make sure to put all of your serverless handler functions into this folder. You can add any additional folder structure that makes to you.

Using this folder as the root for handler functions helps consistency but also aligns with the build-system that you will be using. It uses glob patterns and AST to detect automatically your handlers and configure them automatically into the `serverless.yml` file. For this automated configuration you must do two things:

- `handler` - export a symbol called _handler_ and your function will be registered into `serverless.yml` with a basic and default configuration.
- `config` - export a symbol called _config_ and you you will take control over the configuration. At the very least you should provide a "description" for your handler functions.

> **Note:** your handler function does not NEED to use the _wrapper_ function provided by the [`aws-orchestrate`](https://aws-orchestrate.com/) library but it STRONGLY recommended.

## Examples

When you first install this scaffold you'll get a set of example handler functions. They will hopefully serve as a simple guide but they _will_ auto-register themselves and you'll not want that once you start creating your creative genious so remove them as soon as you're ready.

Below is the basic structure that we'd expect your serverless functions to follow:

```typescript
import { wrapper, IHandlerFunction } from 'aws-orchestrate';

const fn: IHandlerFunction<IRequest, IResponse> = async (request, context) {
  // your code
}

export const handler = wrapper(fn)
```