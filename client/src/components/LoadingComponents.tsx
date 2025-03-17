import { LoadingContext } from "@/contexts/LoadingContext";
import { PropsWithChildren, useState } from "react";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-155">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};
