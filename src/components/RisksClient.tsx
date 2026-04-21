"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Misuse, Microphone, ArrowLeft, ArrowRight, WarningAlt } from "@carbon/icons-react";

type Props = { locale: string };

const RISK_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  deepfakes: Misuse,
  voice_cloning: Microphone,
};

const RISKS = [
  {
    key: "deepfakes",
    incidents: ["deepfakes_incident1", "deepfakes_incident2"],
    sources: ["deepfakes_incident1_source", "deepfakes_incident2_source"],
    signs: ["deepfakes_sign1", "deepfakes_sign2", "deepfakes_sign3", "deepfakes_sign4"],
    talks: ["deepfakes_talk_young", "deepfakes_talk_older"],
  },
  {
    key: "voice_cloning",
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
      <div className="bg-amber-50 border-b border-amber-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-800 mb-1">{t("title")}</h1>
          <p className="text-sm text-neutral-600">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!activeRisk ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RISKS.map((r) => (
              <button key={r.key} onClick={() => setActiveRisk(r.key)}
                className="bg-white rounded-2xl border border-neutral-200 p-5 text-left rtl:text-right group hover:border-amber-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    {(() => { const Icon = RISK_ICONS[r.key]; return Icon ? <Icon size={20} className="text-amber-600" /> : null; })()}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-neutral-800 group-hover:text-amber-700 transition-colors">{t(r.key)}</h2>
                    <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{t(`${r.key}_summary`)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : risk ? (
          <div className="animate-slide-up">
            <button onClick={() => setActiveRisk(null)} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors">
              <ArrowLeft size={16} className="flip-rtl" />
              {t("back_overview")}
            </button>

            <h2 className="text-xl font-bold text-neutral-800 mb-5">{t(risk.key)}</h2>

            {/* Content Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <WarningAlt size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">{t("content_warning")}</h3>
                  <p className="text-sm text-amber-700 mt-1">{t("content_warning_text")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-base font-semibold text-neutral-800 mb-2">{t("summary_title")}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{t(`${risk.key}_summary`)}</p>
              </div>

              {/* Incidents */}
              <div>
                <h3 className="text-base font-semibold text-neutral-800 mb-3">{t("incidents_title")}</h3>
                <div className="space-y-3">
                  {risk.incidents.map((inc, i) => (
                    <div key={inc} className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-600 leading-relaxed">{t(inc)}</p>
                      <p className="text-xs text-neutral-400 mt-2 font-medium">{t("source")}: {t(risk.sources[i])}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Signs */}
              <div>
                <h3 className="text-base font-semibold text-neutral-800 mb-3">{t("signs_title")}</h3>
                <ul className="space-y-2">
                  {risk.signs.map((sign) => (
                    <li key={sign} className="flex items-start gap-3 text-sm text-neutral-600">
                      <WarningAlt size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      {t(sign)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to do */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-red-700 mb-2">{t("what_to_do")}</h3>
                <a href={`/${locale}/crisis`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline">
                  {t("what_to_do_link")}
                  <ArrowRight size={14} className="flip-rtl" />
                </a>
              </div>

              {/* How to talk */}
              <div>
                <h3 className="text-base font-semibold text-neutral-800 mb-3">{t("talk_title")}</h3>
                <div className="space-y-3">
                  {risk.talks.map((talk) => (
                    <div key={talk} className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                      <p className="text-sm text-neutral-600 leading-relaxed italic">{t(talk)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="border-t border-neutral-100 pt-5 mt-6">
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">{t("helpful")}</h3>
                {feedbackState[risk.key] === "sent" ? (
                  <p className="text-sm text-ethika-green animate-fade-in">{t("feedback_thanks")}</p>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setFeedbackState((s) => ({ ...s, [risk.key]: "sent" }))}
                      className="px-4 py-2 text-sm bg-neutral-50 hover:bg-emerald-50 text-neutral-600 rounded-xl border border-neutral-200 transition-colors">
                      {t("helpful_yes")}
                    </button>
                    <button onClick={() => setFeedbackState((s) => ({ ...s, [risk.key]: "sent" }))}
                      className="px-4 py-2 text-sm bg-neutral-50 hover:bg-red-50 text-neutral-600 rounded-xl border border-neutral-200 transition-colors">
                      {t("helpful_no")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
