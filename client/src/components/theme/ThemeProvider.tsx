import { ThemeContext } from "@/contexts/ThemeContext";
import { DARK_THEME_NAME, LIGHT_THEME_NAME } from "@/shared/theme-constants";
import { PropsWithChildren, useEffect, useState } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<string>(LIGHT_THEME_NAME);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  const changeTheme = () => {
    const nextTheme =
      theme === LIGHT_THEME_NAME ? DARK_THEME_NAME : LIGHT_THEME_NAME;
    setTheme(nextTheme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
