import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '@dtos/UserDTO';

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig';

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(token));
}

export async function getStorageAutToken() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  return token;
}

export async function removeStorageAuthToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
