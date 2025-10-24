"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useLocale } from "next-intl";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import CardProductV2 from "@/components/Elements/CardProductV2";
import {useEffect, useState} from "react";
import {apiFetch} from "@/libs/api";

const SolProduct = (props) => {
  const { dataSection } = props;
  const isDesktop = useIsDesktop();
  const locale = useLocale();

  const [Sectors, setSectors] = useState([]);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sectorsData = await apiFetch("/sectors");
        const productsData = await apiFetch("/products");

        setSectors(sectorsData?.data || []);
        // Filter & map products in one go
        const mappedProducts = productsData?.data
            ?.filter((item) => item.type === "business")
            ?.map((item) => ({
              title: item.translations?.[locale]?.title,
              slug: item.slug,
              type: item.type,
              description: item.translations?.[locale]?.description,
              image: item.image,
            })) || [];

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [locale]);

  const handleSectorChange = async (e) => {
    const slug = e.target.value;

    if (!slug) {
      // Reset to all products when user selects "All Industries"
      const productsData = await apiFetch("/products");
      const mappedProducts = productsData?.data
          ?.filter((item) => item.type === "business")
          ?.map((item) => ({
            title: item.translations?.[locale]?.title,
            slug: item.slug,
            type: item.type,
            description: item.translations?.[locale]?.description,
            image: item.image,
          })) || [];

      console.log(mappedProducts);
      setProducts(mappedProducts|| []);
      return;
    }

    try {
      const response = await apiFetch(`/sectors/${slug}`);
      const rawData = response?.data.translations?.[locale]?.products;
      console.log(rawData);
      setProducts(rawData || []);
    } catch (error) {
      console.error(`Error loading products for sector: ${slug}`, error);
    }
  };

  return (
    <section
      className="bg-navyblue flex flex-col pt-6 lg:pt-21 pb-20 lg:pb-25 sol-product"
      id="sol-product-lp"
    >
      <div className="container mx-auto flex flex-col">
        <div className="flex flex-col lg:flex-row sol-product__intro">
          <div className="w-full lg:w-8/12 lg:pr-20">
            <h2 className="text-white text-[30px] lg:text-[40px] font-raleway font-normal ">
              {dataSection.title_section}
            </h2>
            <p className="text-white text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] mt-2 mb-5 lg:mb-14">
              {dataSection.description_section}
            </p>
          </div>
          <div className="w-full lg:w-4/12 lg:pl-3 ">
            <p className="text-white lg:mt-6 mb-3 text-sm lg:text-lg">
              {locale === "en" ? "FILTER BY" : "FILTER BERDASARKAN"}
            </p>
            <div className="flex flex-col relative mb-5 lg:mb-0">
              <select
                name="dropdown-filter-sector"
                id="dropdown-filter-sector"
                onChange={handleSectorChange}
                className="border-[1px] rounded-[5px] border-white text-sm lg:text-lg text-white py-3 lg:py-4 px-4 w-full appearance-none cursor-pointer sol-filter-product"
              >
                <option value="">
                  {locale === "en" ? "All Industries" : "Semua Industri"}
                </option>

                {Sectors?.map((sector) => (
                    <option key={sector.slug} value={sector.slug}>
                      {sector.translations?.[locale]?.title ?? sector.translations?.en?.title}
                    </option>
                ))}
              </select>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <path
                  d="M0.465612 7.725L11.5048 19L22.544 7.725C22.8439 7.41769 23.0078 7.00538 22.9997 6.57876C22.9916 6.15214 22.8122 5.74616 22.5009 5.45014C22.1895 5.15412 21.7718 4.9923 21.3396 5.00028C20.9074 5.00827 20.4961 5.1854 20.1962 5.49271L11.5048 14.3746L2.80377 5.4927C2.50388 5.18539 2.09259 5.00826 1.66039 5.00028C1.22819 4.9923 0.810481 5.15412 0.499151 5.45014C0.187821 5.74616 0.0083746 6.15214 0.000287681 6.57875C-0.00779924 7.00537 0.156137 7.41769 0.45603 7.725L0.465612 7.725Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Desktop */}
        {isDesktop ? (
          <div className="w-full flex flex-col am-products__grid">
            <ul className="flex flex-row flex-wrap justify-center gap-4">
              {Products?.map((item) => (
                  <CardProductV2
                      key={item.slug}
                      item={item}
                      variant="desktop"
                  />
              ))}
            </ul>
          </div>
        ) : (
          <>
            {/* Mobile Card Slider */}
            <Splide
              options={{
                type: "loop",
                perPage: 1,
                autoplay: false,
                pauseOnHover: true,
                gap: "20px",
                arrows: true,
                pagination: false,
              }}
              hasTrack={false}
              className="[&_.splide__track]:!overflow-visible w-full"
            >
              <SplideTrack>
                {Products?.filter((item) => item.type === "business")
                    .map((item) => {

                      const mappedItem = {
                        title: item.translations[locale]?.title,
                        slug: item.slug,
                        description: item.translations[locale]?.description,
                        image: item.image,
                      };

                      return (
                          <SplideSlide key={mappedItem.slug}>
                            <CardProductV2 item={mappedItem} variant="mobile" />
                          </SplideSlide>
                      );
                    })}
              </SplideTrack>
              {/* Custom Arrow Buttons */}
              <div className="splide__arrows absolute bottom-[-35px] w-full z-10">
                <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[37%]">
                  <svg
                    width="22"
                    height="15"
                    viewBox="0 0 22 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="scale-75 rotate-[270deg]"
                  >
                    <path
                      d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                      fill="#00AAAD"
                    />
                  </svg>
                </button>
                <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[37%]">
                  <svg
                    width="22"
                    height="15"
                    viewBox="0 0 22 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="scale-75 rotate-[90deg]"
                  >
                    <path
                      d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                      fill="#00AAAD"
                    />
                  </svg>
                </button>
              </div>
            </Splide>
          </>
        )}
      </div>
    </section>
  );
};

export default SolProduct;
