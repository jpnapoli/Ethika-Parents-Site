"use client";

import { useTranslations } from "next-intl";
import {
  Policy,
  Security,
  WarningAlt,
  Checkmark,
  ArrowRight,
  Phone,
  Notification,
  Globe,
  Education,
  PedestrianChild,
} from "@carbon/icons-react";

type Props = { locale: string };

export default function RightsClient({ locale }: Props) {
  const t = useTranslations("rights");

  return (
    <div className="animate-fade-in">
      <div className="bg-purple-50 border-b border-purple-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-800 mb-1">{t("title")}</h1>
          <p className="text-sm text-neutral-600">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* SDAIA */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Policy size={20} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-neutral-800">{t("sdaia_title")}</h2>
          </div>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{t("sdaia_desc")}</p>
          <div className="bg-neutral-50 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-amber-600 mb-3">{t("sdaia_principles")}</h3>
            <ol className="space-y-2">
              {["sdaia_p1", "sdaia_p2", "sdaia_p3", "sdaia_p4", "sdaia_p5", "sdaia_p6", "sdaia_p7"].map((p, i) => (
                <li key={p} className="flex items-start gap-3 text-sm text-neutral-600">
                  <span className="w-5 h-5 bg-ethika-green text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {t(p)}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-700 mb-1">{t("sdaia_complaint")}</h3>
            <p className="text-sm text-neutral-600">{t("sdaia_complaint_link")}</p>
            <a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ethika-green mt-2 hover:underline">
              {locale === "ar" ? "\u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0628\u0648\u0627\u0628\u0629" : "Visit portal"} <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* PDPL */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <Security size={20} className="text-ethika-green" />
            </div>
            <h2 className="text-lg font-bold text-neutral-800">{t("pdpl_title")}</h2>
          </div>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{t("pdpl_desc")}</p>
          <ul className="space-y-2 mb-4">
            {["pdpl_right1", "pdpl_right2", "pdpl_right3", "pdpl_right4", "pdpl_right5"].map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-neutral-600">
                <Checkmark size={16} className="text-ethika-green flex-shrink-0 mt-0.5" />
                {t(r)}
              </li>
            ))}
          </ul>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <h3 className="text-sm font-semibold text-ethika-green mb-1">{t("pdpl_how_delete")}</h3>
            <p className="text-sm text-neutral-600">{t("pdpl_how_delete_text")}</p>
          </div>
        </section>

        {/* Anti-Cybercrime */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
              <WarningAlt size={20} className="text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-neutral-800">{t("cybercrime_title")}</h2>
          </div>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{t("cybercrime_desc")}</p>
          <div className="space-y-2">
            {["cybercrime_item1", "cybercrime_item2", "cybercrime_item3", "cybercrime_item4"].map((item) => (
              <div key={item} className="bg-red-50 rounded-xl p-3 border border-red-100">
                <p className="text-sm text-neutral-600">{t(item)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NCA */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-bold text-neutral-800 mb-3">{t("nca_title")}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-2">{t("nca_desc")}</p>
          <p className="text-sm text-neutral-600">{t("nca_report")}</p>
        </section>

        {/* Child Protection */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-bold text-neutral-800 mb-3">{t("child_protection_title")}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-3">{t("child_protection_desc")}</p>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-neutral-600">{t("child_protection_un")}</p>
          </div>
        </section>

        {/* Reporting Channels */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-bold text-neutral-800 mb-3">{t("reporting_title")}</h2>
          <p className="text-sm text-neutral-600 mb-4">{t("reporting_desc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "kollona", href: "tel:911", Icon: Phone },
              { key: "911", href: "tel:911", Icon: Notification },
              { key: "sdaia_portal", href: "https://sdaia.gov.sa", Icon: Globe },
              { key: "nca_portal", href: "#", Icon: Security },
              { key: "school", href: "#", Icon: Education },
            ].map((ch) => (
              <a key={ch.key} href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-neutral-50 rounded-xl p-4 group hover:bg-emerald-50 hover:border-emerald-200 border border-neutral-200 transition-all">
                <div className="flex items-start gap-3">
                  <ch.Icon size={20} className="text-ethika-green flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800 group-hover:text-ethika-green transition-colors">{t(`reporting_${ch.key}`)}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{t(`reporting_${ch.key}_desc`)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
