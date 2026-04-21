"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Misuse,
  Phone,
  UserMultiple,
  ChatBot,
  ViewOff,
  Help,
  ArrowLeft,
  ArrowRight,
  WarningFilled,
  Document,
} from "@carbon/icons-react";

type Props = { locale: string };

/* Carbon icons mapped to each crisis situation */
const SITUATION_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  deepfake: Misuse,
  voice_scam: Phone,
  bullying: UserMultiple,
  chatbot: ChatBot,
  inappropriate: ViewOff,
  other: Help,
};

const SITUATIONS = [
  { key: "deepfake" },
  { key: "voice_scam" },
  { key: "bullying" },
  { key: "chatbot" },
  { key: "inappropriate" },
  { key: "other" },
];

export default function CrisisClient({ locale }: Props) {
  const t = useTranslations("crisis");
  const [selected, setSelected] = useState<string | null>(null);

  const keyMap: Record<string, { steps: string[]; contacts: string[]; preserve: string; after: string }> = {
    deepfake: { steps: ["deepfake_s1", "deepfake_s2", "deepfake_s3"], contacts: ["deepfake_c1", "deepfake_c2"], preserve: "deepfake_preserve", after: "deepfake_after" },
    voice_scam: { steps: ["voice_s1", "voice_s2", "voice_s3"], contacts: ["voice_c1", "voice_c2"], preserve: "voice_preserve", after: "voice_after" },
    bullying: { steps: ["bully_s1", "bully_s2", "bully_s3"], contacts: ["bully_c1", "bully_c2"], preserve: "bully_preserve", after: "bully_after" },
    chatbot: { steps: ["chatbot_s1", "chatbot_s2", "chatbot_s3"], contacts: ["chatbot_c1", "chatbot_c2"], preserve: "chatbot_preserve", after: "chatbot_after" },
    inappropriate: { steps: ["inappropriate_s1", "inappropriate_s2", "inappropriate_s3"], contacts: ["inappropriate_c1", "inappropriate_c2"], preserve: "inappropriate_preserve", after: "inappropriate_after" },
    other: { steps: ["other_s1", "other_s2", "other_s3"], contacts: ["other_c1", "other_c2"], preserve: "other_preserve", after: "other_after" },
  };

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="bg-red-50 border-b border-red-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-red-700 mb-1">{t("title")}</h1>
          <p className="text-sm text-neutral-600">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!selected ? (
          <div>
            <h2 className="text-sm font-semibold text-neutral-700 mb-4">{t("q_title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITUATIONS.map((sit) => {
                const Icon = SITUATION_ICONS[sit.key];
                return (
                  <button
                    key={sit.key}
                    onClick={() => setSelected(sit.key)}
                    className="bg-white rounded-2xl border border-neutral-200 p-4 text-left rtl:text-right hover:border-red-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                        {Icon && <Icon size={20} className="text-red-500" />}
                      </div>
                      <span className="text-sm font-medium text-neutral-800 group-hover:text-red-700 transition-colors">{t(sit.key)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="animate-slide-up">
            <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors">
              <ArrowLeft size={16} className="flip-rtl" />
              {t("back")}
            </button>

            <div className="space-y-4">
              {/* Steps */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-red-700 mb-4 flex items-center gap-2">
                  <WarningFilled size={20} />
                  {t("step_title")}
                </h3>
                <ol className="space-y-3">
                  {keyMap[selected].steps.map((key, i) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                      <p className="text-sm text-neutral-700 leading-relaxed">{t(key)}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contacts */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                  <Phone size={20} className="text-ethika-green" />
                  {t("contact_title")}
                </h3>
                <ul className="space-y-2">
                  {keyMap[selected].contacts.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="text-ethika-green mt-1">&#8226;</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preserve */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Document size={20} />
                  {t("preserve_title")}
                </h3>
                <p className="text-sm text-amber-900">{t(keyMap[selected].preserve)}</p>
              </div>

              {/* After */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-neutral-800 mb-2">{t("after_title")}</h3>
                <p className="text-sm text-neutral-600">{t(keyMap[selected].after)}</p>
                <a href={`/${locale}/risks`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ethika-green mt-3 hover:underline">
                  {locale === "ar" ? "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F" : "Learn more"}
                  <ArrowRight size={14} className="flip-rtl" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
