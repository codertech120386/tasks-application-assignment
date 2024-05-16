import { AxiosInstance } from 'axios';
import { getItemFromLocalStorage } from '../../utils/components';

const withauthorizationInterceptor = (axiosInstance: AxiosInstance) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance.interceptors.request.use((config: any) => ({
    ...config,
    headers: {
      Authorization:
        localStorage.getItem('token') &&
        `Bearer ${getItemFromLocalStorage('token')}`,
    },
  }));
};
export default withauthorizationInterceptor;
