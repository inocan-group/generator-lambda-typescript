import { UnitTestFramework } from "do-devops";
import { DbTech, License } from "../questions";

export interface IConfig {
  serviceName: string;
  serviceDescription: string;
  repoType: "core-services" | "utility-library";
  repoOrg: string;
  repoUrl: string;
  awsProfile: string;
  awsRegion: string;
  database: DbTech;
  documentation: DocumentationSolution;
  license: License;
  unitTesting: UnitTestFramework;
  testFilePattern: string;
}

export enum DocumentationSolution {
  NONE = "NONE",
  vuepress = "vuepress",
  vitepress = "vitepress",
}
