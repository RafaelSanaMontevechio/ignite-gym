import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';
import { API } from '@services/api';

interface AuthContextProps {
  user: UserDTO | undefined;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({} as UserDTO);

  const memoUser = useMemo(() => {
    return user;
  }, [user]);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await API.post('/sessions', { email, password });

      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user: memoUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
