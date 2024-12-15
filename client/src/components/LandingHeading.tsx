import TypewriterComponent from "typewriter-effect";
import ContactForm from "./ContactForm";
import AboutSection from "./AboutSection";

const LandingHeading = () => {
  return (
    <div className="mt-44 flex flex-col gap-7">
      <main className="flex lg:flex-row flex-col gap-16 justify-center items-center">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="xl:text-4xl lg:text-3xl sm:text-3xl text-lg font-montserrat">
            Innovative ticket management system!
          </h1>

          <div className="xl:text-3xl sm:text-2xl text-md text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-300">
            <TypewriterComponent
              options={{
                strings: [
                  "Manage your tickets with ease.",
                  "Load your public transport card easily.",
                  "Accessible to everyone.",
                  "Easy to use and understand.",
                  "Fast and reliable.",
                  "In-built ticket validation system.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="relative group cursor-grabbing">
          <img
            src="/landing-img.jpg"
            className="lg:w-80 lg:h-72 sm:w-64 sm:h-56 w-40 h-36 rounded-3xl opacity-40 blur-sm transform group-hover:scale-105 transition-all duration-500 ease-in-out"
            alt="Large Background Image"
          />
          <img
            src="/landing-img.jpg"
            className="absolute top-1/2 left-1/2 lg:w-72 lg:h-64 sm:w-52 sm:h-48 w-36 h-32 rounded-3xl shadow-lg transform -translate-x-1/2 -translate-y-1/2 scale-100 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 ease-in-out"
            alt="Small Foreground Image"
          />
        </div>
      </main>

      <div className="relative w-full flex flex-col items-center">
        <div className="w-1 h-36 bg-gradient-to-b from-transparent to-primary opacity-65"></div>
      </div>

      <AboutSection />

      <div className="relative w-full flex flex-col items-center">
        <div className="w-1 h-36 bg-gradient-to-b from-transparent to-primary opacity-65"></div>
      </div>

      <ContactForm />
    </div>
  );
};

export default LandingHeading;
