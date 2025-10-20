import Image from "next/image";
import { Link } from "@/i18n/navigation";

const FooterMiddle = ({ locale, FooterContent, FooterMenu, FooterSocMed }) => {
  return (
    <section className="relative z-10 w-full flex flex-col border-y-1 border-[#ffffff66] footer__info">
      <div className="lg:container w-full mx-auto flex flex-col lg:flex-row !p-0">
        <div className="w-full lg:w-1/4 flex flex-col justify-center border-b-1 border-[#ffffff66] lg:border-none">
          <div className="lg:max-w-max pt-8 pb-8 lg:pt-0 lg:pb-0 flex items-center lg:items-start flex-col gap-9">
            <Image
              src="/img/secom-logo.png"
              alt="logo"
              width={248}
              height={62}
              className="max-w-[205px] lg:max-w-full object-contain"
            />
          </div>
        </div>
        <div className="w-full lg:w-3/4 lg:border-l-1 border-[#ffffff66] flex flex-col">
          <div className="f-wrap-address lg:pl-26 pt-6 pb-7 lg:py-6 flex flex-col gap-y-2 px-[1rem] lg:px-0">
            <p className="f-address__text text-white text-[12px] lg:text-[14px]">
              {locale === "en" ? "ADDRESS" : "ALAMAT"}
            </p>
            <Link
              className="text-white leading-[1.7] lg:leading-[1.2] font-semibold text-[15px] lg:text-xl w-full lg:w-2/3 hover:opacity-70 transition-all duration-200 ease-in-out"
              href={FooterContent.FtAddressLink}
              target="_blank"
            >
              <p
                className="text-white leading-[1.7] lg:leading-[1.3] font-semibold text-[15px] lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: FooterContent.FtAddressText,
                }}
              />
            </Link>
          </div>

          <div className="f-info relative lg:pl-26 flex flex-row w-full border-t-[1px] border-[#ffffff66] lg:border-none">
            <div className="mt-6 lg:mt-8 mb-11 lg:mb-20 flex flex-col lg:flex-row w-full px-[1rem] lg:px-0 gap-y-6 lg:gap-0">
              <div className="f-sitemap w-full lg:w-2/3">
                <p className="f-hint text-white text-[12px] lg:text-[14px] font-semibold mb-3 lg:mb-3">
                  {locale === "en" ? "SITEMAP" : "MENU"}
                </p>
                <ul className="f-sitemap__list flex flex-col flex-wrap max-h-[105px] lg:max-h-[80px] max-w-max gap-[15px] lg:gap-3">
                  {FooterMenu.map(({ FtMenuText, FtMenuLink }, index) => (
                    <li key={index}>
                      <Link
                        href={FtMenuLink}
                        className="text-[14px] lg:text-base text-white max-w-max transition-all ease duration-200 hover:opacity-60"
                      >
                        {FtMenuText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="f-socmed w-full lg:w-1/3">
                <p className="f-hint text-white text-[12px] lg:text-[14px] font-semibold mb-3 lg:mb-3">
                  {locale === "en" ? "STAY CONNECTED" : "TETAP TERHUBUNG"}
                </p>
                <div className="f-socmed__list flex flex-row gap-6 lg:gap-8">
                  {Object.entries(FooterSocMed).map(([key, link]) => (
                    <Link
                      key={key}
                      href={link}
                      target="_blank"
                      className="flex items-center justify-center text-white opacity-40 hover:opacity-100 transition-all"
                    >
                      {key === "FtFacebook" && (
                        <i className="fa-brands fa-facebook-f" />
                      )}
                      {key === "FtLinkedin" && (
                        <i className="fa-brands fa-linkedin-in" />
                      )}
                      {key === "FtInstagram" && (
                        <i className="fa-brands fa-instagram" />
                      )}
                      {key === "FtYoutube" && (
                        <i className="fa-brands fa-youtube" />
                      )}
                      {key === "FtTiktok" && (
                        <i className="fa-brands fa-tiktok" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterMiddle;
