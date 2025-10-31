import FAQsFragment from "@/components/Fragments/FAQs/page";
import { getPosts } from "@/libs/api";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title =
    locale === "en"
      ? "Frequently Asked Questions - SECOM"
      : "Pertanyaan yang Sering Ditanyakan - SECOM";

  return {
    title: title,
    description: "",
    keywords: "",
    openGraph: {
      title: title,
      description: "",
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title: title,
      description: "",
    },
  };
}

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
