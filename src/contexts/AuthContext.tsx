import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { UserDTO } from '@dtos/UserDTO';
import { API } from '@services/api';
import { storageUserSave, getStorageUser } from '@storage/stotageUser';

interface AuthContextProps {
  user: UserDTO | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const memoUser = useMemo(() => {
    return user;
  }, [user]);

  async function loadUser() {
    try {
      const userLoggedIn = await getStorageUser();

      if (userLoggedIn) {
        setUser(userLoggedIn);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await API.post('/sessions', { email, password });

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: memoUser, signIn, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
