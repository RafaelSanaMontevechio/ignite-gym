import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '@dtos/UserDTO';

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig';

type StorageAuthTokenProps = {
  token: string;
  refreshToken: string;
};

export async function storageAuthTokenSave({
  token,
  refreshToken,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refreshToken }),
  );
}

export async function getStorageAutToken() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const { token, refreshToken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {};

  return { token, refreshToken };
}

export async function removeStorageAuthToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
