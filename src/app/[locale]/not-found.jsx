import Image from "next/image";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { motion } from "framer-motion";
import { getPosts } from "@/libs/api";

export default async function NotFound(props) {
  const params = await props.params;
  const locale = params?.locale || "en";

  const response = await getPosts("settings");

  const errorTitle = response.data.error.title[locale];
  const errorDesc = response.data.error.description[locale];
  const errorBtnText = response.data.error.button_text[locale];

  return (
    <>
      <section className="relative w-full pt-10 pb-24 lg:py-36 h-full lg:min-h-[700px] mt-10 mb-8 flex flex-col hide__footer__top">
        <div className="flex-col flex w-screen h-full absolute top-0 left-0 transform-x-[50%]">
          <Image
            src="/img/404.svg"
            alt="Error Page"
            width={1000}
            height={1000}
            className="w-screen h-full absolute top-[-17%] sm:top-0 left-0 transform-x-[50%]"
          />
        </div>

        <div className="container relative mx-auto flex flex-col gap-4 lg:gap-6 justify-center items-center">
          <h1
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[25px] lg:text-6xl font-semibold font-open-sans text-center max-w-full lg:max-w-[810px] leading-[1.3] lg:leading-[1.2] mt-10"
          >
            {errorTitle}
          </h1>
          <p
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-center leading-[1.7] lg:leading-[1.5] text-sm lg:text-lg lg:max-w-[560px] mb-1"
          >
            {errorDesc}
          </p>
          <ButtonPrimary href="/" className="" target="_self">
            {errorBtnText}
          </ButtonPrimary>
        </div>
      </section>
    </>
  );
}
