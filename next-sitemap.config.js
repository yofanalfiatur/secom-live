const { apiFetch } = require('./src/libs/api') // adjust path if needed

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE || 'http://localhost:3000',
    generateRobotsTxt: true,
    additionalPaths: async (config) => {

        const pages = [
            'about',
            'about-bhayangkara',
            'about-global',
            'business',
            'career',
            'contact',
            'faq',
            'news',
            'privacy-policy',
            'product',
            'residential',
            'sector',
            'service',
            'solution',
            'sustainability-management',
        ]

        const result = pages.map((page) => ({
            loc: `/${page}`,
            changefreq: 'yearly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
            alternateRefs: [
                {
                    href: `${process.env.NEXT_PUBLIC_BASE}`,
                    hreflang: 'id',
                },
                {
                    href: `${process.env.NEXT_PUBLIC_BASE}/en/`,
                    hreflang: 'en',
                },
            ],
        }))

        // 🔹 Fetch sectors from API
        try {
            const response = await apiFetch('/sitemap')
            const sitemapData = response.data || []

            const dynamicPaths = sitemapData.map((item) => ({
                loc: item.loc, // already includes prefix like /news/, /sector/, etc.
                changefreq: 'yearly',
                priority: 0.7,
                lastmod: item.lastmod || new Date().toISOString(),
                alternateRefs: [
                    {
                        href: `${process.env.NEXT_PUBLIC_BASE}`,
                        hreflang: 'id',
                    },
                    {
                        href: `${process.env.NEXT_PUBLIC_BASE}/en`,
                        hreflang: 'en',
                    },
                ],
            }))

            result.push(...dynamicPaths)
        } catch (error) {
            console.error(' Failed to fetch sector slugs:', error)
        }

        return result
    },
}
