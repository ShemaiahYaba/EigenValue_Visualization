import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext"; // Adjust the path if needed

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
