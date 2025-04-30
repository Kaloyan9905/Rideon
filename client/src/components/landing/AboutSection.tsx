import { motion } from "framer-motion";
import MaxWidthWrapper from "../MaxWidthWrapper";

const AboutSection = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        src="/about-us-bg.mp4"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 backdrop-blur-sm z-1"></div>

      <MaxWidthWrapper>
        <motion.div
          className="relative z-2 grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 max-w-prose">
            <h2 className="text-4xl sm:text-5xl font-bold font-montserrat text-gray-900 leading-tight">
              Rideon is <span className="text-pink-600">redefining</span> public
              transport access
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
              Whether you're commuting daily or planning a trip,{" "}
              <span className="font-semibold text-gray-900">Rideon</span> lets
              you buy, store, and manage your transport tickets all in one place.
              No more queues, no more paper tickets — just tap, ride, and go.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-base sm:text-lg">
              <li>Purchase city tickets with one click</li>
              <li>Instant digital validation & QR scanning</li>
              <li>Real-time ticket expiry reminders</li>
              <li>Multi-city & multi-transport support</li>
            </ul>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-300">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="/about-us-bg.mp4"
            />
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AboutSection;
