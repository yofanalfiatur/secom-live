"use client";

const AboutBanner = ({ dataSection }) => {
  return (
    <>
      <section
        className="overflow-hidden h-[450px] lg:h-[623px] relative bg-cover bg-no-repeat bg-center after:content-[''] after:absolute after:top-0 after:left-0 after:z-[0] after:w-full after:h-full after:bg-navyblue after:opacity-60 ab-banner"
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image
          })`,
        }}
      >
        <div className="container mx-auto flex flex-col mt-18 lg:mt-38 items-center h-full relative z-[1] ab-banner__content">
          <p className="text-white text-base lg:text-xl lg:text-center lg:w-[30%] font-raleway font-normal uppercase tracking-[4] lg:mb-3">
            {dataSection.subtitle}
          </p>
          <h2
            dangerouslySetInnerHTML={{ __html: dataSection.title }}
            className="text-white font-raleway font-medium text-center text-[35px] lg:text-6xl leading-[1.3] lg:leading-[1.2] lg:w-[70%] mt-2 mb-4"
          />
        </div>
      </section>
    </>
  );
};

export default AboutBanner;
