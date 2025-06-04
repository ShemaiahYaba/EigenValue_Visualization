// src/services/userService.ts
import { db } from "@/utils/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

interface NewUserData {
  firstName: string;
  lastName: string;
}

export const createUserDocument = async (
  user: User,
  data: NewUserData
): Promise<void> => {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const { firstName, lastName } = data;
    await setDoc(userRef, {
      email: user.email,
      firstName,
      lastName,
      username: `${firstName}${lastName}`.toLowerCase(),
      createdAt: serverTimestamp(),
    });
  }
};

export const updateLastLogin = async (userId: string): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
};

export const checkUserDocument = async (user: User): Promise<boolean> => {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  return !userDoc.exists();
};

export const getUserNames = async (
  user: User
): Promise<{ firstName: string; lastName: string } | null> => {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
    };
  }
  return null;
};
