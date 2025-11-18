import FAQsFragment from "@/components/Fragments/FAQs/page";
import { getPosts } from "@/libs/api";

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
        titleSection={
          locale === "en"
            ? "Sustainability Management"
            : "Manajemen Keberlanjutan"
        }
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
