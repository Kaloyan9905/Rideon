import { motion } from "framer-motion";
import TypewriterComponent from "typewriter-effect";
import ContactForm from "./ContactForm";
import AboutSection from "./AboutSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const LandingHeading = () => {
  return (
    <section className="relative flex flex-col gap-0 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-pink-300 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-300 opacity-20 rounded-full blur-3xl" />
      </div>
      <div className="relative">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-16 px-6 sm:px-10 max-w-7xl mx-auto pt-32 pb-52 relative z-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex-1 text-center lg:text-left space-y-6 order-1">
            <h1 className="text-4xl sm:text-5xl font-chewy font-bold  leading-tight">
              Innovative ticket management system!
            </h1>
            <div className="text-2xl sm:text-3xl font-medium bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent">
              <TypewriterComponent
                options={{
                  strings: [
                    "Manage your tickets with ease.",
                    "Reload your travel card in seconds.",
                    "Accessible, reliable, secure.",
                    "Designed for everyone.",
                    "Validate and store tickets instantly.",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center order-2 ">
            <div className="relative w-64 h-[540px] rounded-3xl bg-black border-[12px] border-gray-900 shadow-2xl overflow-hidden">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/header-phone-bg.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </motion.div>
        <svg
          className="absolute bottom-0 left-0 w-[100vw] h-96 -z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f9fafb" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f9fafb" stopOpacity="1" />
              </linearGradient>
            </defs>

            <path
              d="M0,64L80,96C160,128,320,192,480,202.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64"
              fill="none"
              stroke="#d1d5db"
              stroke-width="2"
            />

            <path
              fill="url(#waveGradient)"
              d="M0,64L80,96C160,128,320,192,480,202.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64V320H0Z"
            />
          </svg>
        </svg>
      </div>
      <AboutSection />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <ContactForm />
      </motion.div>
    </section>
  );
};

export default LandingHeading;
