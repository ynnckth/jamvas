export interface AppVersion {
  buildVersion: string;
  commitHash: string;
  originatingBranch: string;
}

/**
 * The values below act as a template and will be overwritten with concrete version information
 * by the backend build pipeline.
 */
export const applicationVersion: AppVersion = {
  buildVersion: '__BUILD_VERSION__',
  commitHash: '__COMMIT_HASH__',
  originatingBranch: '__BRANCH_NAME__',
};
