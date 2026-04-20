"use client";

import { useTranslations } from "next-intl";

type Props = { locale: string };

export default function FromSekClient({ locale }: Props) {
  const t = useTranslations("fromSek");
  const isAr = locale === "ar";

  const sections = [
    {
      titleKey: "academic_title",
      contentKey: "academic_content",
      signerKey: "academic_signer",
      dateKey: "academic_date",
    },
    {
      titleKey: "classroom_title",
      contentKey: "classroom_content",
      signerKey: "classroom_signer",
      dateKey: "classroom_date",
    },
    {
      titleKey: "escalation_title",
      contentKey: "escalation_content",
      signerKey: "escalation_signer",
      dateKey: "escalation_date",
    },
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-brand-navy text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{t("title")}</h1>
          <p className="text-base text-blue-200">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Signed Statements */}
        {sections.map((sec) => (
          <section key={sec.titleKey} className="card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="voice-tag-sek-says text-xs">
                {isAr ? "إثيكا تقول" : "Ethika says"}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-brand-navy mb-4">{t(sec.titleKey)}</h2>
            <div className="text-sm text-carbon-gray-70 leading-relaxed whitespace-pre-line mb-6">
              {t(sec.contentKey)}
            </div>
            <div className="border-t border-carbon-gray-20 pt-4 mt-4">
              <p className="text-sm font-medium text-brand-navy">{t(sec.signerKey)}</p>
              <p className="text-xs text-carbon-gray-50 mt-1">{t(sec.dateKey)}</p>
            </div>
          </section>
        ))}

        {/* Escalation contacts */}
        <section className="tile">
          <h2 className="text-lg font-semibold text-brand-navy mb-4">
            {isAr ? "تواصل معنا" : "Contact Us"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="#" className="card p-4 text-center hover:border-brand-navy transition-all">
              <svg className="w-5 h-5 mx-auto text-brand-navy mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p className="text-xs font-medium text-carbon-gray-100">{t("contact_teacher")}</p>
            </a>
            <a href="mailto:counsellor@ethika.edu.sa" className="card p-4 text-center hover:border-brand-navy transition-all">
              <svg className="w-5 h-5 mx-auto text-brand-navy mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <p className="text-xs font-medium text-carbon-gray-100">{t("contact_counsellor")}</p>
            </a>
            <a href="mailto:head@ethika.edu.sa" className="card p-4 text-center hover:border-brand-navy transition-all">
              <svg className="w-5 h-5 mx-auto text-brand-navy mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              <p className="text-xs font-medium text-carbon-gray-100">{t("contact_head")}</p>
            </a>
          </div>
        </section>

        {/* Workshop */}
        <section className="card p-6 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-gold">
          <h2 className="text-lg font-semibold text-brand-navy mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {t("workshop_title")}
          </h2>
          <p className="text-sm text-carbon-gray-70 mb-3">{t("workshop_desc")}</p>
          <div className="bg-carbon-gray-10 p-4 rounded-sm mb-3">
            <p className="text-xs font-semibold text-brand-gold mb-1">{t("workshop_next")}</p>
            <p className="text-sm text-carbon-gray-70">{t("workshop_date")}</p>
          </div>
          <button className="btn-primary text-sm px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light">
            {t("workshop_register")}
          </button>
        </section>

        {/* Parents Asked */}
        <section className="card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-navy mb-2">{t("parents_asked")}</h2>
          <p className="text-sm text-carbon-gray-60 mb-5">{t("parents_asked_desc")}</p>
          <div className="space-y-5">
            <div className="border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-navy pl-4 rtl:pl-0 rtl:pr-4">
              <p className="text-sm font-semibold text-carbon-gray-100 mb-1">{t("parents_q1")}</p>
              <p className="text-sm text-carbon-gray-70 leading-relaxed">{t("parents_a1")}</p>
            </div>
            <div className="border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-navy pl-4 rtl:pl-0 rtl:pr-4">
              <p className="text-sm font-semibold text-carbon-gray-100 mb-1">{t("parents_q2")}</p>
              <p className="text-sm text-carbon-gray-70 leading-relaxed">{t("parents_a2")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
