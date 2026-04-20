"use client";

import { useTranslations } from "next-intl";

type Props = { locale: string };

export default function RightsClient({ locale }: Props) {
  const t = useTranslations("rights");

  return (
    <div className="animate-fade-in">
      <section className="bg-green-50 border-b border-green-200 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brand-navy mb-2">{t("title")}</h1>
          <p className="text-base text-carbon-gray-70">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* SDAIA */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            {t("sdaia_title")}
          </h2>
          <p className="text-sm text-carbon-gray-70 mb-4 leading-relaxed">{t("sdaia_desc")}</p>
          <div className="tile mb-4">
            <h3 className="text-sm font-semibold text-brand-gold mb-3">{t("sdaia_principles")}</h3>
            <ol className="space-y-2">
              {["sdaia_p1", "sdaia_p2", "sdaia_p3", "sdaia_p4", "sdaia_p5", "sdaia_p6", "sdaia_p7"].map((p, i) => (
                <li key={p} className="flex items-start gap-3 text-sm text-carbon-gray-70">
                  <span className="w-5 h-5 bg-brand-navy text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {t(p)}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-blue-50 p-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-navy">
            <h3 className="text-sm font-semibold text-brand-navy mb-1">{t("sdaia_complaint")}</h3>
            <p className="text-sm text-carbon-gray-70">{t("sdaia_complaint_link")}</p>
            <a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1 text-sm font-medium text-brand-navy mt-2 hover:underline">
              {locale === "ar" ? "زيارة البوابة" : "Visit portal"} &rarr;
            </a>
          </div>
        </section>

        <hr className="border-carbon-gray-20" />

        {/* PDPL */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            {t("pdpl_title")}
          </h2>
          <p className="text-sm text-carbon-gray-70 mb-4 leading-relaxed">{t("pdpl_desc")}</p>
          <ul className="space-y-2 mb-4">
            {["pdpl_right1", "pdpl_right2", "pdpl_right3", "pdpl_right4", "pdpl_right5"].map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-carbon-gray-70">
                <svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {t(r)}
              </li>
            ))}
          </ul>
          <div className="bg-green-50 p-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-green">
            <h3 className="text-sm font-semibold text-brand-green mb-1">{t("pdpl_how_delete")}</h3>
            <p className="text-sm text-carbon-gray-70">{t("pdpl_how_delete_text")}</p>
          </div>
        </section>

        <hr className="border-carbon-gray-20" />

        {/* Anti-Cybercrime */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            {t("cybercrime_title")}
          </h2>
          <p className="text-sm text-carbon-gray-70 mb-4 leading-relaxed">{t("cybercrime_desc")}</p>
          <div className="space-y-2">
            {["cybercrime_item1", "cybercrime_item2", "cybercrime_item3", "cybercrime_item4"].map((item) => (
              <div key={item} className="bg-red-50 p-3 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red">
                <p className="text-sm text-carbon-gray-70">{t(item)}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-carbon-gray-20" />

        {/* NCA */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-3">{t("nca_title")}</h2>
          <p className="text-sm text-carbon-gray-70 mb-3 leading-relaxed">{t("nca_desc")}</p>
          <p className="text-sm text-carbon-gray-70">{t("nca_report")}</p>
        </section>

        <hr className="border-carbon-gray-20" />

        {/* Child Protection */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-3">{t("child_protection_title")}</h2>
          <p className="text-sm text-carbon-gray-70 mb-3 leading-relaxed">{t("child_protection_desc")}</p>
          <div className="bg-brand-navy/5 p-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-navy">
            <p className="text-sm text-carbon-gray-70">{t("child_protection_un")}</p>
          </div>
        </section>

        <hr className="border-carbon-gray-20" />

        {/* Reporting Channels */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-3">{t("reporting_title")}</h2>
          <p className="text-sm text-carbon-gray-70 mb-4">{t("reporting_desc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "kollona", href: "tel:911", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
              { key: "911", href: "tel:911", icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" },
              { key: "sdaia_portal", href: "https://sdaia.gov.sa", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" },
              { key: "nca_portal", href: "#", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
              { key: "school", href: "mailto:counsellor@ethika.edu.sa", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" },
            ].map((ch) => (
              <a
                key={ch.key}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card p-4 group hover:border-brand-navy transition-all duration-150"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-navy flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={ch.icon} />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-carbon-gray-100 group-hover:text-brand-navy transition-colors">
                      {t(`reporting_${ch.key}`)}
                    </h3>
                    <p className="text-xs text-carbon-gray-60 mt-1">
                      {t(`reporting_${ch.key}_desc`)}
                    </p>
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
