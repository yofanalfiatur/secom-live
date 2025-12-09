import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import ProgressBarWrapper from "@/components/Layouts/ProgressBarWrapper";
import Script from "next/script";
import FloatButton from "@/components/Elements/FloatButton";
import { apiFetch } from "@/libs/api";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the selected locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  // Fetch menu with smart caching (24h cache via apiFetch)
  const responseMenu = await apiFetch(`/menu`);
  const footerMenu = responseMenu?.data?.footer_menu || [];
  const leftMenu = responseMenu?.data?.left_menu || [];
  const rightMenu = responseMenu?.data?.right_menu || [];

  // Memoized menu mapping function to reduce re-computation
  const mapMenuItems = (items) => {
    return items.map((item, index) => ({
      icon: index % 2 === 0 ? "/img/menu-type-1.svg" : "/img/menu-type-2.svg",
      text: locale === "en" ? item.label_en : item.label_id,
      href:
        item.submenu && item.submenu.length > 0
          ? "#"
          : locale === "en"
          ? `/${item.page_attribute.url_en}`
          : `/${item.page_attribute.url_id}`,
      subMenu: (item.submenu || []).map((subItem) => ({
        subMenuText: locale === "en" ? subItem.label_en : subItem.label_id,
        subMenuHref:
          subItem.type === "product"
            ? locale === "en"
              ? `/product/${subItem.item_attribute.url_en}`
              : `/produk/${subItem.item_attribute.url_id}`
            : locale === "en"
            ? `/${subItem.item_attribute.url_en}`
            : `/${subItem.item_attribute.url_id}`,
      })),
    }));
  };

  const mappedLeftMenu = mapMenuItems(leftMenu);
  const mappedRightMenu = mapMenuItems(rightMenu);

  const mappedMobileMenu = [
    // Ambil "Home" dari rightMenu (index 0)
    ...rightMenu
      .filter((item, index) => index === 0)
      .map((item) => ({
        icon: null,
        text: locale === "en" ? item.label_en : item.label_id,
        href:
          item.submenu && item.submenu.length > 0
            ? "#"
            : locale === "en"
            ? `/${item.page_attribute.url_en}`
            : `/${item.page_attribute.url_id}`,
        subMenu: (item.submenu || []).map((subItem) => ({
          subMenuText: locale === "en" ? subItem.label_en : subItem.label_id,
          subMenuHref:
            subItem.type === "product"
              ? locale === "en"
                ? `/product/${subItem.item_attribute.url_en}`
                : `/produk/${subItem.item_attribute.url_id}`
              : locale === "en"
              ? `/${subItem.item_attribute.url_en}`
              : `/${subItem.item_attribute.url_id}`,
        })),
      })),

    // Semua item dari leftMenu (Bisnis, Residential)
    ...mapMenuItems(leftMenu),

    // Ambil sisanya dari rightMenu (About, Artikel) - mulai dari index 1
    ...rightMenu
      .filter((item, index) => index > 0)
      .map((item) => ({
        icon: null,
        text: locale === "en" ? item.label_en : item.label_id,
        href:
          item.submenu && item.submenu.length > 0
            ? "#"
            : locale === "en"
            ? `/${item.page_attribute.url_en}`
            : `/${item.page_attribute.url_id}`,
        subMenu: (item.submenu || []).map((subItem) => ({
          subMenuText: locale === "en" ? subItem.label_en : subItem.label_id,
          subMenuHref:
            subItem.type === "product"
              ? locale === "en"
                ? `/product/${subItem.item_attribute.url_en}`
                : `/produk/${subItem.item_attribute.url_id}`
              : locale === "en"
              ? `/${subItem.item_attribute.url_en}`
              : `/${subItem.item_attribute.url_id}`,
        })),
      })),
  ];

  const mappedFooterMenu = footerMenu.map((item) => ({
    FtMenuText: locale === "en" ? item.label_en : item.label_id,
    FtMenuLink:
      locale === "en"
        ? `/${item.page_attribute.url_en}`
        : `/${item.page_attribute.url_id}`,
  }));

  const responseContact = await apiFetch(`/resource?url=contact-us`);

  const contactLink =
    locale === "en"
      ? `/${responseContact?.data?.url.en}`
      : `/${responseContact?.data?.url.id}`;

  return (
    <html lang={locale}>
      <head>
        {/* Google Tag Manager (head) - Sementara disembunyikan */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MZZM55X');
          `}
        </Script>

        {/* TikTok Pixel Code */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            
            
              ttq.load('CVRIF23C77U883UVAPEG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) - Sementara disembunyikan */}

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZZM55X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProgressBarWrapper />
          <Header
            params={params}
            leftMenu={mappedLeftMenu}
            rightMenu={mappedRightMenu}
            mobileMenu={mappedMobileMenu}
            contactLink={contactLink}
          />
          <main>
            {children}
            <FloatButton />
          </main>
          <Footer params={params} footerMenu={mappedFooterMenu} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
