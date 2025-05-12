import { useAuth } from "@/hooks/useAuth";
import ErrorPage from "@/pages/ErrorPage";
import profileService from "@/services/profile-service";
import { ProfileVM } from "@/types/profile";
import { AxiosResponse } from "axios";
import React, { ReactNode, useEffect, useState } from "react";

interface AuthGuardProps {
  element: ReactNode;
  requireStaff?: boolean;
  requireAdmin?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ element, requireStaff = false, requireAdmin = false }) => {
  const isAuthorized = useAuth();
  const [isSuperuser, setIsSuperuser] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = (await profileService.makeGetProfileRequest()) as AxiosResponse<ProfileVM>;
        setIsSuperuser(response.data.is_superuser as boolean);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsSuperuser(false);
      }
    };

    fetchProfile();
  }, []);

  if (!isAuthorized) {
    return <ErrorPage statusCode={403} message="Unauthorized." authError />;
  }

  if (isSuperuser === null) {
    return <div>Loading permissions…</div>;
  }

  if (requireAdmin && !isSuperuser) {
    return <ErrorPage statusCode={403} message="Admin access required." authError />;
  }

  if(requireStaff) {
    console.log('here');
  }

  return <>{element}</>;
};

export default AuthGuard;