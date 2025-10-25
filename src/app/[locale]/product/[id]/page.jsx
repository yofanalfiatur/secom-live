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
import { getPostBySlug } from "@/libs/api";
import React from "react";
import HeaderList from "@/components/Fragments/Header/HeaderList";

export default async function ProductDetail({ params }) {
  const { id, locale } = await params;

  // fetch data based on slug
  const response = await getPostBySlug("products", id);
  if (!response || !response.data) return notFound();

  const productData = response.data;
  const translationData =
    productData.translations?.[locale] || productData.translations?.id;

  if (!translationData) return notFound();

  const fieldType = productData.field_type;

  const typeProduct = productData.type;

  // mapping component
  const bannerData = {
    title: translationData.banner_title,
    image: translationData.banner_image_desktop,
    imageMd: translationData.banner_image_mobile,
  };

  const overviewData = {
    desc: translationData.overview_title_section,
    items: null,
  };

  const reasonData = {
    title: translationData.why_choose_title_section,
    items: translationData.why_choose_cards,
  };

  const highlightData = {
    title: translationData.highlight_title_section,
    desc: translationData.highlight_description_section,
    cards: translationData.highlight_cards,
    cta: null,
  };

  const faqData = {
    title: translationData.faq_title_section,
    desc: translationData.faq_description_section,
    items: translationData.faq_accordions,
  };

  //full template
  const bannerFullData = {
    title: translationData.banner_title,
    background_image_desktop: translationData.banner_image_desktop,
    background_image_mobile: translationData.banner_image_mobile,
  };

  const overviewFullData = {
    desc: translationData.overview_title_section,
    items: translationData.overview_cards,
  };

  const protectData = {
    title: translationData.circle_title_section,
    image: translationData.circle_image_desktop,
    imageMobile: translationData.circle_image_mobile,
    items: translationData.circle_cards,
  };

  const productSection = {
    title: translationData.our_product_title_section,
    desc: translationData.our_product_description_section,
  };

  const productDevices =
    translationData.devices?.map((device) => {
      return {
        id: device.id,
        title: device.name,
        image: device.image
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${device.image}`
          : null,
        desc: device.pivot?.description?.[locale] || "",
        position_x: device.pivot?.position_x,
        position_y: device.pivot?.position_y,
        link: "#",
      };
    }) || [];

  const placementData = {
    title: translationData.placement_title_section,
    image: `${process.env.NEXT_PUBLIC_STORAGE_URL}${translationData.placement_image}`,
  };

  const appsData = {
    title: translationData.apps_title_section,
    desc: translationData.apps_description_section,
    image: translationData.apps_image,
    logo: translationData.apps_logo,
    hint: translationData.apps_hint_section,
    items: translationData.apps_list,
    playStoreImage: translationData.apps_playstore_image,
    playStoreURL: translationData.apps_playstore_url,
    appStoreImage: translationData.apps_appstore_image,
    appStoreURL: translationData.apps_appstore_url,
  };

  const featuresData = {
    title: translationData.feature_title_section,
    desc: translationData.feature_description_section,
    items: translationData.feature_table,
    type: null,
    competitor: locale === "en" ? "Other Company" : "Perusahaan Lain",
  };

  const packagesSection = {
    title: translationData.packages_title_section,
    desc: translationData.packages_description_section,
    terms: translationData.terms,
  };

  const formatPrice = (price, currentLocale) => {
    try {
      const number = parseInt(price) || 0;

      if (currentLocale === "id") {
        // Format Indonesia: 1.000.000
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        // Format English: 1,000,000
        return number.toLocaleString("en-US");
      }
    } catch (error) {
      console.error("Error formatting price:", error);
      return price; // Return original value if error
    }
  };

  const packagesData =
    translationData.packages?.map((pkg) => {
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
        buyDesc: pkg.buy_description?.[locale] || pkg.buy_description?.en || "",
        // Format semua harga
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

  return (
    <>
      <HeaderList locale={locale} />

      {fieldType === "default" ? (
        <>
          {/* template default */}
          <BannerClipText dataSection={bannerData} />
          <OverviewGlobal dataSection={overviewData} />
          <HowWeWork dataSection={reasonData} />
          <SolDtHighlight dataSection={highlightData} />
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
          <AmTrusted translationKey="AlarmTrusted" dataSection={featuresData} />
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
          <FloatButton />
        </>
      )}
    </>
  );
}
