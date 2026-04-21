"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  WarningAlt,
  Search,
  WatsonxAi,
  Idea,
  Scales,
  Book,
  Education,
  Globe,
  Menu,
  Close,
} from "@carbon/icons-react";

type Props = { locale: string };

const NAV_ITEMS = [
  { key: "home", href: "", Icon: Home },
  { key: "crisis", href: "/crisis", Icon: WarningAlt, accent: true },
  { key: "explore", href: "/explore", Icon: Search },
  { key: "try_ai", href: "/try-ai", Icon: WatsonxAi },
  { key: "risks", href: "/risks", Icon: Idea },
  { key: "rights", href: "/rights", Icon: Scales },
  { key: "read_deeper", href: "/read-deeper", Icon: Book },
  { key: "from_sek", href: "/from-sek", Icon: Education },
];

export default function Header({ locale }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const altLocale = locale === "ar" ? "en" : "ar";
  const altPath = pathname.replace(`/${locale}`, `/${altLocale}`);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Top row: Logo + lang + mobile toggle */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ethika" className="h-8 w-auto" />
            <span className="text-base font-bold text-ethika-green hidden sm:inline">Ethika</span>
          </a>

          {/* Desktop nav (icon + short label) */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                  ${isActive(item.href)
                    ? "bg-ethika-green-50 text-ethika-green"
                    : item.accent
                      ? "text-crisis-red hover:bg-red-50"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
              >
                <item.Icon size={20} />
                <span className="leading-none">{t(item.key)}</span>
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <a
              href={altPath}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              <Globe size={16} />
              {locale === "ar" ? "EN" : "\u0639\u0631\u0628\u064A"}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-50 transition-colors"
              aria-label={mobileOpen ? t("close") : t("menu")}
            >
              {mobileOpen ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav - grid of icons */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white animate-slide-down">
          <div className="max-w-7xl mx-auto px-3 py-3">
            <div className="grid grid-cols-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-xs font-medium transition-all
                    ${isActive(item.href)
                      ? "bg-ethika-green-50 text-ethika-green"
                      : item.accent
                        ? "text-crisis-red hover:bg-red-50"
                        : "text-neutral-500 hover:bg-neutral-50"
                    }`}
                >
                  <item.Icon size={24} />
                  <span className="leading-tight text-center">{t(item.key)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
