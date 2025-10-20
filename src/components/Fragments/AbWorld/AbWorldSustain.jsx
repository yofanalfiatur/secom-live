import SliderBasic from "@/components/Elements/SliderBasic";

const AbWorldSustain = ({ dataSection }) => {
  return (
    <section className="pt-8 lg:pt-16 pb-17 lg:pb-0 relative overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:bg-navyblue after:w-full after:h-[60%] after:lg:h-10/12 abw-sustai ">
      <div className="container mx-auto flex flex-col items-center relative z-1">
        <h2 className="text-white font-raleway font-normal text-[30px] lg:text-[40px]">
          {dataSection.title}
        </h2>
        <p className="text-white w-full lg:w-[50%] text-center text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] mt-2 lg:mt-3 mb-6 lg:mb-10">
          {dataSection.description}
        </p>

        <div className="flex flex-col w-full abw-sustain__wrap-slider">
          <SliderBasic items={dataSection.cards} target="_blank" />
        </div>
      </div>
    </section>
  );
};

export default AbWorldSustain;
