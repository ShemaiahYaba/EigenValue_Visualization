// src/contexts/AuthContext.ts
import { createContext } from "react";
import { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isNewUser: boolean;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
