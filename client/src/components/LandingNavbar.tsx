import { motion, useScroll, useSpring } from "motion/react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeSwitcher from "./theme/ThemeSwitcher";
import { useNavigate } from "react-router";

const LandingNavbar = ({
  handleGetStarted,
}: {
  handleGetStarted: () => void;
}) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MaxWidthWrapper padding="0" className="fixed z-10">
      <nav className="border-opacity-20 backdrop-blur-lg border-gray-500 border-b">
        <div className="flex flex-row justify-between items-center p-4">
          <h2
            className="sm:text-2xl text-xl font-montserrat font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-accent">
              R<span className="text-primary">i</span>de
            </span>
            <span className="text-primary">on</span>
          </h2>
          <div className="flex flex-row gap-7 items-center justify-center">
            <a className="btn btn-secondary" href="/validator">
              Validator
            </a>
            <button
              className="btn btn-secondary"
              onClick={() => handleGetStarted()}
            >
              Get Started
            </button>
            <ThemeSwitcher />
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-accent origin-center w-full"
          style={{
            scaleX,
          }}
        />
      </nav>
    </MaxWidthWrapper>
  );
};

export default LandingNavbar;
