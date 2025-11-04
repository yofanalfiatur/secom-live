import FloatButton from "@/components/Elements/FloatButton";
import React from "react";
import { generatePageMetadata } from "@/utils/metadata";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata("privacy-policy", locale, "");
}

export default async function PrivacyPolicy({ params }) {
  const { locale } = await params;

  try {
    // Fetch data secara paralel
    const [pageData] = await Promise.all([
      getStructuredPageData("privacy-policy", locale),
    ]);

    const { sections } = pageData;

    // Process page sections
    const privacyPolicy = getSectionData(sections, "privacy_policy_content");
    return (
      <>
        <section className="pt-8 pb-15 lg:pb-22 flex flex-col privacy-policy">
          <div className=" container flex flex-col mx-auto items-center">
            <div
              className="w-full lg:w-10/12 flex flex-col"
              dangerouslySetInnerHTML={{
                __html: privacyPolicy.content,
              }}
            />
          </div>
        </section>
        <FloatButton />
      </>
    );
  } catch (error) {
    console.error("Error loading privacy policy page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading privacy policy page content</p>
      </div>
    );
  }
}
