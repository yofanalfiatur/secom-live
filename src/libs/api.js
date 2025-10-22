// src/libs/api.js
export async function apiFetch(endpoint, options = {}) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store", // jangan cache data API
    ...options,
  });

  if (!res.ok) {
    console.error(`❌ API Error: ${res.status} ${res.statusText}`);
    throw new Error(`Failed to fetch: ${endpoint}`);
  }

  return res.json();
}

/**
 * 🔹 Get Page Data by slug
 * Example: /page/homepage
 */
export async function getPageData(slug) {
  return apiFetch(`/page/${slug}`);
}

/**
 * 🔹 Get all posts from a specific type
 * Example: /sector/, /services/, /products/, /faqs/, /vacancies/
 */
export async function getPosts(type) {
  return apiFetch(`/${type}`);
}

/**
 * 🔹 Get a single post by slug
 * Example: /sector/{slug}, /services/{slug}, etc.
 */
export async function getPostBySlug(type, slug) {
  return apiFetch(`/${type}/${slug}`);
}

export async function getPostById(type, id) {
  return apiFetch(`/${type}/${id}`);
}
