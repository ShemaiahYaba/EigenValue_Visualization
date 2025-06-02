// src/contexts/authHelpers.ts
import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

export const checkUserDocument = async (
  currentUser: User
): Promise<boolean> => {
  try {
    const userDocRef: DocumentReference = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userDocRef);
    return !userSnap.exists();
  } catch (error) {
    console.error("Error checking user document:", error);
    return false;
  }
};

export const createUserDocument = async (user: User): Promise<void> => {
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};
