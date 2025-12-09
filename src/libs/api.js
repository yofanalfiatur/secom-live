// src/libs/api.js
export async function apiFetch(endpoint, options = {}) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;

    // Intelligent caching strategy based on endpoint
    let cacheTime = 3600; // default 1 hour

    // Menu data: cache for 24 hours (rarely changes)
    if (endpoint.includes("/menu")) {
      cacheTime = 86400;
    }
    // Resource lookups: cache for 1 hour
    if (endpoint.includes("/resource")) {
      cacheTime = 3600;
    }
    // Static pages: cache for 24 hours
    if (endpoint.includes("/page/")) {
      cacheTime = 86400;
    }
    // Categories: cache for 24 hours
    if (endpoint.includes("/categories")) {
      cacheTime = 86400;
    }
    // Sectors, products, services: cache for 1 hour (may be updated)
    if (
      endpoint.includes("/sectors") ||
      endpoint.includes("/products") ||
      endpoint.includes("/services")
    ) {
      cacheTime = 3600;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: { revalidate: cacheTime }, // ✅ Smart caching instead of no-store
      ...options,
    });

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`❌ Network Error: ${error.message}`);
    return null;
  }
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
export async function getPosts(type, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = queryString ? `/${type}?${queryString}` : `/${type}`;
  return apiFetch(endpoint);
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

/**
 * 🔹 Get categories for articles
 */
export async function getCategories() {
  return apiFetch("/categories/article");
}

export async function apiPost(endpoint, body = {}, options = {}) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    // throw new Error(`Failed to POST: ${endpoint}`);
  }

  return res.json();
}
