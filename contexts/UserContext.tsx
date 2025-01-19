import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type User = {
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultUser: User = {
  firstName: '',
  lastName: '',
  avatar: ''
  
};

export const UserContext = createContext<UserContextInterface>({
  user: defaultUser,
  setUser: (user : User) => {}
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}