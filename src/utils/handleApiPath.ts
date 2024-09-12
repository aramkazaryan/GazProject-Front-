// The method that combines base API URL (process.env.REACT_APP_API_URL) with passed pathName.
// Shows warning to the console when the environment variable is not defined. (DEV and PROD environments)
// ex.: <baseUrl>https://api.simpli.care <pathName>/v1/tenants/ => https://api.simpli.care/v1/tenants/

const handleApiPath = (pathName: string): string => {
  if (!process.env[pathName]) {
    // eslint-disable-next-line no-console
    console.warn(`${pathName} is not defined`);
  }

  if (!process.env.REACT_APP_API_URL) {
    // eslint-disable-next-line no-console
    console.warn(`REACT_APP_API_URL is not defined`);
  }

  if (!!process.env[pathName] && !!process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}${process.env[pathName]}`;
  }
  return "";
};

export default handleApiPath;
