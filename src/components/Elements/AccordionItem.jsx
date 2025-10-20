"use client";
import React from "react";

const AccordionItem = ({ index, isOpen, onToggle, question, answer }) => {
  return (
    <div className="flex flex-col relative shadow-[0px_4px_15px_0px_#0000001A] overflow-hidden">
      <div className="relative z-[1] m-1 bg-white">
        {/* Question */}
        <button
          onClick={() => onToggle(index)}
          className={`w-full px-4 lg:px-8 py-3 lg:py-4 flex justify-between items-center cursor-pointer border-[#13223333] gap-4 ${
            isOpen ? "border-b-[1px]" : "border-0"
          }`}
        >
          <div
            className="font-raleway font-normal lg:text-xl text-left text-darkblue"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <svg
            className={`transform transition-transform duration-300 min-w-[22px] ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            width="22"
            height="15"
            viewBox="0 0 22 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
              fill="#00AAAD"
            />
          </svg>
        </button>

        {/* Answer */}
        <div
          className={`faq-answer flex flex-col transition-all duration-500 ease-in-out overflow-hidden px-4 lg:px-8 text-sm lg:text-lg text-darkblue ${
            isOpen
              ? "max-h-[4000px] py-5 lg:pt-5 lg:pb-8 opacity-100"
              : "max-h-0 opacity-0"
          }`}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>

      {/* Background border/gradient */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-0 transition-all duration-[1ms] cubic-bezier(0.4, 0, 0.2, 1) opacity-100 ${
          isOpen
            ? "animated-gradient-bg2 border-transparent"
            : "bg-white border-[1px] border-[#13223333]"
        }`}
      />
    </div>
  );
};

export default AccordionItem;
