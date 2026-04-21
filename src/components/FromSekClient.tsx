"use client";

import { useTranslations } from "next-intl";
import { Star, Globe, Link, Email, Calendar, Help } from "@carbon/icons-react";

type Props = { locale: string };

export default function FromSekClient({ locale }: Props) {
  const t = useTranslations("fromSek");
  const isAr = locale === "ar";

  const sections = [
    { titleKey: "academic_title", contentKey: "academic_content", signerKey: "academic_signer", dateKey: "academic_date" },
    { titleKey: "classroom_title", contentKey: "classroom_content", signerKey: "classroom_signer", dateKey: "classroom_date" },
    { titleKey: "escalation_title", contentKey: "escalation_content", signerKey: "escalation_signer", dateKey: "escalation_date" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-emerald-600 via-ethika-green to-emerald-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">{t("title")}</h1>
          <p className="text-sm text-emerald-100">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Signed Statements */}
        {sections.map((sec) => (
          <section key={sec.titleKey} className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-ethika-green">
                <Star size={12} />
                {isAr ? "\u0625\u062B\u064A\u0643\u0627 \u062A\u0642\u0648\u0644" : "Ethika says"}
              </span>
            </div>
            <h2 className="text-lg font-bold text-neutral-800 mb-3">{t(sec.titleKey)}</h2>
            <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line mb-4">{t(sec.contentKey)}</div>
            <div className="border-t border-neutral-100 pt-3">
              <p className="text-sm font-medium text-ethika-green">{t(sec.signerKey)}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{t(sec.dateKey)}</p>
            </div>
          </section>
        ))}

        {/* Contact */}
        <section className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-base font-bold text-neutral-800 mb-4">{isAr ? "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627" : "Connect With Us"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="https://ethika.digital" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-neutral-200 p-4 text-center hover:border-ethika-green hover:shadow-sm transition-all">
              <Globe size={20} className="mx-auto text-ethika-green mb-2" />
              <p className="text-xs font-semibold text-neutral-700">{t("contact_teacher")}</p>
            </a>
            <a href="https://ethika.digital" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-neutral-200 p-4 text-center hover:border-ethika-green hover:shadow-sm transition-all">
              <Link size={20} className="mx-auto text-ethika-green mb-2" />
              <p className="text-xs font-semibold text-neutral-700">{t("contact_counsellor")}</p>
            </a>
            <a href="https://ethika.digital" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-neutral-200 p-4 text-center hover:border-ethika-green hover:shadow-sm transition-all">
              <Email size={20} className="mx-auto text-ethika-green mb-2" />
              <p className="text-xs font-semibold text-neutral-700">{t("contact_head")}</p>
            </a>
          </div>
        </section>

        {/* Workshop */}
        <section className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
          <h2 className="text-base font-bold text-neutral-800 mb-2 flex items-center gap-2">
            <Calendar size={20} className="text-amber-600" />
            {t("workshop_title")}
          </h2>
          <p className="text-sm text-neutral-600 mb-3">{t("workshop_desc")}</p>
          <div className="bg-white rounded-xl p-3 mb-3 border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">{t("workshop_next")}</p>
            <p className="text-sm text-neutral-600">{t("workshop_date")}</p>
          </div>
          <button className="bg-ethika-green text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-ethika-green-dark transition-all">
            {t("workshop_register")}
          </button>
        </section>

        {/* Parents Asked */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-base font-bold text-neutral-800 mb-2 flex items-center gap-2">
            <Help size={20} className="text-neutral-500" />
            {t("parents_asked")}
          </h2>
          <p className="text-sm text-neutral-500 mb-4">{t("parents_asked_desc")}</p>
          <div className="space-y-4">
            <div className="bg-neutral-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-1">{t("parents_q1")}</p>
              <p className="text-sm text-neutral-600 leading-relaxed">{t("parents_a1")}</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-1">{t("parents_q2")}</p>
              <p className="text-sm text-neutral-600 leading-relaxed">{t("parents_a2")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
