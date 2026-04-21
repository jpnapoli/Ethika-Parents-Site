"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const [feedbackState, setFeedbackState] = useState<"idle" | "positive" | "negative" | "sent">("idle");
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedback = (type: "positive" | "negative") => setFeedbackState(type);
  const handleSubmit = () => { setFeedbackState("sent"); setFeedbackText(""); };

  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      {/* Feedback */}
      <div className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <h3 className="text-sm font-semibold mb-3">{t("feedback_title")}</h3>
          {feedbackState === "sent" ? (
            <p className="text-sm text-neutral-400 animate-fade-in">{t("feedback_thanks")}</p>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => handleFeedback("positive")}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${feedbackState === "positive" ? "bg-ethika-green text-white" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}>
                  {t("feedback_yes")}
                </button>
                <button onClick={() => handleFeedback("negative")}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${feedbackState === "negative" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}>
                  {t("feedback_no")}
                </button>
              </div>
              {(feedbackState === "positive" || feedbackState === "negative") && (
                <div className="flex gap-2 animate-fade-in">
                  <input type="text" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={t("feedback_text")}
                    className="flex-1 bg-neutral-800 text-white text-sm px-3 py-2 border border-neutral-700 rounded-xl placeholder:text-neutral-500 focus:border-ethika-green focus:outline-none" />
                  <button onClick={handleSubmit} className="bg-ethika-green text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-ethika-green-dark transition-all">
                    {t("feedback_submit")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-3">{t("crisis_title")}</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="tel:911" className="hover:text-white transition-colors">{t("kollona")}</a></li>
              <li><a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t("sdaia")}</a></li>
              <li><a href="https://ethika.digital" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t("counsellor")}</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-neutral-400">{t("maintained_by")}</p>
            <p className="text-sm text-neutral-500 mt-2">{t("last_updated", { date: "April 2026" })}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">{t("copyright")}</p>
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors mt-1 inline-block">{t("privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
