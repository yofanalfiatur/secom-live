async function fetchSitemapData() {
    try {
        // const url = 'http://api.localhost:8081/v1/sitemap/slug';
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap/slug`;

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            console.error("❌ API error:", res.status, res.statusText);
            return { id: [], en: [] }; // fallback empty arrays
        }

        const json = await res.json();

        // Make sure we return only the nested data object
        if (json.status === "success" && json.data) {
            return json.data; // THIS IS KEY
        }

        return { id: [], en: [] }; // fallback
    } catch (error) {
        console.error("❌ Network error:", error.message);
        return { id: [], en: [] }; // fallback
    }
}


const siteUrl = process.env.NEXT_PUBLIC_BASE || 'http://localhost:3000';

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    additionalPaths: async () => {
        const paths = [];

        try {
            const data = await fetchSitemapData(); // now returns { id: [...], en: [...] }

            for (const locale of Object.keys(data)) {
                data[locale].forEach((item) => {
                    const slug = item.slug;
                    const details = item.details || [];

                    if (locale === "id") {
                        paths.push({ loc: `/${slug}`, changefreq: "weekly", priority: 0.9 });
                        details.forEach((detail) => {
                            paths.push({ loc: `/${slug}/${detail}`, changefreq: "weekly", priority: 0.7 });
                        });
                    }

                    if (locale === "en") {
                        paths.push({ loc: `/en/${slug}`, changefreq: "weekly", priority: 0.9 });
                        details.forEach((detail) => {
                            paths.push({ loc: `/en/${slug}/${detail}`, changefreq: "weekly", priority: 0.7 });
                        });
                    }
                });
            }
        } catch (err) {
            console.error("❌ Failed to generate sitemap paths:", err);
        }

        return paths;
    },
};
