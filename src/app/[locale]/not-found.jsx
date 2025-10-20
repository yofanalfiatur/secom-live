"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { motion } from "framer-motion";

const NotFound = () => {
  const t = useTranslations();
  const ErrorPage = t.raw("ErrorPage");
  return (
    <>
      <section className="relative w-full pt-10 pb-24 lg:py-36 h-full lg:min-h-[700px] mt-10 mb-8 flex flex-col hide__footer__top">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-col flex w-screen h-full absolute top-0 left-0 transform-x-[50%]"
        >
          <Image
            src="/img/404.svg"
            alt="Error Page"
            width={1000}
            height={1000}
            className="w-screen h-full absolute top-[-17%] sm:top-0 left-0 transform-x-[50%]"
          />
        </motion.div>

        <div className="container relative mx-auto flex flex-col gap-4 lg:gap-6 justify-center items-center">
          <motion.h1
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[25px] lg:text-6xl font-semibold font-open-sans text-center max-w-full lg:max-w-[810px] leading-[1.3] lg:leading-[1.2] mt-10"
          >
            {ErrorPage.title}
          </motion.h1>
          <motion.p
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-center leading-[1.7] lg:leading-[1.5] text-sm lg:text-lg lg:max-w-[560px] mb-1"
          >
            {ErrorPage.description}
          </motion.p>
          <ButtonPrimary
            href={ErrorPage.buttonCTA.href}
            className="hover:text-sky-400"
            target={ErrorPage.buttonCTA.target}
          >
            {ErrorPage.buttonCTA.text}
          </ButtonPrimary>
        </div>
      </section>
    </>
  );
};
export default NotFound;
