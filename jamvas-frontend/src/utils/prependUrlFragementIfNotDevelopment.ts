/**
 * When running in production mode, the base path of the application is /jamvas
 * Therefore, we need to prepend this url fragment in that case.
 */
export const prependUrlFragmentIfNotDevelopment = (sampleUrl: string) => {
  if (!import.meta.env.DEV) {
    return `/jamvas${sampleUrl}`;
  }
  return sampleUrl;
};
