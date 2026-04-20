"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = { locale: string };

const RISKS = [
  {
    key: "deepfakes",
    icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z",
    incidents: ["deepfakes_incident1", "deepfakes_incident2"],
    sources: ["deepfakes_incident1_source", "deepfakes_incident2_source"],
    signs: ["deepfakes_sign1", "deepfakes_sign2", "deepfakes_sign3", "deepfakes_sign4"],
    talks: ["deepfakes_talk_young", "deepfakes_talk_older"],
  },
  {
    key: "voice_cloning",
    icon: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z",
    incidents: ["voice_cloning_incident1", "voice_cloning_incident2"],
    sources: ["voice_cloning_incident1_source", "voice_cloning_incident2_source"],
    signs: ["voice_cloning_sign1", "voice_cloning_sign2", "voice_cloning_sign3", "voice_cloning_sign4"],
    talks: ["voice_cloning_talk_young", "voice_cloning_talk_older"],
  },
];

export default function RisksClient({ locale }: Props) {
  const t = useTranslations("risks");
  const [activeRisk, setActiveRisk] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, string>>({});

  const risk = RISKS.find((r) => r.key === activeRisk);

  return (
    <div className="animate-fade-in">
      <section className="bg-carbon-gray-10 border-b border-carbon-gray-20 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brand-navy mb-2">{t("title")}</h1>
          <p className="text-base text-carbon-gray-70">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!activeRisk ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RISKS.map((r) => (
              <button
                key={r.key}
                onClick={() => setActiveRisk(r.key)}
                className="card p-6 text-left rtl:text-right group hover:border-brand-navy transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-carbon-gray-100 group-hover:text-brand-navy transition-colors">
                      {t(r.key)}
                    </h2>
                    <p className="text-sm text-carbon-gray-60 mt-1 line-clamp-2">
                      {t(`${r.key}_summary`)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <svg className="w-4 h-4 text-carbon-gray-30 group-hover:text-brand-navy transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : risk ? (
          <div className="animate-slide-up">
            <button
              onClick={() => setActiveRisk(null)}
              className="btn-ghost mb-6 text-sm gap-1.5"
            >
              <svg className="w-4 h-4 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("back_overview")}
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold text-brand-navy mb-6">{t(risk.key)}</h2>

            {/* Content Warning */}
            <div className="content-warning">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">{t("content_warning")}</h3>
                  <p className="text-sm text-amber-700 mt-1">{t("content_warning_text")}</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-carbon-gray-100 mb-3">{t("summary_title")}</h3>
              <p className="text-sm text-carbon-gray-70 leading-relaxed">{t(`${risk.key}_summary`)}</p>
            </div>

            {/* Incidents */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-carbon-gray-100 mb-4">{t("incidents_title")}</h3>
              <div className="space-y-4">
                {risk.incidents.map((inc, i) => (
                  <div key={inc} className="bg-carbon-gray-10 p-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-carbon-gray-30">
                    <p className="text-sm text-carbon-gray-70 leading-relaxed">{t(inc)}</p>
                    <p className="text-xs text-carbon-gray-50 mt-2 font-medium">
                      {t("source")}: {t(risk.sources[i])}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Signs */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-carbon-gray-100 mb-3">{t("signs_title")}</h3>
              <ul className="space-y-2">
                {risk.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 text-sm text-carbon-gray-70">
                    <svg className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {t(sign)}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to do */}
            <div className="mb-8 crisis-card">
              <h3 className="text-base font-semibold text-brand-red mb-2">{t("what_to_do")}</h3>
              <a
                href={`/${locale}/crisis`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:underline"
              >
                {t("what_to_do_link")}
              </a>
            </div>

            {/* How to talk */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-carbon-gray-100 mb-4">{t("talk_title")}</h3>
              <div className="space-y-3">
                {risk.talks.map((talk) => (
                  <div key={talk} className="bg-blue-50 p-4 rounded-sm">
                    <p className="text-sm text-carbon-gray-70 leading-relaxed italic">{t(talk)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="border-t border-carbon-gray-20 pt-6 mt-8">
              <h3 className="text-sm font-semibold text-carbon-gray-100 mb-3">{t("helpful")}</h3>
              {feedbackState[risk.key] === "sent" ? (
                <p className="text-sm text-brand-green animate-fade-in">{t("feedback_thanks")}</p>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setFeedbackState((s) => ({ ...s, [risk.key]: "sent" }))}
                    className="px-4 py-2 text-sm bg-carbon-gray-10 hover:bg-green-50 text-carbon-gray-70 transition-colors"
                  >
                    {t("helpful_yes")}
                  </button>
                  <button
                    onClick={() => setFeedbackState((s) => ({ ...s, [risk.key]: "sent" }))}
                    className="px-4 py-2 text-sm bg-carbon-gray-10 hover:bg-red-50 text-carbon-gray-70 transition-colors"
                  >
                    {t("helpful_no")}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
