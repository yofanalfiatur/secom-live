import ContactForm from "@/components/Fragments/Contact/ContactForm";
import Image from "next/image";
import FloatButton from "@/components/Elements/FloatButton";
import { generatePageMetadata } from "@/utils/metadata";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";
import { getPosts } from "@/libs/api";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata("contact-us", locale, "contact_us.image_desktop");
}

export default async function Contact({ params }) {
  const { locale } = await params;

  try {
    // Fetch data secara paralel - tambahkan services
    const [pageData, productsData, servicesData] = await Promise.all([
      getStructuredPageData("contact-us", locale),
      getPosts("products"),
      getPosts("services"), // Tambahkan ini
    ]);

    const { sections } = pageData;
    const ContactPage = getSectionData(sections, "contact_us");

    // Process products data
    const productsDataRaw = productsData.data || [];
    const listProducts = productsDataRaw.map((item) => {
      const translation = item.translations[locale] || item.translations.id;
      return {
        id: item.id,
        title: translation.title,
        type: item.type,
        slug: item.slug,
        field_type: item.field_type,
      };
    });

    // Process services data
    const servicesDataRaw = servicesData.data || [];
    const listServices = servicesDataRaw.map((item) => {
      const translation = item.translations[locale] || item.translations.id;
      return {
        id: item.id,
        title: translation.title,
        slug: item.slug,
        // Tambahkan field lain jika diperlukan
      };
    });

    // Gabungkan products dan services
    const combinedData = [...listProducts, ...listServices];

    return (
      <>
        <section className="flex flex-col items-center justify-center relative overflow-hidden contact-page hide__footer__top">
          <div className="flex flex-col relative lg:absolute top-0 left-0 w-full h-auto lg:h-full lg:max-h-[calc(100vh-94px)] lg:w-[45vw]">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={`${process.env.NEXT_PUBLIC_STORAGE_URL}${ContactPage.image_desktop}`}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${ContactPage.image_mobile}`}
                width={1000}
                height={1200}
                alt="Contact"
                className="w-full lg:h-full lg:max-h-[calc(100vh-94px)] aspect-[32/22] lg:aspect-auto object-cover object-center"
              />
            </picture>
          </div>

          <div className="container mx-auto flex flex-row justify-end h-full lg:max-h-[calc(100vh-94px)] overflow-y-scroll pt-0 pb-5 lg:pt-10 lg:pb-10 custom-scrollbar">
            <div className="w-full lg:w-1/2 flex flex-col h-full">
              <h1 className="font-raleway text-darkblue text-[25px] lg:text-[40px] font-medium mt-6  lg:mt-[2px] lg:mb-2">
                {ContactPage.title}
              </h1>
              <p className="text-darkblue font-open-sans text-sm lg:text-lg">
                {ContactPage.description}
              </p>
              <p className="text-[14px] text-darkblue flex flex-row mt-4 mb-6">
                <span className="text-red-500">* </span>
                {locale === "en" ? "Required" : "Harus Diisi"}
              </p>

              <div className="flex flex-col w-full mb-6 ct__wrap-form">
                {/* Kirim data gabungan ke ContactForm */}
                <ContactForm product={combinedData} />
              </div>
            </div>
          </div>
        </section>
        <FloatButton />
      </>
    );
  } catch (error) {
    console.error("Error loading contact page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading contact page content</p>
      </div>
    );
  }
}
