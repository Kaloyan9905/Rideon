import MaxWidthWrapper from "../MaxWidthWrapper";

const AboutSection = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-5 max-w-prose mx-auto">
        <h1 className="text-3xl font-montserrat font-medium text-center">
          About us
        </h1>
        <p className="leading-relaxed sm:text-lg lg:text-xl sm:leading-loose tracking-wide indent-7 opacity-95 shadow-2xl px-12 py-8 rounded-xl">
          <span className="[text-shadow:0_0_.3em_pink] font-montserrat">
            Rideon
          </span>{" "}
          is an innovative ticket management system, designed to help people
          manage their{" "}
          <span className="underline font-bold">
            public transport related documents
          </span>{" "}
          or <span className="underline font-bold">tickets</span> with ease.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default AboutSection;
