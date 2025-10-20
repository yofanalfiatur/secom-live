"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const AmOverview = ({ translationKey }) => {
  const t = useTranslations();
  const AlarmOverview = t.raw(translationKey);

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
    <section className="pt-9 pb-14 lg:pt-24 lg:pb-24 am-value">
      <div className="container mx-auto flex flex-col gap-6 lg:gap-9">
        <div
          className="w-full lg:w-10/12 text-xl lg:text-[45px] text-start lg:text-center font-medium self-center font-raleway am-value__desc text-darkblue"
          dangerouslySetInnerHTML={{ __html: AlarmOverview.desc }}
        />
        <ul className="flex flex-col lg:flex-row gap-6 lg:gap-35 justify-center">
          {AlarmOverview.items.map((item, index) => (
            <li
              key={index}
              className="flex flex-row gap-6 items-center w-full lg:w-max"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={55}
                height={52}
                className="w-[44px] lg:w-[55px] lg:h-auto"
              />
              <p className="text-sm lg:text-xl">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AmOverview;
