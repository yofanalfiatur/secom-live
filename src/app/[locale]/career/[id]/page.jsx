import AccordionItem from "@/components/Elements/AccordionItem";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/libs/api";
import CareerDetail from "@/components/Fragments/CareerDetail/CareerDetail";

export async function generateMetadata({ params }) {
  const { id, locale } = await params;

  try {
    const response = await getPostBySlug("vacancies", id);
    if (!response || !response.data) return notFound();

    const vacanciesByLocale = response.data[locale] || response.data.id;
    const careerDetail = vacanciesByLocale?.[0];
    if (!careerDetail) return notFound();

    return {
      title: `${careerDetail.title} - SECOM`,
      description: "",
      keywords: "",
      openGraph: {
        title: `${careerDetail.title} - SECOM`,
        description: "",
        type: "article",
        locale,
      },
      twitter: {
        card: "summary",
        title: `${careerDetail.title} - SECOM`,
        description: "",
      },
    };
  } catch (error) {
    console.error("Error generating career detail metadata:", error);
    return {
      title: "Career Opportunity - SECOM",
      description: "",
      keywords: "",
    };
  }
}

export default async function CareerDetailPage({ params }) {
  const { id, locale } = await params;

  try {
    const response = await getPostBySlug("vacancies", id);
    if (!response || !response.data) return notFound();

    const vacanciesByLocale = response.data[locale] || response.data.id;
    const careerDetail = vacanciesByLocale?.[0];
    if (!careerDetail) return notFound();

    return (
      <section className="flex flex-col pt-8 lg:pt-18 pb-12 lg:pb-19 bg-[#E6F3FF] cr-detail">
        <div className="container mx-auto relative flex flex-col lg:flex-row">
          <div className="w-full lg:w-4/12 flex flex-col h-max relative lg:sticky lg:top-[120px] border-[1px] border-[#00000033] bg-white rounded-[5px] overflow-hidden">
            <h1 className="text-darkblue text-base lg:text-[25px] font-medium leading-[1.3] lg:leading-[1.2] w-full border-b-[1px] border-[#00000033] py-3.5 lg:py-[23px] px-7">
              {careerDetail.title}
            </h1>

            <div className="flex flex-col pt-3.5 lg:pt-6 pb-4 lg:pb-7 px-7 gap-1.5 lg:gap-4">
              {careerDetail.location && (
                <div className="flex flex-row items-center gap-3 wrap-info">
                  <div className="wrap-svg flex flex-col min-w-[24px] min-h-[24px]">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-80 lg:scale-100"
                    >
                      <path
                        d="M10.115 22.311C10.721 22.811 11.353 23.268 12 23.714C12.6484 23.2739 13.2773 22.8058 13.885 22.311C14.898 21.4792 15.8513 20.5773 16.738 19.612C18.782 17.377 21 14.137 21 10.5C21 9.3181 20.7672 8.14778 20.3149 7.05585C19.8626 5.96392 19.1997 4.97177 18.364 4.13604C17.5282 3.30031 16.5361 2.63738 15.4442 2.18508C14.3522 1.73279 13.1819 1.5 12 1.5C10.8181 1.5 9.64778 1.73279 8.55585 2.18508C7.46392 2.63738 6.47177 3.30031 5.63604 4.13604C4.80031 4.97177 4.13738 5.96392 3.68508 7.05585C3.23279 8.14778 3 9.3181 3 10.5C3 14.137 5.218 17.376 7.262 19.612C8.14862 20.5777 9.10196 21.4789 10.115 22.311ZM12 13.75C11.138 13.75 10.3114 13.4076 9.7019 12.7981C9.09241 12.1886 8.75 11.362 8.75 10.5C8.75 9.63805 9.09241 8.8114 9.7019 8.2019C10.3114 7.59241 11.138 7.25 12 7.25C12.862 7.25 13.6886 7.59241 14.2981 8.2019C14.9076 8.8114 15.25 9.63805 15.25 10.5C15.25 11.362 14.9076 12.1886 14.2981 12.7981C13.6886 13.4076 12.862 13.75 12 13.75Z"
                        fill="#00529C"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-[13px] lg:text-lg text-darkblue">
                    {careerDetail.location}
                  </p>
                </div>
              )}

              {careerDetail.type && (
                <div className="flex flex-row items-center gap-3 wrap-info">
                  <div className="wrap-svg flex flex-col min-w-[24px] min-h-[24px]">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-80 lg:scale-100"
                    >
                      <path
                        d="M12 2.5C10.6868 2.5 9.38642 2.75866 8.17317 3.2612C6.95991 3.76375 5.85752 4.50035 4.92893 5.42893C3.05357 7.3043 2 9.84784 2 12.5C2 15.1522 3.05357 17.6957 4.92893 19.5711C5.85752 20.4997 6.95991 21.2362 8.17317 21.7388C9.38642 22.2413 10.6868 22.5 12 22.5C14.6522 22.5 17.1957 21.4464 19.0711 19.5711C20.9464 17.6957 22 15.1522 22 12.5C22 11.1868 21.7413 9.88642 21.2388 8.67317C20.7362 7.45991 19.9997 6.35752 19.0711 5.42893C18.1425 4.50035 17.0401 3.76375 15.8268 3.2612C14.6136 2.75866 13.3132 2.5 12 2.5ZM16.2 16.7L11 13.5V7.5H12.5V12.7L17 15.4L16.2 16.7Z"
                        fill="#00529C"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-[13px] lg:text-lg text-darkblue">
                    {careerDetail.type}
                  </p>
                </div>
              )}

              {careerDetail.experience && (
                <div className="flex flex-row items-center gap-3 wrap-info">
                  <div className="wrap-svg flex flex-col min-w-[24px] min-h-[24px]">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-80 lg:scale-100"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.5869 2.6C10.9409 2.24648 11.4146 2.03846 11.9144 2.01698C12.4142 1.99551 12.9039 2.16214 13.2869 2.484L13.4149 2.601L15.3149 4.5H18.0009C18.5054 4.50009 18.9911 4.69077 19.3609 5.03384C19.7306 5.3769 19.9571 5.84702 19.9949 6.35L20.0009 6.5V9.186L21.9009 11.086C22.2548 11.44 22.4629 11.9139 22.4844 12.4139C22.5059 12.914 22.3391 13.4039 22.0169 13.787L21.8999 13.914L19.9999 15.814V18.5C20.0001 19.0046 19.8095 19.4906 19.4664 19.8605C19.1234 20.2305 18.6531 20.4572 18.1499 20.495L18.0009 20.5H15.3159L13.4159 22.4C13.0619 22.7538 12.5881 22.962 12.088 22.9835C11.588 23.005 11.098 22.8382 10.7149 22.516L10.5879 22.4L8.68795 20.5H6.00095C5.49637 20.5002 5.01038 20.3096 4.6404 19.9665C4.27042 19.6234 4.04379 19.1532 4.00595 18.65L4.00095 18.5V15.814L2.10095 13.914C1.74714 13.56 1.53894 13.0861 1.51747 12.5861C1.49599 12.086 1.6628 11.5961 1.98495 11.213L2.10095 11.086L4.00095 9.186V6.5C4.00104 5.9956 4.19172 5.50986 4.53478 5.14009C4.87785 4.77032 5.34796 4.54383 5.85095 4.506L6.00095 4.5H8.68695L10.5869 2.6ZM15.0799 9.483L10.8359 13.727L9.06795 11.959C8.88031 11.7715 8.62586 11.6662 8.36059 11.6663C8.09532 11.6664 7.84096 11.7719 7.65345 11.9595C7.46594 12.1471 7.36065 12.4016 7.36074 12.6669C7.36084 12.9321 7.46631 13.1865 7.65395 13.374L10.0579 15.778C10.1601 15.8802 10.2814 15.9613 10.4149 16.0166C10.5484 16.0719 10.6914 16.1004 10.8359 16.1004C10.9804 16.1004 11.1235 16.0719 11.257 16.0166C11.3905 15.9613 11.5118 15.8802 11.6139 15.778L16.4939 10.897C16.6761 10.7084 16.7769 10.4558 16.7746 10.1936C16.7723 9.9314 16.6672 9.68059 16.4818 9.49518C16.2964 9.30977 16.0455 9.20461 15.7833 9.20233C15.5212 9.20005 15.2685 9.30084 15.0799 9.483Z"
                        fill="#00529C"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-[13px] lg:text-lg text-darkblue">
                    {careerDetail.experience}
                    {locale === "en" ? " Experience" : " Pengalaman"}
                  </p>
                </div>
              )}
            </div>

            <Link
              href={careerDetail.url}
              target="_blank"
              className="font-raleway text-[13px] lg:text-xl text-white bg-tosca transition-all duration-300 hover:bg-navyblue w-full py-3 lg:py-4 px-2 text-center tracking-[2px]"
            >
              {locale === "en" ? "APPLY NOW" : "LAMAR SEKARANG"}
            </Link>
          </div>

          <div className="w-ful lg:w-8/12 flex flex-col lg:pl-16">
            <CareerDetail careerDetail={careerDetail} />

            <ButtonPrimary
              href={careerDetail.url}
              target="_blank"
              className="mt-8"
            >
              {locale === "en" ? "APPLY NOW" : "LAMAR SEKARANG"}
            </ButtonPrimary>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading career detail:", error);
    notFound();
  }
}
