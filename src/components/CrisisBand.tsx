"use client";

import { useTranslations } from "next-intl";
import { Phone, WarningAlt, Globe } from "@carbon/icons-react";

export default function CrisisBand() {
  const t = useTranslations("crisis_band");

  return (
    <div className="bg-red-600 text-white" role="banner" aria-label={t("emergency")}>
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-medium">
        <a href="tel:911" className="inline-flex items-center gap-1 hover:underline underline-offset-2 transition-opacity hover:opacity-90">
          <Phone size={12} className="shrink-0" />
          {t("kollona")}
        </a>
        <span className="text-red-300 hidden sm:inline" aria-hidden="true">|</span>
        <a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline underline-offset-2 transition-opacity hover:opacity-90">
          <WarningAlt size={12} className="shrink-0" />
          {t("sdaia")}
        </a>
        <span className="text-red-300 hidden sm:inline" aria-hidden="true">|</span>
        <a href="https://ethika.digital" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline underline-offset-2 transition-opacity hover:opacity-90">
          <Globe size={12} className="shrink-0" />
          {t("counsellor")}
        </a>
      </div>
    </div>
  );
}
