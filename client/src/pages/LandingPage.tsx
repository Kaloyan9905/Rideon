import Footer from "@/components/Footer";
import LandingHeading from "@/components/LandingHeading";
import LandingNavbar from "@/components/LandingNavbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper
      padding="0"
      className="min-h-full flex flex-col justify gap-16"
    >
      <LandingNavbar handleGetStarted={() => navigate("/sign-up")} />
      <LandingHeading />

      <Footer />
    </MaxWidthWrapper>
  );
};

export default LandingPage;
