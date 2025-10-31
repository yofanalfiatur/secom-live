// utils/metadata.js

import { getPageData, getPostBySlug } from "@/libs/api";

/**
 * Get image path from sections based on field path
 */
function getImagePathFromSections(sections, imageField) {
  if (!imageField) {
    return sections.home_about?.image_small;
  }

  const fieldPath = imageField.split(".");
  let current = sections;

  for (const key of fieldPath) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }

  return current || null;
}

/**
 * Generate metadata for pages
 */
export async function generatePageMetadata(
  pageSlug,
  locale,
  imageField = null
) {
  try {
    const response = await getPageData(pageSlug);
    const pageData = response.data?.[locale] || response.data?.id;

    if (!pageData) {
      return getDefaultMetadata();
    }

    const sections =
      pageData.sections?.reduce((acc, section) => {
        acc[section.component] = section.fields;
        return acc;
      }, {}) || {};

    const imagePath = getImagePathFromSections(sections, imageField);

    const meta = {
      title:
        response.data?.seo?.meta_title?.[locale] || pageData.title || "SECOM",
      description: response.data?.seo?.meta_description?.[locale] || "",
      keywords: response.data?.seo?.meta_keywords?.[locale] || "",
      image: imagePath
        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${imagePath}`
        : "",
    };

    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: meta.title,
        description: meta.description,
        images: meta.image ? [{ url: meta.image }] : [],
        type: "website",
        locale,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: meta.image ? [meta.image] : [],
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for ${pageSlug}:`, error);
    return getDefaultMetadata();
  }
}

/**
 * Generate metadata for dynamic pages (news, products, sectors, services, etc.)
 */
/**
 * Generate metadata for dynamic pages (news, products, sectors, services, etc.)
 */
export async function generateDynamicMetadata(
  type,
  slug,
  locale,
  imageField = null
) {
  try {
    const response = await getPostBySlug(type, slug);
    const postData = response.data;

    if (!postData) {
      return getDefaultMetadata();
    }

    const translationData =
      postData.translations?.[locale] || postData.translations?.id;

    if (!translationData) {
      return getDefaultMetadata();
    }

    // Get image based on field path
    let imagePath = null;
    if (imageField) {
      const fieldPath = imageField.split(".");
      let current = translationData;
      for (const key of fieldPath) {
        if (current && typeof current === "object" && key in current) {
          current = current[key];
        } else {
          current = null;
          break;
        }
      }
      imagePath = current;
    }

    // Fallback to banner image if no specific image field provided
    if (!imagePath && translationData.banner_image) {
      imagePath = translationData.banner_image;
    }

    const meta = {
      title:
        postData.seo?.meta_title?.[locale] ||
        translationData.title ||
        "SECOM Indonesia",
      description:
        postData.seo?.meta_description?.[locale] ||
        translationData.description?.substring(0, 160) ||
        "",
      keywords: postData.seo?.meta_keywords?.[locale] || "",
      image: imagePath
        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${imagePath}`
        : "",
    };

    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: meta.title,
        description: meta.description,
        images: meta.image ? [{ url: meta.image }] : [],
        type: "article",
        locale,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: meta.image ? [meta.image] : [],
      },
    };
  } catch (error) {
    console.error(
      `Error generating dynamic metadata for ${type}/${slug}:`,
      error
    );
    return getDefaultMetadata();
  }
}

/**
 * Generate metadata khusus untuk news/articles (karena struktur data berbeda)
 */
export async function generateNewsMetadata(slug, locale) {
  try {
    const response = await getPostBySlug("articles", slug);
    const articleData = response.data;

    if (!articleData) {
      return getDefaultMetadata();
    }

    // Untuk articles, data langsung tersedia tanpa nested translations
    const title =
      articleData.title?.[locale] || articleData.title?.id || "Article SECOM";
    const content =
      articleData.content?.[locale] || articleData.content?.id || "";

    // Clean HTML tags dari content untuk description
    const plainText = content.replace(/<[^>]+>/g, "");
    const description =
      plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");

    const meta = {
      title: articleData.seo?.meta_title?.[locale] || title,
      description: articleData.seo?.meta_description?.[locale] || description,
      keywords: articleData.seo?.meta_keywords?.[locale] || "",
      image: articleData.image?.[0]
        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${articleData.image[0]}`
        : "",
    };

    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: meta.title,
        description: meta.description,
        images: meta.image ? [{ url: meta.image }] : [],
        type: "article",
        locale,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: meta.image ? [meta.image] : [],
      },
    };
  } catch (error) {
    console.error(`Error generating news metadata for ${slug}:`, error);
    return getDefaultMetadata();
  }
}

/**
 * Default metadata fallback
 */
export function getDefaultMetadata() {
  return {
    title: "SECOM",
    description: "Website for SECOM",
    openGraph: {
      title: "SECOM",
      description: "Website for SECOM",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "SECOM",
      description: "Website for SECOM",
    },
  };
}
