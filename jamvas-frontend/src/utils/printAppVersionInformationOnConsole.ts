export const printAppVersionInformationOnConsole = () => {
  console.group("App version");
  console.log("Build version: ", import.meta.env.VITE_BUILD_VERSION);
  console.log("Commit hash: ", import.meta.env.VITE_COMMIT_HASH);
  console.log("Branch name: ", import.meta.env.VITE_BRANCH_NAME);
  console.groupEnd();
};
