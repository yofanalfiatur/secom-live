"use client";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

const OverviewGlobal = (props) => {
  const { dataSection, buttonContact, slugContact, className } = props;
  const locale = useLocale();
  useEffect(() => {
    const boldElements = document.querySelectorAll(
      ".am-value__desc b, .am-value__desc strong"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    boldElements.forEach((el) => observer.observe(el));

    return () => {
      boldElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className={`pt-9 pb-14 lg:pt-24 lg:pb-24 am-value ${className}`}>
      <div className="container mx-auto flex flex-col gap-6 lg:gap-9">
        <div
          className="w-full lg:w-10/12 text-xl lg:text-[45px] text-start lg:text-center font-medium self-center font-raleway am-value__desc text-darkblue"
          dangerouslySetInnerHTML={{ __html: dataSection.desc }}
        />
        {dataSection.items && (
          <ul className="flex flex-col lg:flex-row gap-6 lg:gap-35 justify-center">
            {dataSection.items.map((item, index) => (
              <li
                key={index}
                className="flex flex-row gap-6 items-center w-full lg:w-max"
              >
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                  alt={item.text}
                  width={55}
                  height={52}
                  className="w-[44px] lg:w-[55px] lg:h-auto"
                />
                <p className="text-sm lg:text-xl">{item.text}</p>
              </li>
            ))}
          </ul>
        )}
        {buttonContact !== null &&
          buttonContact !== undefined &&
          buttonContact !== false && (
            <ButtonPrimary
              href={`${slugContact}`}
              className="mx-auto spesific__cta-detail"
            >
              {locale === "en" ? "CONSULT NOW" : "KONSULTASI SEKARANG"}
            </ButtonPrimary>
          )}
      </div>
    </section>
  );
};

export default OverviewGlobal;
