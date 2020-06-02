const config = {
  global: {
    projectType: "serverless-library",
  },
  build: {
    buildTool: "webpack",
  },
  deploy: {
    target: "serverless",
    showUnderlyingCommands: true,
    sandboxing: "user",
  },
  pkg: {
    preDeployHooks: ["clean"],
    showUnderlyingCommands: true,
  },
};
module.exports = config;
