import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

const BackToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {isVisible && (
        <motion.button
          className="fixed z-50 bottom-5 right-5 hover:text-primary"
          onClick={scrollToTop}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 1.1, repeat: Infinity, repeatType: "loop" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp width={42} height={42} />
        </motion.button>
      )}
    </>
  );
};

export default BackToTopBtn;
