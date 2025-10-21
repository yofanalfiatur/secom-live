"use client";
import RadialGrid from "@/components/Elements/RadialGrid";
import React from "react";
import { motion } from "framer-motion";
import FloatButton from "@/components/Elements/FloatButton";
import { useLocale } from "next-intl";
import ForgetPasswordForm from "@/components/Fragments/ForgetPassword/ForgetPasswordForm";
import { Link } from "@/i18n/navigation";

const ForgetPassword = () => {
  const locale = useLocale();
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
              {locale === "en"
                ? "Smart Security Login Helper"
                : "Smart Security Login Helper"}
            </motion.h1>

            <div className="w-full mt-4 login__wrap-form">
              {/* <ForgetPasswordForm /> */}
              <iframe
                src="https://www.alarm.com/getlogininfo_asp_frame.aspx"
                className="w-full h-[600px] border-0 rounded-lg overflow-hidden"
                title="Forget Password Form"
                loading="lazy"
              ></iframe>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
              <Link
                href="/login"
                className="w-max text-white uppercase font-raleway font-medium tracking-[2px] flex flex-row items-center gap-1 hover:gap-4 py-2 relative after:content-[''] after:bg-white after:absolute after:bottom-0 after:w-0 after:h-[2px] after:transition-all after:ease duration-300 hover:after:w-full"
              >
                <span>
                  {locale === "en" ? "Back to Login" : "Kembali ke Login"}
                </span>

                <svg
                  width="22"
                  height="15"
                  viewBox="0 0 22 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-90 scale-80"
                >
                  <path
                    d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                    fill="#ffffff"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      <FloatButton />
    </>
  );
};

export default ForgetPassword;
