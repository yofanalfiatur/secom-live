import AboutPage from "@/components/Pages/About";
import AboutBhayangkaraPage from "@/components/Pages/AboutBhayangkara";
import BusinessPage from "@/components/Pages/Business";
import { apiFetch } from "@/libs/api";
import NotFound from "../not-found";
import FAQPage from "@/components/Pages/FAQ";
import AboutWorldPage from "@/components/Pages/AboutGlobal";
import CareerPage from "@/components/Pages/Career";
import ContactPage from "@/components/Pages/Contact";
import { generateNewsMetadata, generatePageMetadata } from "@/utils/metadata";
import NewsPage from "@/components/Pages/News";
import ResidentialPage from "@/components/Pages/Residential";
import SectorPage from "@/components/Pages/Sector";
import SolutionsPage from "@/components/Pages/Solution";
import SustainabilityPage from "@/components/Pages/Sustainability";
import NewsDetailPage from "@/components/Pages/Single/DetailNews";

// Definisikan metadata configuration untuk setiap page
const pageMetadataConfig = {
  "about-secom-indonesia": {
    identifier: "about-secom-indonesia",
    imageField: "about_banner.image",
  },
  "about-us-bhayangkara": {
    identifier: "about-us-bhayangkara",
    imageField: "about_bhayangkara_banner.image",
  },
  "about-secom-world": {
    identifier: "about-secom-world",
    imageField: "about_world_banner.image",
  },
  business: {
    identifier: "business",
    imageField: "business_banner.slides.0.image",
  },
  career: {
    identifier: "career",
    imageField: "career_banner.image",
  },

  "contact-us": {
    identifier: "contact-us",
    imageField: "contact_us.image_desktop",
  },

  faq: {
    identifier: "faq",
    imageField: "",
  },

  news: {
    identifier: "news",
    imageField: "",
  },

  residential: {
    identifier: "residential",
    imageField: "residential_banner.image",
  },

  sector: {
    identifier: "sector",
    imageField: "sector_banner.background_image_desktop",
  },

  solution: {
    identifier: "solution",
    imageField: "solution_banner.image",
  },

  "sustainability-management": {
    identifier: "sustainability-management",
    imageField: "",
  },
};

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  // Fetch resource data untuk metadata
  let resourceData = null;
  try {
    const response = await apiFetch(`/resource?url=${slug}`);
    resourceData = response?.data;
  } catch (error) {
    console.error("❌ Failed to fetch resource for metadata:", error);
    return {};
  }

  // Jika ada resource data dan type page, generate metadata
  if (resourceData && resourceData.type === "page") {
    const { identifier } = resourceData;
    const config = pageMetadataConfig[identifier];

    if (config) {
      return generatePageMetadata(config.identifier, locale, config.imageField);
    }
  } else if (resourceData && resourceData.type === "article") {
    return generateNewsMetadata(resourceData.identifier, locale);
  }

  // Fallback metadata
  return {
    title: "SECOM Indonesia",
    description: "SECOM Indonesia - Your Trusted Security Partner",
  };
}

export default async function DynamicPage({ params, searchParams }) {
  const { slug, locale } = await params;
  const resolvedSearchParams = await searchParams; // TAMBAHKAN INI

  // Fetch resource data berdasarkan slug
  let resourceData = null;
  try {
    const response = await apiFetch(`/resource?url=${slug}`);
    resourceData = response?.data;
  } catch (error) {
    console.error("❌ Failed to fetch resource:", error);
  }
  // Handle jika data tidak ditemukan
  if (!resourceData) {
    return <NotFound />;
  }

  // Destructuring data
  const { type, identifier } = resourceData;

  // Kondisi render berdasarkan identifier dan type
  if (type === "page") {
    switch (identifier) {
      case "about-secom-indonesia":
        return <AboutPage params={{ locale }} />;
      case "about-us-bhayangkara":
        return <AboutBhayangkaraPage params={{ locale }} />;
      case "about-secom-world":
        return <AboutWorldPage params={{ locale }} />;
      case "business":
        return <BusinessPage params={{ locale }} />;
      case "career":
        return <CareerPage params={{ locale }} />;
      case "contact-us":
        return <ContactPage params={{ locale }} />;
      case "faq":
        return <FAQPage params={{ locale }} />;
      case "news":
        return (
          <>
            <NewsPage params={{ locale }} searchParams={resolvedSearchParams} />
          </>
        );
      case "residential":
        return <ResidentialPage params={{ locale }} />;
      case "sector":
        return <SectorPage params={{ slug, locale }} />;
      case "solution":
        return <SolutionsPage params={{ locale }} />;
      case "sustainability-management":
        return <SustainabilityPage params={{ locale }} />;

      default:
        return <NotFound />;
    }
  } else if (type === "article") {
    return <NewsDetailPage params={{ slug, locale }} />;
  }

  // Jika bukan type "page"
  return (
    <div className="p-10 text-center">
      <h1>Unsupported Resource Type</h1>
      <p>Type: {type}</p>
    </div>
  );
}
