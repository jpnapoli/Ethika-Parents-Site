"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = { locale: string };

export default function Header({ locale }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "en" ? "ar" : "en";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/crisis`, label: t("crisis") },
    { href: `/${locale}/try-ai`, label: t("tryAi") },
    { href: `/${locale}/risks`, label: t("risks") },
    { href: `/${locale}/rights`, label: t("rights") },
    { href: `/${locale}/read-deeper`, label: t("readDeeper") },
    { href: `/${locale}/from-sek`, label: t("fromSek") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-gray-20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Ethika"
              width={40}
              height={50}
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-ethika-green font-bold text-lg leading-tight tracking-tight block">
                {locale === "ar" ? "إثيكا" : "Ethika"}
              </span>
              <span className="text-gray-50 text-[10px] block -mt-0.5 font-medium tracking-wide">
                {locale === "ar" ? "ننمو رقمياً معاً" : "Growing Digital Together"}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" role="navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                  ${isActive(item.href)
                    ? "text-ethika-green bg-ethika-green-50"
                    : "text-gray-70 hover:text-ethika-green hover:bg-gray-10"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <a
              href={switchedPath || `/${otherLocale}`}
              className="text-sm px-3 py-1.5 font-semibold border border-ethika-green text-ethika-green rounded-md hover:bg-ethika-green-50 transition-colors"
              lang={otherLocale}
            >
              {t("language")}
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-70 hover:bg-gray-10 rounded-md"
              aria-label={mobileOpen ? t("close") : t("menu")}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-20 bg-white animate-slide-down" role="navigation">
          <div className="max-w-7xl mx-auto px-4 py-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-3 text-sm font-medium border-b border-gray-10 last:border-0 transition-colors duration-150
                  ${isActive(item.href)
                    ? "text-ethika-green bg-ethika-green-50"
                    : "text-gray-70 hover:text-ethika-green hover:bg-gray-10"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
