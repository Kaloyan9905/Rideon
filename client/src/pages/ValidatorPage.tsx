import Footer from "@/components/Footer";
import LandingNavbar from "@/components/landing/LandingNavbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ValidatorBody from "@/components/ValidatorBody";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const ValidatorPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  function handleGetStarted(): void {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/sign-up");
    }
  }

  return (
    <MaxWidthWrapper
      padding="0"
      className="min-h-screen flex flex-col gap-16"
    >
      <LandingNavbar handleGetStarted={handleGetStarted} />
      <div className="justify-center flex flex-col mt-24">
        <ValidatorBody />
      </div>
      <Footer />
    </MaxWidthWrapper>
  );
};

export default ValidatorPage;
