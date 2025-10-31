import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import FloatButton from "@/components/Elements/FloatButton";
import ThankYouLogo from "@/components/Elements/ThankYouLogo";
import { getPosts } from "@/libs/api";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  try {
    const response = await getPosts("settings");
    const dataTitle = response.data.thankyou.title[locale];
    const dataDesc = response.data.thankyou.description[locale];

    // Clean HTML tags dari description untuk meta description
    const cleanDesc = dataDesc.replace(/<[^>]*>/g, "");
    const metaDescription =
      cleanDesc.substring(0, 160) + (cleanDesc.length > 160 ? "..." : "");

    return {
      title: dataTitle.replace(/<[^>]*>/g, "") + " - SECOM", // Hapus tag <br> dll
      description: metaDescription,
      keywords: "",
      openGraph: {
        title: dataTitle.replace(/<[^>]*>/g, "") + " - SECOM",
        description: metaDescription,
        type: "website",
        locale,
      },
      twitter: {
        card: "summary",
        title: dataTitle.replace(/<[^>]*>/g, "") + " - SECOM",
        description: metaDescription,
      },
    };
  } catch (error) {
    console.error("Error generating thank you page metadata:", error);
    return {
      title: "Thank You - SECOM",
      description: "",
      keywords: "",
    };
  }
}

export default async function ThankYou(props) {
  const params = await props.params;
  const locale = params?.locale || "en";

  try {
    const response = await getPosts("settings");

    const dataTitle = response.data.thankyou.title[locale];
    const dataDesc = response.data.thankyou.description[locale];
    const dataButtonCTA = response.data.thankyou.button_text[locale];

    // split based on <br>
    const titleParts = dataTitle.split("<br>");
    const titleBeforeBr = titleParts[0] || "";
    const titleAfterBr = titleParts[1] || "";

    return (
      <>
        <section className="ty-page hide__footer__top">
          <div className="container mx-auto flex flex-row">
            <div className="w-full lg:w-2/3 border-r-0 lg:border-r-[1px] pt-13 pb-13 lg:pt-20 lg:pb-26 lg:border-[#13223322]">
              <h1 className="text-[33px] lg:text-[65px] font-open-sans font-semibold relative max-w-full leading-[1.1]">
                <span className="relative">
                  {titleBeforeBr}
                  <ThankYouLogo />
                </span>
                {titleAfterBr && (
                  <>
                    <br />
                    <span>{titleAfterBr}</span>
                  </>
                )}
              </h1>
            </div>
            <div className=" hidden lg:flex lg:w-1/3"></div>
          </div>
          <div className="bg-[#13223322] w-screen h-[1px]"></div>
          <div className="container mx-auto flex flex-row">
            <div className="hidden lg:flex lg:w-2/3 border-r-[1px] border-[#13223322]"></div>
            <div className="w-full lg:w-1/3 flex flex-col pt-11 pb-15 lg:pt-10 lg:pb-36 lg:pl-8">
              <p className="text-sm lg:text-lg text-darkblue w-full lg:w-[83%]">
                {dataDesc}
              </p>
              <ButtonPrimary href={"/"} target="_self" className="mt-6 lg:mt-5">
                {dataButtonCTA}
              </ButtonPrimary>
            </div>
          </div>
        </section>
        <FloatButton />
      </>
    );
  } catch (error) {
    console.error("Error loading thank you page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading thank you page content</p>
      </div>
    );
  }
}
