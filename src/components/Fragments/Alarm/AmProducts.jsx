"use client";

import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTranslations } from "next-intl";
import CardProduct from "@/components/Elements/CardProduct";

const AmProducts = (props) => {
  const { translationKey, listProducts, typeProduct } = props;
  const isDesktop = useIsDesktop();
  const t = useTranslations();
  const ProductDetails = t.raw(listProducts);
  const AlarmProduct = t.raw(translationKey);
  const TypeProduct = typeProduct;

  return (
    <section
      className="pt-10 pb-12 lg:pt-20 lg:pb-26 bg-navyblue am-prod"
      id="am-prod"
    >
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-[25px] lg:text-4xl font-raleway font-medium text-white text-center">
          {AlarmProduct.title}
        </h2>
        <p className="text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] text-white text-center w-[90%] lg:w-[60%] mt-2 lg:mt-5 mb-6 lg:mb-13">
          {AlarmProduct.desc}
        </p>

        {/* Card Desktop */}
        {isDesktop ? (
          <div className="flex flex-col am-products__grid">
            <ul className="flex flex-row flex-wrap justify-center gap-4">
              {ProductDetails.filter((item) =>
                item.type.includes(TypeProduct)
              ).map((item, index) => (
                <CardProduct
                  key={index}
                  item={item}
                  TypeProduct={TypeProduct}
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
                arrows: false,
                pagination: true,
              }}
              hasTrack={false}
              className="[&_.splide__track]:!overflow-visible w-full"
            >
              <SplideTrack>
                {ProductDetails.filter((item) =>
                  item.type.includes(TypeProduct)
                ).map((item, index) => (
                  <SplideSlide key={index}>
                    <CardProduct
                      item={item}
                      TypeProduct={TypeProduct}
                      variant="mobile"
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </>
        )}
      </div>
    </section>
  );
};

export default AmProducts;
