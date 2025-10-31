"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const BannerBasic = ({ dataSection }) => {
  const renderTitle = () => {
    const parts = dataSection.title.split(/(<b>.*?<\/b>|<br\s*\/?>)/g);

    return parts.map((part, idx) => {
      if (part.startsWith("<b>")) {
        const text = part.replace(/<\/?b>/g, "");
        return (
          <motion.span
            key={idx}
            initial={{ backgroundSize: "0% 4px" }}
            animate={{ backgroundSize: "100% 4px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="highlighted"
          >
            {text}
          </motion.span>
        );
      } else if (part.match(/<br\s*\/?>/i)) {
        return <br key={idx} />;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <section
      className={`flex-col flex justify-end lg:justify-center py-6 h-[480px] sm:h-[408px] bg-no-repeat bg-center lg:bg-right bg-cover lg:bg-inherit overflow-hidden relative after:content-[''] after:absolute after:top-0 after:left-0 after:z-[1] after:w-full after:lg:w-[50%] after:h-full after:bg-[linear-gradient(0deg,_#00529C_25%,_rgba(0,82,156,0)_40%)] after:lg:bg-[linear-gradient(270deg,rgba(0,82,156,0)_0%,#00529C_100%)] am-banner`}
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.background_image_desktop}`}
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.background_image_mobile}`}
          alt="Banner background"
          width={2000}
          height={1200}
          quality={100}
          className="object-cover absolute top-0 right-0 w-full h-full"
        />
      </picture>

      <div className="container mx-auto relative z-[2] flex flex-col">
        <h1 className="am-banner__title text-white font-raleway text-3xl lg:text-[50px] font-medium w-full leading-[1.5] lg:leading-[1.3] lg:w-[60%] mb-4 lg:mb-6">
          {renderTitle()}
        </h1>
      </div>
    </section>
  );
};

export default BannerBasic;
