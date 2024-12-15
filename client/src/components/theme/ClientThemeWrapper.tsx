import { ThemeContext } from "@/contexts/ThemeContext";
import { PropsWithChildren, useContext } from "react";

const ClientThemeWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useContext(ThemeContext);

  return <div data-theme={theme}>{children}</div>;
};

export default ClientThemeWrapper;
