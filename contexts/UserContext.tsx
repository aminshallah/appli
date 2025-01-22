import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type User = {
  firstName: string;
  lastName: string;
  avatar: string;
  idVR : string;
  id : string;
  familyId : string;
  familyMembers : [string] ;
  familyName : string ; 
  shotgun : string;
  role : string;
  favoris : [string],
  accessToken : string
}

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultUser: User = {
  firstName: '',
  lastName: '',
  avatar: '',
  idVR : '',
  id : '',
  familyId: '',
  familyMembers : [''],
  familyName : '',
  shotgun : '',
  role : '',
  favoris : [''],
  accessToken : ''
  
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