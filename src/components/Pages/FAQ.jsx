import FAQsFragment from "@/components/Fragments/FAQs/page";
import { getPosts } from "@/libs/api";

export default async function FAQPage({ params }) {
  const { locale } = await params;

  try {
    const response = await getPosts("faqs?type=faq");

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
          locale === "en" ? "Frequently Asked Questions" : "Pertanyaan Umum"
        }
        sections={sections}
        locale={locale}
      />
    );
  } catch (error) {
    console.error("Error loading FAQ page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading FAQ page content</p>
      </div>
    );
  }
}
