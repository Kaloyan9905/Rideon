import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export const useChangeTheme = () => useContext(ThemeContext);
