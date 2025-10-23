"use client";
import Image from "next/image";
import "glightbox/dist/css/glightbox.min.css";
import { Link } from "@/i18n/navigation";
import { useEffect } from "react";

const AboutStory = ({ dataSection }) => {
  useEffect(() => {
    import("glightbox").then(({ default: GLightbox }) => {
      const lightbox = GLightbox({
        selector: ".glightbox",
        loop: false,
        zoomable: true,
        draggable: true,
        touchNavigation: false,
        openEffect: "zoom",
        closeEffect: "zoom",
        onOpen: () => {
          console.log("Lightbox opened");
        },
        onClose: () => {
          console.log("Lightbox closed");
        },
      });

      return () => {
        lightbox.destroy();
      };
    });
  }, []);

  return (
    <>
      <section className="relative mt-[-150px] lg:mt-[-140px] ab-story">
        <div className="container mx-auto flex flex-col lg:flex-row lg:bg-navyblue relative">
          <div className="w-full lg:w-6/12 flex flex-col justify-center  px-6 lg:px-12 pt-6 lg:pt-10 pb-10 lg:pb-10 bg-navyblue lg:bg-[unset] relative z-0">
            <h2 className="text-white text-[30px] lg:text-[40px] font-raleway font-normal">
              {dataSection.title}
            </h2>
            <p
              className="text-white text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] mt-3 lg:mb-7 lg:w-[90%]"
              dangerouslySetInnerHTML={{ __html: dataSection.description }}
            />
          </div>
          <Link
            href={dataSection.url_video === null ? "#" : dataSection.url_video}
            className={`${
              dataSection.url_video === null
                ? "cursor-default pointer-events-none"
                : "glightbox"
            } w-full lg:w-6/12 flex flex-col bg-navyblue lg:bg-[unset] relative z-1 transition-all duration-300 hover:opacity-75 group`}
          >
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image}
              alt="About"
              width={1000}
              height={1000}
              className="object-cover w-full aspect-[28/25] lg:aspect-[unset] lg:min-h-[486px] lg:h-full"
            />
            {dataSection.url_video && (
              <div class="bg-navyblue triangle-shape w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] absolute top-1/2 left-1/2 transform opacity-60 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease group-hover:bg-tosca group-hover:opacity-100"></div>
            )}
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutStory;
