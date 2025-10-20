"use client";

import { useTranslations } from "next-intl";
import RadialGrid from "@/components/Elements/RadialGrid";
import React from "react";
import { motion } from "framer-motion";
import LoginForm from "@/components/Fragments/Login/LoginForm";
import FloatButton from "@/components/Elements/FloatButton";

const LoginPage = () => {
  const t = useTranslations();
  const LoginDummy = t.raw("LoginDummy");

  return (
    <>
      <motion.section
        animate={{ y: "0%", opacity: 1 }}
        initial={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden flex flex-col items-center justify-center hide__footer__top"
      >
        <RadialGrid />
        <div className="container mx-auto flex flex-col items-center justify-center relative z-10 ">
          <div className="w-full pt-16 pb-16 lg:pt-[166px] lg:pb-[180px] lg:w-1/2 overflow-hidden">
            <motion.h1
              animate={{ y: "0%", opacity: 1 }}
              initial={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[25px] lg:text-[40px] mb-6 lg:mb-0 text-white text-center font-medium font-raleway"
            >
              {LoginDummy.title}
            </motion.h1>

            <div className="w-full login__wrap-form">
              <LoginForm />
            </div>
          </div>
        </div>
      </motion.section>
      <FloatButton />
    </>
  );
};

export default LoginPage;
