"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import useIsDesktop from "@/components/Hooks/useIsDesktop";

const AmApps = ({ dataSection }) => {
  const isDesktop = useIsDesktop();

  return (
    <section className="pb-10 lg:pb-14">
      <div className="container mx-auto relative flex flex-row justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex lg:flex-col justify-center lg:justify-start absolute left-[50%] lg:left-0 top-[4%] md:top-[3%] lg:top-[50%] transform translate-y-[-50%] translate-x-[-50%] lg:translate-x-[0%] z-[2] w-full lg:w-max"
        >
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image}
            alt="apps"
            width={800}
            height={600}
            quality={100}
            className="w-[330px] lg:w-[480px] 2xl:w-[540px] "
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-[90%] flex flex-col lg:flex-row relative z-[1] bg-navyblue lg:pt-11 pb-8 lg:pb-12 lg:pr-15"
        >
          <div className="w-full h-[160px] lg:w-[35%]"></div>
          <div className="w-full lg:w-[65%] flex flex-col px-6 lg:px-0">
            <div className="flex flex-row gap-4 lg:items-center">
              {isDesktop && (
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.logo}
                  alt="logo"
                  width={180}
                  height={180}
                  className="w-[105px] h-[105px]"
                />
              )}
              <div className="flex flex-col">
                <div className="flex flex-row gap-3 lg:gap-0 mb-2 lg:mb-0 items-center">
                  {!isDesktop && (
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.logo
                      }
                      alt="logo"
                      width={180}
                      height={180}
                      className="w-[61px] h-[61px]"
                    />
                  )}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-white uppercase text-sm lg:text-base lg:mt-2 tracking-[4px] lg:tracking-[3px]"
                  >
                    SECOM SMART SECURITY APP
                  </motion.p>
                </div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-white text-[25px] lg:text-[35px] font-raleway font-medium leading-[1.4] lg:leading-[1.2]"
                  dangerouslySetInnerHTML={{ __html: dataSection.title }}
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white text-sm lg:text-base leading-[1.7] lg:leading-[1.5] mt-2 lg:mt-4 mb-2 lg:mb-4"
              dangerouslySetInnerHTML={{ __html: dataSection.desc }}
            />
            <ul className="grid grid-cols-12 gap-x-3 gap-y-3 lg:gap-x-4 lg:gap-y-5">
              {dataSection.items.map((item, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="col-span-12 gap-3 lg:gap-4 md:col-span-6 flex flex-row items-center "
                  key={index}
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_STORAGE_URL + item.icon}
                    alt={item.title}
                    width={45}
                    height={37}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-xs lg:text-base font-medium">
                      {item.title}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.short_description,
                      }}
                      className="text-white text-xs lg:text-[14px]"
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white text-[10px] lg:text-xs leading-[1.7] lg:leading-[1.5] mt-4 lg:mt-6 mb-2"
              dangerouslySetInnerHTML={{ __html: dataSection.hint }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-row mt-6 gap-3"
            >
              <Link
                href={dataSection.playStoreURL}
                target="_blank"
                className="flex flex-col"
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STORAGE_URL +
                    dataSection.playStoreImage
                  }
                  alt="playstore download button"
                  width={150}
                  height={50}
                />
              </Link>
              <Link
                href={dataSection.appStoreURL}
                target="_blank"
                className="flex flex-col"
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STORAGE_URL +
                    dataSection.appStoreImage
                  }
                  alt="appstore download button"
                  width={150}
                  height={50}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmApps;
