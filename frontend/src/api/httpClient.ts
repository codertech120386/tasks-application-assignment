import axios, { AxiosError, AxiosResponse } from 'axios';
import { Location, NavigateFunction } from 'react-router';

import withConfigInterceptor from './interceptors/configInterceptor';
import withauthorizationInterceptor from './interceptors/authorizationInterceptor';

const httpClient = axios.create({
  baseURL: process.env.API_URL,
});

withauthorizationInterceptor(httpClient);
withConfigInterceptor(httpClient);

export const axiosErrorHandler = (
  error: AxiosError,
  location: Location,
  navigate: NavigateFunction
): string => {
  if (window.navigator.onLine && error.code === 'ERR_NETWORK') {
    navigate(location.pathname, {
      state: { errorStatusCode: 500 },
    });

    return error.message;
  }

  if (!window.navigator.onLine && error.code === 'ERR_NETWORK') {
    navigate(location.pathname, {
      state: { errorStatusCode: 12163 },
    });

    return error.message;
  }

  if (error.code === 'ECONNABORTED') {
    return `Problem: ${error.message}`;
  }

  const axiosResponse = error.response as AxiosResponse;

  if (axiosResponse.data.statusCode === 400) {
    return `Validation problem: ${axiosResponse.data.message}`;
  }
  if (axiosResponse.data.statusCode === 401) {
    if (location.pathname === '/signin') {
      return `Problem: ${axiosResponse.data.message}`;
    }
    navigate(location.pathname, { state: { errorStatusCode: 401 } });
  } else if (axiosResponse.data.statusCode === 404) {
    navigate(location.pathname, { state: { errorStatusCode: 404 } });
  } else if (axiosResponse.data.statusCode === 409) {
    return `Conflict: ${axiosResponse.data.message}`;
  } else if (axiosResponse.data.statusCode === 429) {
    navigate(location.pathname, { state: { errorStatusCode: 429 } });
  } else if (axiosResponse.data.statusCode === 500) {
    navigate(location.pathname, { state: { errorStatusCode: 500 } });
  } else if (axiosResponse.data.statusCode === 501) {
    navigate(location.pathname, { state: { errorStatusCode: 501 } });
  } else if (axiosResponse.data.statusCode === 503) {
    navigate(location.pathname, { state: { errorStatusCode: 503 } });
  }

  return axiosResponse.data.message
    ? axiosResponse.data.message
    : axiosResponse.data.detail;
};

export default httpClient;
