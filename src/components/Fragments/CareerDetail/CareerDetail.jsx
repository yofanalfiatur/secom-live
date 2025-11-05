"use client";
import AccordionItem from "@/components/Elements/AccordionItem";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

const CareerDetail = ({ careerDetail }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const locale = useLocale();

  const isEmptyContent = (value) => {
    if (!value) return true;
    const trimmed = value.trim();
    return (
      trimmed === "" ||
      trimmed === "<p></p>" ||
      trimmed === "<p><br></p>" ||
      trimmed === "<p>&nbsp;</p>"
    );
  };

  // Tentukan index pertama yang punya isi valid
  useEffect(() => {
    if (!isEmptyContent(careerDetail.requirements)) {
      setActiveIndex(0);
    } else if (!isEmptyContent(careerDetail.responsibilities)) {
      setActiveIndex(1);
    } else if (!isEmptyContent(careerDetail.benefit)) {
      setActiveIndex(2);
    }
  }, [careerDetail]);

  return (
    <>
      {!isEmptyContent(careerDetail.description) && (
        <div
          className="mt-4 lg:mt-3 mb-5 lg:mb-9 text-sm lg:text-base leading-[1.7] lg:leading-[1.5] flex flex-col cr-detail__desc"
          dangerouslySetInnerHTML={{ __html: careerDetail.description }}
        />
      )}

      <div className="flex flex-col gap-4">
        {!isEmptyContent(careerDetail.responsibilities) && (
          <AccordionItem
            index={0}
            isOpen={activeIndex === 0}
            onToggle={toggleAccordion}
            question={
              locale === "en" ? "Responsibilities" : "Tugas dan Tanggung Jawab"
            }
            answer={careerDetail.responsibilities}
          />
        )}

        {!isEmptyContent(careerDetail.requirements) && (
          <AccordionItem
            index={1}
            isOpen={activeIndex === 1}
            onToggle={toggleAccordion}
            question={locale === "en" ? "Requirements" : "Kualifikasi"}
            answer={careerDetail.requirements}
          />
        )}

        {!isEmptyContent(careerDetail.benefit) && (
          <AccordionItem
            index={2}
            isOpen={activeIndex === 2}
            onToggle={toggleAccordion}
            question={locale === "en" ? "Benefit" : "Keuntungan"}
            answer={careerDetail.benefit}
          />
        )}
      </div>
    </>
  );
};

export default CareerDetail;
