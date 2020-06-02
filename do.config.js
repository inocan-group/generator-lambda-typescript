const config = {
  "global": {
    "projectType": "serverless-library"
  },
  "build": {},
  "deploy": {
    "target": "serverless",
    "showUnderlyingCommands": true,
    "sandboxing": "user"
  },
  "pkg": {
    "preDeployHooks": [
      "clean"
    ],
    "showUnderlyingCommands": true
  }
};
module.exports = config;