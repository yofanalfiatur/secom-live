// components/LocaleLink.jsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function LocaleLink({
  href,
  children,
  target,
  className,
  ...props
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const getCurrentLocale = () => {
    const segments = pathname.split("/");
    return segments[1] && (segments[1] === "en" || segments[1] === "id")
      ? segments[1]
      : "id"; // default locale
  };

  const locale = getCurrentLocale();

  const localizedHref = href.startsWith("http")
    ? href
    : `/${locale}/${href === "/" ? "" : href}`;

  return (
    <Link href={localizedHref} target={target} className={className} {...props}>
      {children}
    </Link>
  );
}
