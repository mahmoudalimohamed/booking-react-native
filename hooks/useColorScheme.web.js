import { useEffect, useState } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";

export default function useColorScheme() {
  const colorScheme = useNativeColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setIsDark(e.matches);
    };

    // Set initial value
    setIsDark(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDark ? "dark" : "light";
}
