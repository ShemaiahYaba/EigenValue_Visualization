import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  UserCredential,
  User,
} from "firebase/auth";

export const signUp = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};

export const resetPassword = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

export const verifyEmail = (user: User): Promise<void> => {
  if (!user.emailVerified) {
    return sendEmailVerification(user);
  }
  return Promise.resolve();
};
