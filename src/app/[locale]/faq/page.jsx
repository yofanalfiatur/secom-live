import FAQsFragment from "@/components/Fragments/FAQs/page";
import { getPosts } from "@/libs/api";
import React from "react";

export default async function FAQPage(props) {
  const params = await props.params;
  const locale = params?.locale || "en";

  const response = await getPosts("faqs?type=faq");

  // console.log(response);

  const faqsByLocale =
    response?.data?.faqs?.[locale] || response?.data?.faqs?.id || [];

  const sections = {
    FaqsList: {
      faqs: faqsByLocale,
    },
  };

  return (
    <FAQsFragment
      titleSection={
        locale === "en"
          ? "Frequently Asked Questions"
          : "Pertanyaan yang sering ditanyakan"
      }
      sections={sections}
      locale={locale}
    />
  );
}
