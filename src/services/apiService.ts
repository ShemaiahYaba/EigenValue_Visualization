// src/services/apiService.ts
import { auth } from "@/utils/firebase";

export const secureApiCall = async (endpoint: string, options: RequestInit = {}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();

  return fetch(endpoint, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};