import Footer from "@/components/Footer";
import LandingHeading from "@/components/landing/LandingHeading";
import LandingNavbar from "@/components/landing/LandingNavbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const LandingPage = () => {
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
      <LandingHeading />

      <Footer />
    </MaxWidthWrapper>
  );
};

export default LandingPage;
