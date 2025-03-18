import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth, db } from "../firebaase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define the shape of the AuthContext
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isNewUser: boolean;
};

// Create the AuthContext with an undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide authentication context to its children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        setIsNewUser(!userSnap.exists());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Function to handle user sign-up
  const signUp = async (email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = userCredential.user;
    await setDoc(doc(db, "users", newUser.uid), {
      uid: newUser.uid,
      email: newUser.email,
      password,
      createdAt: new Date(),
    });
    setUser(newUser);
    setIsNewUser(true);
    return newUser;
  };

  // Function to handle user sign-in
  const signIn = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const loggedInUser = userCredential.user;
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Function to handle user logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsNewUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isNewUser,
        signUp,
        signIn,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
