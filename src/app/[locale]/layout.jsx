import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import ProgressBar from "@/components/Layouts/ProgressBar";
import Script from "next/script";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the selected locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <title>SECOM</title>
        <meta name="description" content="Website for SECOM" />
        <meta name="robots" content="index, follow" />

        {/* Google Tag Manager (head) */}
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
        {/* Google Tag Manager (noscript) */}
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
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
