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
  documentation: boolean;
  license: License;
  unitTesting: UnitTestFramework;
  testFilePattern: string;
}
