import { useAuth } from "@/hooks/useAuth";
import ErrorPage from "@/pages/ErrorPage";
import React, { ReactNode } from "react";

const AuthGuard = ({
  element,
  requireStaff,
  ...rest
}: {
  element: ReactNode;
  requireStaff?: boolean;
}) => {
  const isAuthorized = useAuth();

  if (isAuthorized) {
    return <React.Fragment {...rest}>{element}</React.Fragment>;
  } else {
    return (
      <ErrorPage statusCode={403} message="Unauthorized." authError={true} />
    );
  }
};

export default AuthGuard;