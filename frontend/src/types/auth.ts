import { ReactNode } from "react";
// The ReactNode type is used to define the type of children prop that is passed to the AuthProvider component.
export interface User {
  id: number;
  email: string;
}
// The User interface is used to define the shape of the user object that is stored in the context.
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
// The AuthContextType interface is used to define the shape of the context object that is returned by the useAuth hook.
export interface AuthProviderProps {
  children: ReactNode;
}
