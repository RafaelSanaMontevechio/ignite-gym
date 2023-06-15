import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { API } from '@services/api';

import { UserDTO } from '@dtos/UserDTO';
import {
  storageUserSave,
  getStorageUser,
  removeStorageUser,
} from '@storage/storageUser';
import {
  getStorageAutToken,
  removeStorageAuthToken,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';

interface AuthContextProps {
  user: UserDTO | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  updateUserProfile: (user: UserDTO) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const memoUser = useMemo(() => {
    return user;
  }, [user]);

  async function userAndTokenUpdate({
    userData,
    token,
  }: {
    userData: UserDTO;
    token: string;
  }) {
    try {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      throw error;
    }
  }

  async function storageUserAndToken(
    userData: UserDTO,
    token: string,
    refreshToken: string,
  ) {
    try {
      setIsLoadingUserStorageData(true);

      await storageAuthTokenSave({ token, refreshToken });
      await storageUserSave(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await API.post('/sessions', { email, password });

      if (data.token && data.user && data.refresh_token) {
        await storageUserAndToken(data.user, data.token, data.refresh_token);
        userAndTokenUpdate(data.user);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);

      await removeStorageAuthToken();
      await removeStorageUser();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUser() {
    try {
      setIsLoadingUserStorageData(true);

      const { token } = await getStorageAutToken();
      const userLoggedIn = await getStorageUser();

      if (token && userLoggedIn) {
        userAndTokenUpdate({ userData: userLoggedIn, token });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const subscribe = API.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user: memoUser,
        signIn,
        signOut,
        isLoadingUserStorageData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
