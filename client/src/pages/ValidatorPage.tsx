import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
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
      className="min-h-full flex flex-col justify gap-16"
    >
      <LandingNavbar handleGetStarted={handleGetStarted} />
        <ValidatorBody/>
      <Footer />
    </MaxWidthWrapper>
  );
};

export default ValidatorPage;
