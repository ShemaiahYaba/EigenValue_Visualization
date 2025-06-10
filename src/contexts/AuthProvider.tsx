// src/contexts/AuthProvider.tsx
import { useState, useEffect, ReactNode } from "react";
import { User, UserCredential, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { auth } from "@/utils/firebase";

import * as authService from "@/services/authService";
import * as userService from "@/services/userService";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const isNew = await userService.checkUserDocument(currentUser);
        setIsNewUser(isNew);
      } else {
        setUser(null);
        setIsNewUser(false);
      }
      setLoading(false);
    });

    // Listen for token refresh
    const unsubscribeToken = onIdTokenChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Optionally, you can refresh user profile or permissions here
    });

    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  // Sign Up with extended data
  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<UserCredential> => {
    const userCredential = await authService.signUp(email, password);

    await userService.createUserDocument(userCredential.user, {
      firstName,
      lastName,
    });

    await authService.verifyEmail(userCredential.user);
    setIsNewUser(true);
    return userCredential;
  };

  // Sign In
  const signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const userCredential = await authService.signIn(email, password);
    await userService.updateLastLogin(userCredential.user.uid);
    setUser(userCredential.user);
    return userCredential;
  };

  // Sign Out
  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
    setIsNewUser(false);
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<void> => {
    await authService.resetPassword(email);
  };

  // Manually trigger email verification
  const verifyEmail = async (): Promise<void> => {
    if (user) {
      await authService.verifyEmail(user);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isNewUser,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
