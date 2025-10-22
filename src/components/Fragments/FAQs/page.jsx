"use client";

import { useState, useMemo } from "react";
import AccordionItem from "@/components/Elements/AccordionItem";
import useIsDesktop from "@/components/Hooks/useIsDesktop";

const FAQsFragment = ({ sections, locale, titleSection }) => {
  const isDesktop = useIsDesktop();

  // Ambil data faqs dari struktur sections (bisa menyesuaikan struktur API)
  const faqs =
    sections?.FaqsList?.faqs ||
    sections?.FaqsList?.fields?.faqs ||
    sections?.faqs ||
    [];

  // Gunakan useMemo agar tidak re-calc di setiap render
  const uniqueCategories = useMemo(
    () => [...new Set(faqs.map((faq) => faq.category))],
    [faqs]
  );

  const [activeTab, setActiveTab] = useState(uniqueCategories[0] || "");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredFaqs = faqs.filter((faq) => faq.category === activeTab);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="flex flex-col faq py-10 lg:py-20">
      <div className="container mx-auto flex flex-col lg:flex-row">
        {/* Column Category */}
        <div className="w-full lg:w-4/12 h-max flex flex-col lg:pr-10 mb-5 lg:mb-0 lg:sticky lg:top-[120px]">
          <h2 className="text-darkblue text-[30px] lg:text-[40px] leading-[1.2] font-normal font-raleway mb-4 lg:mb-6">
            {titleSection}
          </h2>

          {isDesktop ? (
            <div className="flex flex-col border rounded-[5px] border-[#00000033] shadow-[0px_4px_15px_0px_#0000001A] overflow-hidden">
              {uniqueCategories.map((category, index) => (
                <button
                  key={index}
                  className={`faq-tab text-left font-normal px-7 py-5 transition-all duration-300 cursor-pointer bg-white border-b border-[#00000033] last:border-b-0 font-raleway text-lg relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[7px] after:h-full hover:after:bg-tosca after:transition-all after:duration-200 after:ease ${
                    activeTab === category ? "after:bg-tosca" : "after:bg-white"
                  }`}
                  onClick={() => {
                    setActiveTab(category);
                    setActiveIndex(null);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col relative">
              <select
                value={activeTab}
                onChange={(e) => {
                  setActiveTab(e.target.value);
                  setActiveIndex(null);
                }}
                className="text-xs font-raleway font-normal text-navyblue w-full border border-[#00000033] rounded-[5px] py-4 px-4 cursor-pointer appearance-none"
              >
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <svg
                className="transition-all duration-300 rotate-180 absolute top-1/2 right-4 transform translate-y-[-50%] scale-50 pointer-events-none"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                  fill="#00AAAD"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {/* Column Accordion */}
        <div className="w-full lg:w-8/12 flex flex-col gap-4 pt-4 lg:pt-30">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              index={index}
              isOpen={activeIndex === index}
              onToggle={toggleAccordion}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsFragment;
