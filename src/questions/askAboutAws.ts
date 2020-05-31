import { AWS_REGIONS, IDictionary } from "common-types";
import { inputQuestion, listQuestion } from "../private";

import { IAwsProfile } from "do-devops/bin";

export function askAboutAws(defaults: IDictionary, profiles: IDictionary<IAwsProfile>) {
  const profileNames = Object.keys(profiles);
  return [
    listQuestion({
      name: "repoType",
      message:
        "Repos that host serverless functions broadly fall into two categories:\n\n1. Core functional services\n2. Utility libraries which are shared across many services/apps\n\nWe need to know which of these best describes this repo:",
      choices: ["core-services", "utility-library"],
      default: defaults.repoType,
    }),
    inputQuestion({
      name: "awsProfile",
      message: (current) =>
        `Repos playing a role of a "core service" should have a default profile saved. Often\nusing the same name as the service (aka, "${current.serviceName}") but it doesn't need to be:`,
      default: (current: IDictionary) => (current.repoType === "core-services" ? current.serviceName : undefined),
      when: (current) => !defaults.awsProfile && current.repoType === "core-services",
    }),
    inputQuestion({
      name: "__hasAwsCredentials",
      message: "",
    }),
    listQuestion({
      name: "awsRegion",
      message: "What AWS region do you want to associate as your default region?",
      choices: AWS_REGIONS,
      default: (current: IDictionary) =>
        defaults.awsRegion || current.repoType === "core-services" ? "us-east-1" : "",
      when: (current) => !defaults.awsRegion && current.repoType === "core-services",
    }),

    // inputQuestion({
    //   name: "awsAccount",
    //   message: `What is the AWS account ID for this account (typically 12 digit number)?:`,
    //   default: defaults.serviceName,
    //   when: (current) => !defaults.awsProfile && current.repoType === "core-services",
    // }),
    inputQuestion({
      name: "_awsProfile",
      message: `Library/utility repos are often deployed into different environments so having\na default profile and region saved in the repo doesn't make sense but in some cases\nit's valuable to have  :`,
      default: defaults.serviceName,
      when: (current) => !defaults.awsProfile || current.repoType === "utility-library",
    }),
    listQuestion({
      name: "_awsRegion",
      message: "What AWS region do you want to associate as your default region?",
      choices: AWS_REGIONS,
      default: defaults.awsRegion || "us-east-1",
      when: (current) => !defaults.awsRegion || current.repoType === "utility-library",
    }),
  ];
}
