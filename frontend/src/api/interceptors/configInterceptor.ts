import { AxiosInstance } from "axios";

const withConfigInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => ({
    ...config,
    timeout: 120000,
    timeoutErrorMessage: "The request timed out.",
  }));
};
export default withConfigInterceptor;
