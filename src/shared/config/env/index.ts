function getEnvironmentVariable(key: string) {
  const environmentVariable = import.meta.env[key];

  if (environmentVariable === undefined) {
    const errorTextWrapper = document.createElement('div');

    const errorHeading = document.createElement('h1');
    errorHeading.textContent = 'Something went wrong';

    const errorDescription = document.createElement('p');
    errorDescription.textContent =
      'An error occurred while starting the application. Please, check logs in the console';

    Object.assign(errorTextWrapper.style, {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem'
    });

    errorTextWrapper.appendChild(errorHeading);
    errorTextWrapper.appendChild(errorDescription);

    document.body.innerHTML = '';
    document.body.appendChild(errorTextWrapper);

    const errorMessage = `Critical Error: required environment variable "${key}" is not set`;

    throw new Error(errorMessage);
  }

  return environmentVariable;
}

export const APP_API_URL: string = getEnvironmentVariable('APP_API_URL');
