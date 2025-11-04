import { notFound } from "next/navigation";
import FloatButton from "@/components/Elements/FloatButton";
import AmApps from "@/components/Fragments/Alarm/AmApps";
import AmFAQ from "@/components/Fragments/Alarm/AmFAQ";
import AmPackage from "@/components/Fragments/Alarm/AmPackage";
import AmPlacement from "@/components/Fragments/Alarm/AmPlacement";
import AmProducts from "@/components/Fragments/Alarm/AmProducts";
import AmProtect from "@/components/Fragments/Alarm/AmProtect";
import AmTrusted from "@/components/Fragments/Alarm/AmTrusted";
import BannerClipText from "@/components/Fragments/Global/BannerClipText";
import BannerSecondary from "@/components/Fragments/Global/BannerSecondary";
import HowWeWork from "@/components/Fragments/Global/HowWeWork";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";
import SolDtHighlight from "@/components/Fragments/Solution-Detail/SolDtHighlight";
import { generateDynamicMetadata } from "@/utils/metadata";
import { getStructuredPostData } from "@/utils/page-data";
import HeaderList from "@/components/Fragments/Header/HeaderList";

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  return generateDynamicMetadata("products", id, locale, "image");
}

export default async function ProductDetail({ params }) {
  const { id, locale } = await params;

  try {
    const { data: productData, rawData } = await getStructuredPostData(
      "products",
      id,
      locale
    );

    const fieldType = rawData.field_type;
    const typeProduct = rawData.type;

    // Helper function untuk format price
    const formatPrice = (price, currentLocale) => {
      try {
        const number = parseInt(price) || 0;
        if (currentLocale === "id") {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          return number.toLocaleString("en-US");
        }
      } catch (error) {
        console.error("Error formatting price:", error);
        return price;
      }
    };

    // mapping component untuk template default
    const bannerData = {
      title: productData.banner_title,
      image: productData.banner_image_desktop,
      imageMd: productData.banner_image_mobile,
    };

    const overviewData = {
      desc: productData.overview_title_section,
      items: null,
    };

    const reasonData = {
      title: productData.why_choose_title_section,
      items: productData.why_choose_cards,
    };

    const highlightData = {
      title: productData.highlight_title_section,
      desc: productData.highlight_description_section,
      cards: productData.highlight_cards,
      cta: null,
    };

    const faqData = {
      title: productData.faq_title_section,
      desc: productData.faq_description_section,
      items: productData.faq_accordions,
    };

    // mapping component untuk template full
    const bannerFullData = {
      title: productData.banner_title,
      background_image_desktop: productData.banner_image_desktop,
      background_image_mobile: productData.banner_image_mobile,
    };

    const overviewFullData = {
      desc: productData.overview_title_section,
      items: productData.overview_cards,
    };

    const protectData = {
      title: productData.circle_title_section,
      image: productData.circle_image_desktop,
      imageMobile: productData.circle_image_mobile,
      items: productData.circle_cards,
    };

    const productSection = {
      title: productData.our_product_title_section,
      desc: productData.our_product_description_section,
    };

    const productDevices =
      productData.devices?.map((device) => ({
        id: device.id,
        title: device.name,
        image: device.image
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${device.image}`
          : null,
        desc: device.pivot?.description?.[locale] || "",
        position_x: device.pivot?.position_x,
        position_y: device.pivot?.position_y,
        link: "#",
      })) || [];

    const placementData = {
      title: productData.placement_title_section,
      image: `${process.env.NEXT_PUBLIC_STORAGE_URL}${productData.placement_image}`,
    };

    const appsData = {
      title: productData.apps_title_section,
      desc: productData.apps_description_section,
      image: productData.apps_image,
      logo: productData.apps_logo,
      hint: productData.apps_hint_section,
      items: productData.apps_list,
      playStoreImage: productData.apps_playstore_image,
      playStoreURL: productData.apps_playstore_url,
      appStoreImage: productData.apps_appstore_image,
      appStoreURL: productData.apps_appstore_url,
    };

    const featuresData = {
      title: productData.feature_title_section,
      desc: productData.feature_description_section,
      items: productData.feature_table,
      type: null,
      competitor: locale === "en" ? "Other Company" : "Perusahaan Lain",
    };

    const packagesSection = {
      title: productData.packages_title_section,
      desc: productData.packages_description_section,
      terms: productData.terms,
    };

    const packagesData =
      productData.packages?.map((pkg) => {
        const totalDevice =
          pkg.devices?.reduce((total, device) => {
            return total + parseInt(device.pivot?.quantity || 0);
          }, 0) || 0;

        return {
          id: pkg.id,
          title: pkg.name,
          image: pkg.image
            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${pkg.image}`
            : null,
          totalDevice: totalDevice,
          rentDesc:
            pkg.rent_description?.[locale] || pkg.rent_description?.en || "",
          buyDesc:
            pkg.buy_description?.[locale] || pkg.buy_description?.en || "",
          priceBuy: formatPrice(pkg.price, locale),
          serviceFeeBuy: {
            basic: formatPrice(pkg.buy_monitoring_service_fee, locale),
            full: formatPrice(pkg.buy_full_service_fee, locale),
          },
          serviceFeeRent: {
            basic: formatPrice(pkg.rent_monitoring_service_fee, locale),
            full: formatPrice(pkg.rent_full_service_fee, locale),
          },
          devices:
            pkg.devices?.map((device) => ({
              name: device.name,
              image: device.image
                ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${device.image}`
                : null,
              quantity: device.pivot?.quantity || "0",
            })) || [],
        };
      }) || [];

    const catalogue = {
      image: rawData.image,
      file: productData.catalogue,
    };

    return (
      <>
        {typeProduct === "business" ? <HeaderList locale={locale} /> : ""}

        {fieldType === "default" ? (
          <>
            {/* template default */}
            <BannerClipText dataSection={bannerData} />
            <OverviewGlobal
              dataSection={overviewData}
              buttonContact={true}
              slugContact={rawData.slug}
            />
            <HowWeWork dataSection={reasonData} />
            <SolDtHighlight dataSection={highlightData} catalogue={catalogue} />
            <AmFAQ dataSection={faqData} />
          </>
        ) : (
          <>
            {/* template full */}
            <BannerSecondary dataSection={bannerFullData} />
            <OverviewGlobal dataSection={overviewFullData} />
            <HowWeWork dataSection={reasonData} />
            <AmProtect dataSection={protectData} typeProduct={typeProduct} />
            <AmProducts
              dataSection={productSection}
              dataProducts={productDevices}
            />
            <AmPlacement
              dataSection={placementData}
              dataProducts={productDevices}
            />
            <AmApps dataSection={appsData} />
            <AmTrusted
              translationKey="AlarmTrusted"
              dataSection={featuresData}
            />
            <AmPackage
              translationKey="AlarmPackage"
              differences="AlarmDifferences"
              listPackages="BusinessPackages"
              packagesBuy="BusinessPackagesBuy"
              packagesRent="BusinessPackagesRent"
              packagesData={packagesData}
              packagesSection={packagesSection}
            />
            <AmFAQ dataSection={faqData} />
          </>
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading product detail:", error);
    notFound();
  }
}
