"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = { locale: string };

const SITUATIONS = [
  { key: "deepfake", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" },
  { key: "voice_scam", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
  { key: "bullying", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { key: "chatbot", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { key: "inappropriate", icon: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" },
  { key: "other", icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" },
];

export default function CrisisClient({ locale }: Props) {
  const t = useTranslations("crisis");
  const [selected, setSelected] = useState<string | null>(null);

  const keyMap: Record<string, { steps: string[]; contacts: string[]; preserve: string; after: string }> = {
    deepfake: {
      steps: ["deepfake_s1", "deepfake_s2", "deepfake_s3"],
      contacts: ["deepfake_c1", "deepfake_c2"],
      preserve: "deepfake_preserve",
      after: "deepfake_after",
    },
    voice_scam: {
      steps: ["voice_s1", "voice_s2", "voice_s3"],
      contacts: ["voice_c1", "voice_c2"],
      preserve: "voice_preserve",
      after: "voice_after",
    },
    bullying: {
      steps: ["bully_s1", "bully_s2", "bully_s3"],
      contacts: ["bully_c1", "bully_c2"],
      preserve: "bully_preserve",
      after: "bully_after",
    },
    chatbot: {
      steps: ["chatbot_s1", "chatbot_s2", "chatbot_s3"],
      contacts: ["chatbot_c1", "chatbot_c2"],
      preserve: "chatbot_preserve",
      after: "chatbot_after",
    },
    inappropriate: {
      steps: ["inappropriate_s1", "inappropriate_s2", "inappropriate_s3"],
      contacts: ["inappropriate_c1", "inappropriate_c2"],
      preserve: "inappropriate_preserve",
      after: "inappropriate_after",
    },
    other: {
      steps: ["other_s1", "other_s2", "other_s3"],
      contacts: ["other_c1", "other_c2"],
      preserve: "other_preserve",
      after: "other_after",
    },
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-red-50 border-b border-red-200 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brand-red mb-2">{t("title")}</h1>
          <p className="text-base text-carbon-gray-70">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!selected ? (
          /* Situation Selector */
          <div>
            <h2 className="text-lg font-semibold text-carbon-gray-100 mb-5">{t("q_title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITUATIONS.map((sit) => (
                <button
                  key={sit.key}
                  onClick={() => setSelected(sit.key)}
                  className="card border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red p-4 text-left rtl:text-right
                             hover:bg-red-50 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-brand-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={sit.icon} />
                    </svg>
                    <span className="text-sm font-medium text-carbon-gray-100 group-hover:text-brand-red transition-colors">
                      {t(sit.key)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Crisis Card */
          <div className="animate-slide-up">
            <button
              onClick={() => setSelected(null)}
              className="btn-ghost mb-6 text-sm gap-1.5"
            >
              <svg className="w-4 h-4 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("back")}
            </button>

            <div className="space-y-6">
              {/* Steps */}
              <div className="crisis-card">
                <h3 className="text-base font-semibold text-brand-red mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  {t("step_title")}
                </h3>
                <ol className="space-y-3">
                  {keyMap[selected].steps.map((key, i) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-brand-red text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-carbon-gray-100 leading-relaxed">{t(key)}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contacts */}
              <div className="bg-white border border-carbon-gray-20 p-5">
                <h3 className="text-base font-semibold text-carbon-gray-100 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {t("contact_title")}
                </h3>
                <ul className="space-y-2">
                  {keyMap[selected].contacts.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-carbon-gray-70">
                      <span className="text-brand-navy mt-1">&#8226;</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preserve */}
              <div className="bg-amber-50 border border-amber-200 p-5">
                <h3 className="text-base font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  {t("preserve_title")}
                </h3>
                <p className="text-sm text-amber-900">{t(keyMap[selected].preserve)}</p>
              </div>

              {/* After */}
              <div className="bg-carbon-gray-10 p-5 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-navy">
                <h3 className="text-base font-semibold text-brand-navy mb-2">{t("after_title")}</h3>
                <p className="text-sm text-carbon-gray-70">
                  {t(keyMap[selected].after)}
                </p>
                <a
                  href={`/${locale}/risks`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy mt-3 hover:underline"
                >
                  {locale === "ar" ? "اقرأ المزيد" : "Learn more"}
                  <svg className="w-3.5 h-3.5 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
