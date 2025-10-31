// utils/page-data.js

import { getPageData, getPostBySlug } from "@/libs/api";

/**
 * Get structured page data with error handling
 */
export async function getStructuredPageData(pageSlug, locale) {
  try {
    const response = await getPageData(pageSlug);
    const pageData = response.data?.[locale] || response.data?.id;

    if (!pageData || !pageData.sections) {
      console.error(`Invalid page data for ${pageSlug}:`, response);
      throw new Error(`Error loading page content for ${pageSlug}`);
    }

    const sections = pageData.sections.reduce((acc, section) => {
      acc[section.component] = section.fields;
      return acc;
    }, {});

    return {
      sections,
      rawData: pageData,
      seoData: response.data?.seo || {},
    };
  } catch (error) {
    console.error(`Error loading page data for ${pageSlug}:`, error);
    throw error; // Re-throw untuk handling di component
  }
}

/**
 * Get structured dynamic post data (for sectors, services, etc.)
 */
export async function getStructuredPostData(type, slug, locale) {
  try {
    const response = await getPostBySlug(type, slug);
    const postData = response.data;

    if (!postData) {
      throw new Error(`Post not found: ${type}/${slug}`);
    }

    const translationData =
      postData.translations?.[locale] || postData.translations?.id;

    if (!translationData) {
      throw new Error(`Translation not found for ${locale}`);
    }

    return {
      data: translationData,
      rawData: postData,
      slug: postData.slug,
    };
  } catch (error) {
    console.error(`Error loading post data for ${type}/${slug}:`, error);
    throw error;
  }
}

/**
 * Get specific section data safely
 */
export function getSectionData(sections, sectionName, defaultValue = {}) {
  return sections[sectionName] || defaultValue;
}

/**
 * Get array data from section safely
 */
export function getArrayData(sections, sectionName, arrayField) {
  const section = sections[sectionName];
  if (!section || !section[arrayField]) return [];
  return Array.isArray(section[arrayField])
    ? section[arrayField]
    : Object.values(section[arrayField]);
}
