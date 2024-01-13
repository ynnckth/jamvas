import { AppVersion } from "../types/AppVersion";

export const printClientVersion = () => {
  console.group("Client version");
  console.log("Build version: ", import.meta.env.VITE_BUILD_VERSION);
  console.log("Commit hash: ", import.meta.env.VITE_COMMIT_HASH);
  console.log("Branch name: ", import.meta.env.VITE_BRANCH_NAME);
  console.groupEnd();
};

export const printServerVersion = (version: AppVersion) => {
  console.group("Server version");
  console.log("Build version: ", version.buildVersion);
  console.log("Commit hash: ", version.commitHash);
  console.log("Branch name: ", version.originatingBranch);
  console.groupEnd();
};
