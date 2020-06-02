import { IServerlessAccountInfo, IServerlessPackage } from "common-types";

export const packaging = (config: IServerlessAccountInfo): { package: IServerlessPackage } => {
  if (config.devDependencies.includes("webpack") && !config.devDependencies.includes("serverless-webpack")) {
    return { package: webpackConfig };
  } else if (config.devDependencies.includes("serverless-webpack")) {
    return { package: serverlessWebpackConfig };
  } else {
    return { package: defaultConfig };
  }
};

/**
 * Used when `do-devops` is managing **Webpack** for us
 */
const webpackConfig: IServerlessPackage = {
  /** not needed because node_modules deps have been rolled in */
  excludeDevDependencies: false,
  /**
   * the only file we need is the handler function; at the
   * global level we're just reducing down to the set of .webpack files
   */
  exclude: [],
  include: [".webpack/**"],
};

/**
 * Used when the `serverless-webpack` plugin is managing **Webpack**
 */
const serverlessWebpackConfig: IServerlessPackage = {
  /** not needed because node_modules deps have been rolled in */
  excludeDevDependencies: true,
  /** the only file we need is the handler function */
  exclude: [".git/**", ".serverless/**", "src/**", "test/**"],
};

/**
 * The default config used if **Webpack** tree-shaking is not engaged
 */
const defaultConfig: IServerlessPackage = {
  excludeDevDependencies: true,
  exclude: [".git/**", ".serverless/**", "test/**"],
};
