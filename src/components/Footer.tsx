"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const [feedbackState, setFeedbackState] = useState<"idle" | "positive" | "negative" | "sent">("idle");
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedback = (type: "positive" | "negative") => setFeedbackState(type);

  const handleSubmit = () => {
    console.log("Feedback:", feedbackState, feedbackText);
    setFeedbackState("sent");
    setFeedbackText("");
  };

  return (
    <footer className="bg-gray-90 text-white mt-auto">
      {/* Feedback */}
      <div className="border-b border-gray-70">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="text-sm font-semibold mb-3">{t("feedback_title")}</h3>
          {feedbackState === "sent" ? (
            <p className="text-sm text-gray-30 animate-fade-in">{t("feedback_thanks")}</p>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => handleFeedback("positive")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${feedbackState === "positive" ? "bg-ethika-green text-white" : "bg-gray-80 text-gray-30 hover:bg-gray-70"}`}>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" /></svg>
                    {t("feedback_yes")}
                  </span>
                </button>
                <button onClick={() => handleFeedback("negative")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${feedbackState === "negative" ? "bg-crisis-red text-white" : "bg-gray-80 text-gray-30 hover:bg-gray-70"}`}>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 001.302-4.665c0-1.194-.232-2.333-.654-3.375z" /></svg>
                    {t("feedback_no")}
                  </span>
                </button>
              </div>
              {(feedbackState === "positive" || feedbackState === "negative") && (
                <div className="flex gap-2 animate-fade-in">
                  <input type="text" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={t("feedback_text")}
                    className="flex-1 bg-gray-80 text-white text-sm px-3 py-2 border border-gray-60 rounded-md placeholder:text-gray-50 focus:border-ethika-green focus:outline-none" />
                  <button onClick={handleSubmit} className="btn-primary text-sm px-4 py-2">
                    {t("feedback_submit")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-ethika-green-light mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              {t("crisis_title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-30">
              <li><a href="tel:911" className="hover:text-white transition-colors">{t("kollona")}</a></li>
              <li><a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t("sdaia")}</a></li>
              <li><a href="mailto:counsellor@ethika.edu.sa" className="hover:text-white transition-colors">{t("counsellor")}</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-30">{t("maintained_by")}</p>
            <p className="text-sm text-gray-50 mt-2">{t("last_updated", { date: "April 2026" })}</p>
          </div>
          <div>
            <p className="text-sm text-gray-50">{t("copyright")}</p>
            <a href="#" className="text-sm text-gray-30 hover:text-white transition-colors mt-1 inline-block">{t("privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
