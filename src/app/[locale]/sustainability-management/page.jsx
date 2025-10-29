import FAQsFragment from "@/components/Fragments/FAQs/page";
import { getPosts } from "@/libs/api";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title =
    locale === "en"
      ? "Sustainability Management - SECOM"
      : "Sustainability Management - SECOM";

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

export default async function SustainabilityPage({ params }) {
  const { locale } = await params;

  try {
    const response = await getPosts("faqs?type=sustainability-management");

    const faqsByLocale =
      response?.data?.faqs?.[locale] || response?.data?.faqs?.id || [];

    const sections = {
      FaqsList: {
        faqs: faqsByLocale,
      },
    };

    return (
      <FAQsFragment
        titleSection="Sustainability Management"
        sections={sections}
        locale={locale}
      />
    );
  } catch (error) {
    console.error("Error loading sustainability page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading sustainability page content</p>
      </div>
    );
  }
}
