import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import ProgressBar from "@/components/Layouts/ProgressBar";
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

  const responseMenu = await apiFetch(`/menu`);
  const footerMenu = responseMenu?.data?.footer_menu;
  const leftMenu = responseMenu?.data?.left_menu;
  const rightMenu = responseMenu?.data?.right_menu;

  const mappedLeftMenu = leftMenu.map((item, index) => ({
    icon: index % 2 === 0 ? "/img/menu-type-1.svg" : "/img/menu-type-2.svg",
    text: locale === "en" ? item.label_en : item.label_id,
    href:
      item.submenu && item.submenu.length > 0
        ? "#"
        : locale === "en"
        ? `/${item.page_attribute.url_en}`
        : `/${item.page_attribute.url_id}`,
    subMenu: item.submenu.map((subItem) => ({
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

  const mappedRightMenu = rightMenu.map((item) => ({
    icon: null,
    text: locale === "en" ? item.label_en : item.label_id,
    href:
      item.submenu && item.submenu.length > 0
        ? "#"
        : locale === "en"
        ? `/${item.page_attribute.url_en}`
        : `/${item.page_attribute.url_id}`,
    subMenu: item.submenu.map((subItem) => ({
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
        subMenu: item.submenu.map((subItem) => ({
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
    ...leftMenu.map((item, index) => ({
      icon: index % 2 === 0 ? "/img/menu-type-1.svg" : "/img/menu-type-2.svg",
      text: locale === "en" ? item.label_en : item.label_id,
      href:
        item.submenu && item.submenu.length > 0
          ? "#"
          : locale === "en"
          ? `/${item.page_attribute.url_en}`
          : `/${item.page_attribute.url_id}`,
      subMenu: item.submenu.map((subItem) => ({
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
        subMenu: item.submenu.map((subItem) => ({
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
          <ProgressBar />
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
