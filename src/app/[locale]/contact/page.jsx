import ContactForm from "@/components/Fragments/Contact/ContactForm";
import Image from "next/image";
import FloatButton from "@/components/Elements/FloatButton";
import { getPageData, getPosts } from "@/libs/api";

export default async function Contact(props) {
  const params = await props.params;
  const locale = params.locale;

  // Ambil data halaman dari API
  const response = await getPageData("contact-us");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  const ContactPage = sections.contact_us || {};

  // Ambil data dari posts sectors
  const responseProduct = await getPosts("products");
  const productsDataRaw = responseProduct.data || [];

  // Map ke struktur yang sesuai untuk komponen
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
              <ContactForm product={listProducts} />
            </div>
          </div>
        </div>
      </section>
      <FloatButton />
    </>
  );
}
