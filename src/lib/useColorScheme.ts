import { useEffect, useState } from "react";
import { getInitialColorScheme, persistColorScheme, type ColorScheme } from "./colorScheme";

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getInitialColorScheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", colorScheme === "dark");
    persistColorScheme(colorScheme);
  }, [colorScheme]);

  function toggleColorScheme() {
    setColorScheme((scheme) => (scheme === "light" ? "dark" : "light"));
  }

  return { colorScheme, toggleColorScheme };
}
