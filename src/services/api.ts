import axios, { AxiosInstance, AxiosError } from 'axios';

import {
  getStorageAutToken,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';

import { AppError } from '@utils/AppError';

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const API = axios.create({
  baseURL: 'http://localhost:3333',
}) as ApiInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

API.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = API.interceptors.response.use(
    (response) => response,
    //Exception
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const { refreshToken } = await getStorageAutToken();

          if (!refreshToken) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(API(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await API.post('/sessions/refresh_token', {
                refresh_token: refreshToken,
              });

              await storageAuthTokenSave({
                token: data.token,
                refreshToken: data.refresh_token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };

              API.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              resolve(API(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      }

      return Promise.reject(requestError);
    },
  );

  return () => {
    API.interceptors.response.eject(interceptTokenManager);
  };
};

// API.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export { API };
