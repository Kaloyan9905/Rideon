import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@/shared/auth-constants";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

    if (accessToken) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  return isAuthorized;
};
