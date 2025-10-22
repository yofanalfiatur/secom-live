"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const ResSurvey = ({ dataSection, dataDiscover }) => {
  const locale = useLocale();

  // --- MAP DATA from API ---
  const survey =
    dataSection?.cards?.map((card) => ({
      question: card.question,
      options: [
        { text: card.answer_a, value: "a" },
        { text: card.answer_b, value: "b" },
      ],
    })) || [];

  const result =
    dataSection?.result?.map((r) => ({
      icon: r.icon ? `${process.env.NEXT_PUBLIC_STORAGE_URL + r.icon}` : "",
      title: r.title,
      subtitle: r.title,
      desc: r.description,
      btn: {
        text: locale === "en" ? "Discover Now" : "Temukan Solusinya",
        href: dataDiscover,
        target: "_self",
      },
    })) || [];

  // --- RESULT COMBINATION (HARDCODE) ---
  const resultCombinations = {
    high: ["a-a-a", "a-b-a", "b-a-a"],
    moderate: ["a-a-b", "a-b-b", "b-a-b", "b-b-a", "b-b-b"],
  };

  // --- STATES ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- HANDLER ---
  const handleAnswer = (value) => {
    setIsTransitioning(true);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);

      if (currentQuestion < survey.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const getResult = () => {
    const answerKey = answers.join("-");
    for (const [riskLevel, combinations] of Object.entries(
      resultCombinations
    )) {
      if (combinations.includes(answerKey)) {
        switch (riskLevel) {
          case "high":
            return result[0];
          case "moderate":
          default:
            return result[1];
        }
      }
    }
    return result[1];
  };

  const resetSurvey = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResult(false);
      setIsTransitioning(false);
    }, 300);
  };

  // --- RENDER ---
  return (
    <section className="relative res-survey mt-[-50px] lg:mt-[-3rem] z-10">
      <div className="container mx-auto flex flex-col relative">
        <div className="flex flex-col relative w-full">
          <div className="flex bg-white pt-[1.9rem] lg:pt-[2.3rem] flex-col items-center justify-center relative z-[1] m-[3px] md:m-[5px] res-survey__wrap">
            {/* Title & Description */}
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="res-survey__wrap-decor absolute top-0 left-[50%] transform -translate-1/2 w-[63px] h-[63px] rounded-[50%] flex flex-col items-center justify-center bg-tosca scale-70 lg:scale-100"
            >
              <svg
                width="26"
                height="33"
                viewBox="0 0 26 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4937 22.8926H8.14404V22.0576C8.14404 20.6367 8.30518 19.4868 8.62744 18.6079C8.94971 17.7144 9.42578 16.9014 10.0557 16.1689C10.7002 15.4365 12.1357 14.1475 14.3623 12.3018C15.5488 11.335 16.1421 10.4487 16.1421 9.64307C16.1421 8.8374 15.9004 8.21484 15.417 7.77539C14.9482 7.32129 14.2305 7.09424 13.2637 7.09424C12.2236 7.09424 11.3594 7.43848 10.6709 8.12695C9.99707 8.81543 9.56494 10.0166 9.37451 11.7305L0.849121 10.6758C1.14209 7.54102 2.27734 5.02148 4.25488 3.11719C6.24707 1.19824 9.29395 0.23877 13.3955 0.23877C16.5889 0.23877 19.167 0.905273 21.1299 2.23828C23.7959 4.04004 25.1289 6.44238 25.1289 9.44531C25.1289 10.6904 24.7847 11.8916 24.0962 13.0488C23.4077 14.2061 22.0015 15.6196 19.8774 17.2896C18.3979 18.4614 17.4604 19.4062 17.0649 20.124C16.6841 20.8271 16.4937 21.75 16.4937 22.8926ZM7.8584 25.1118H16.8013V33H7.8584V25.1118Z"
                  fill="white"
                />
              </svg>
            </motion.div>

            <div className="flex flex-col w-full border-b-1 border-[#00529C33] pb-5 px-6">
              <motion.p
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-navyblue text-center font-bold text-[13px] md:text-lg lg:text-[25px] font-raleway"
              >
                {dataSection.title_section}
              </motion.p>
              <motion.p
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-[13px] md:text-lg lg:text-[25px] text-center font-normal text-navyblue font-raleway mt-1 lg:mt-0"
              >
                {showResult
                  ? dataSection.description_result_section
                  : dataSection.description_section}
              </motion.p>
            </div>

            {/* Survey */}
            <div className="flex flex-col items-center justify-center lg:min-h-[440px] w-full px-4 pt-8 pb-10 lg:pt-6 lg:pb-9">
              {!showResult ? (
                <div
                  className={`flex flex-col items-center w-full survey-question transition-all duration-300 ease-in-out ${
                    isTransitioning
                      ? "opacity-0 transform translate-y-4"
                      : "opacity-100 transform translate-y-0"
                  }`}
                >
                  <p className="text-navyblue text-[25px] md:text-3xl lg:text-6xl text-center w-[95%] lg:w-[70%] mb-5 lg:mb-10 leading-[1.15]">
                    {survey[currentQuestion]?.question}
                  </p>

                  <div className="flex flex-col items-center md:items-start res-survey__wrap-btn gap-3 lg:gap-4 max-w-max">
                    {survey[currentQuestion]?.options.map((answer, index) => (
                      <button
                        key={index}
                        className="py-3 lg:py-4 pl-6 pr-[22px] bg-tosca text-sm lg:text-base tracking-[4px] text-white rounded-[5px] hover:bg-tosca-dark transition-colors duration-300 text-center uppercase cursor-pointer flex flex-col items-center justify-center w-full hover:bg-navyblue"
                        onClick={() => handleAnswer(answer.value)}
                        disabled={isTransitioning}
                      >
                        {answer.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-col items-center w-full survey-results transition-all duration-300 ease-in-out ${
                    isTransitioning
                      ? "opacity-0 transform translate-y-4"
                      : "opacity-100 transform translate-y-0"
                  }`}
                >
                  <Image
                    src={getResult().icon}
                    alt="Survey Result"
                    width={120}
                    height={120}
                    className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]"
                  />
                  <p className="text-navyblue font-normal text-[25px] lg:text-6xl text-center mb-2 lg:mb-4">
                    {getResult().title}
                  </p>
                  <p
                    className="text-navyblue leading-[1.7] lg:leading-[1.5] text-sm lg:text-xl text-center w-[90%] md:w-[70%] mb-4 lg:mb-6"
                    dangerouslySetInnerHTML={{ __html: getResult().desc }}
                  />

                  <div className="flex flex-row res-survey__wrap-btn gap-4 mb-5">
                    <Link
                      target={getResult().btn.target}
                      href={getResult().btn.href}
                      className="flex flex-col items-center w-full max-w-full sm:max-w-max sm:max-h-max font-raleway bg-tosca text-white text-sm lg:text-base px-4 py-4 lg:px-5 lg:py-5 rounded-[5px] tracking-[4px] leading-none uppercase transition-all ease duration-200 hover:bg-navyblue !text-center"
                    >
                      {getResult().btn.text}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-100"></div>
        </div>
      </div>
    </section>
  );
};

export default ResSurvey;
