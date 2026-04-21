"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { WatsonxAi, Tools, ArrowRight, Document } from "@carbon/icons-react";

type Props = { locale: string };

const TOOLS_6_9 = [
  { name: "Scratch", free: true, ksa: true, arabic: false, minAge: 8, privacy: "No account needed for basic use. MIT project — no ads, no tracking.", link: "https://scratch.mit.edu" },
  { name: "Google Quick, Draw!", free: true, ksa: true, arabic: false, minAge: 0, privacy: "No account required. Google collects drawings anonymously for ML training.", link: "https://quickdraw.withgoogle.com" },
  { name: "Teachable Machine", free: true, ksa: true, arabic: false, minAge: 0, privacy: "No account needed. All processing happens in the browser — no data uploaded.", link: "https://teachablemachine.withgoogle.com" },
];

const TOOLS_10_13 = [
  { name: "Khanmigo (Khan Academy)", free: false, ksa: true, arabic: false, minAge: 0, privacy: "Requires parent-managed account. Khan Academy is a nonprofit. Student data is protected under COPPA.", link: "https://www.khanmigo.ai" },
  { name: "ChatGPT", free: true, ksa: true, arabic: true, minAge: 13, privacy: "Requires account. OpenAI stores conversations. 13+ Terms of Service.", link: "https://chat.openai.com", ageWarning: true },
  { name: "MIT App Inventor", free: true, ksa: true, arabic: false, minAge: 0, privacy: "Google account required. MIT project — educational use, no ads.", link: "https://appinventor.mit.edu" },
  { name: "Day of AI", free: true, ksa: true, arabic: false, minAge: 0, privacy: "No account needed. MIT RAISE project — no data collection.", link: "https://dayofai.org" },
];

const ACTIVITIES_6_9 = [
  { title: { en: "Draw and Sort with AI", ar: "\u0627\u0631\u0633\u0645 \u0648\u0635\u0646\u0651\u0641 \u0645\u0639 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, need: { en: "A computer or tablet, Google Quick Draw!", ar: "\u062D\u0627\u0633\u0648\u0628 \u0623\u0648 \u062C\u0647\u0627\u0632 \u0644\u0648\u062D\u064A\u060C Google Quick, Draw!" }, duration: 20, say: { en: "Let\u2019s play a game where you draw something and a computer tries to guess what it is!", ar: "\u0647\u064A\u0627 \u0646\u0644\u0639\u0628 \u0644\u0639\u0628\u0629 \u062A\u0631\u0633\u0645 \u0641\u064A\u0647\u0627 \u0634\u064A\u0626\u0627\u064B \u0648\u0627\u0644\u062D\u0627\u0633\u0648\u0628 \u064A\u062D\u0627\u0648\u0644 \u062A\u062E\u0645\u064A\u0646\u0647!" }, notice: { en: "Watch how your child reacts when the AI guesses right vs wrong.", ar: "\u0631\u0627\u0642\u0628 \u0631\u062F\u0629 \u0641\u0639\u0644 \u0637\u0641\u0644\u0643 \u0639\u0646\u062F\u0645\u0627 \u064A\u062E\u0645\u0651\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D \u0623\u0648 \u062E\u0627\u0637\u0626." }, after: { en: "Ask: \u2018How do you think the computer knew what you were drawing?\u2019", ar: "\u0627\u0633\u0623\u0644: \u2018\u0643\u064A\u0641 \u062A\u0638\u0646 \u0623\u0646 \u0627\u0644\u062D\u0627\u0633\u0648\u0628 \u0639\u0631\u0641 \u0645\u0627 \u0643\u0646\u062A \u062A\u0631\u0633\u0645\u0647\u061F\u2019" } },
  { title: { en: "Teach a Machine to See", ar: "\u0639\u0644\u0651\u0645 \u0627\u0644\u0622\u0644\u0629 \u0623\u0646 \u062A\u0631\u0649" }, need: { en: "A computer with webcam, Google Teachable Machine", ar: "\u062D\u0627\u0633\u0648\u0628 \u0628\u0643\u0627\u0645\u064A\u0631\u0627\u060C Google Teachable Machine" }, duration: 30, say: { en: "Today you\u2019re going to be the teacher! You\u2019ll teach a computer to recognize things.", ar: "\u0627\u0644\u064A\u0648\u0645 \u0633\u062A\u0643\u0648\u0646 \u0623\u0646\u062A \u0627\u0644\u0645\u0639\u0644\u0645! \u0633\u062A\u0639\u0644\u0651\u0645 \u0627\u0644\u062D\u0627\u0633\u0648\u0628 \u0627\u0644\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0634\u064A\u0627\u0621." }, notice: { en: "Does your child understand they\u2019re providing examples?", ar: "\u0647\u0644 \u064A\u0641\u0647\u0645 \u0637\u0641\u0644\u0643 \u0623\u0646\u0647 \u064A\u0642\u062F\u0645 \u0623\u0645\u062B\u0644\u0629\u061F" }, after: { en: "Ask: \u2018What happened when you only showed a few examples?\u2019", ar: "\u0627\u0633\u0623\u0644: \u2018\u0645\u0627\u0630\u0627 \u062D\u062F\u062B \u0639\u0646\u062F\u0645\u0627 \u0623\u0631\u064A\u062A\u0647 \u0623\u0645\u062B\u0644\u0629 \u0642\u0644\u064A\u0644\u0629 \u0641\u0642\u0637\u061F\u2019" } },
  { title: { en: "Spot the AI Art", ar: "\u0627\u0643\u062A\u0634\u0641 \u0641\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, need: { en: "Printed or screen images \u2014 mix of AI-generated and real photos", ar: "\u0635\u0648\u0631 \u0645\u0637\u0628\u0648\u0639\u0629 \u0623\u0648 \u0639\u0644\u0649 \u0627\u0644\u0634\u0627\u0634\u0629 \u2014 \u0645\u0632\u064A\u062C \u0645\u0646 \u0635\u0648\u0631 \u0645\u0648\u0644\u062F\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0635\u0648\u0631 \u062D\u0642\u064A\u0642\u064A\u0629" }, duration: 15, say: { en: "Some pictures were made by a computer. Can you guess which?", ar: "\u0628\u0639\u0636 \u0627\u0644\u0635\u0648\u0631 \u0635\u0646\u0639\u0647\u0627 \u062D\u0627\u0633\u0648\u0628. \u0647\u0644 \u062A\u0633\u062A\u0637\u064A\u0639 \u062A\u062E\u0645\u064A\u0646 \u0623\u064A\u0647\u0627\u061F" }, notice: { en: "What details does your child focus on?", ar: "\u0645\u0627 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u064A \u064A\u0631\u0643\u0632 \u0639\u0644\u064A\u0647\u0627 \u0637\u0641\u0644\u0643\u061F" }, after: { en: "Talk about how AI can make fake things that look real.", ar: "\u062A\u062D\u062F\u062B \u0639\u0646 \u0643\u064A\u0641 \u064A\u0645\u0643\u0646 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0635\u0646\u0639 \u0623\u0634\u064A\u0627\u0621 \u0645\u0632\u064A\u0641\u0629 \u062A\u0628\u062F\u0648 \u062D\u0642\u064A\u0642\u064A\u0629." } },
];

const ACTIVITIES_10_13 = [
  { title: { en: "Fact-Check the AI", ar: "\u062A\u062D\u0642\u0642 \u0645\u0646 \u062D\u0642\u0627\u0626\u0642 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, need: { en: "Access to ChatGPT (parent-supervised), a search engine", ar: "\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 ChatGPT (\u0628\u0625\u0634\u0631\u0627\u0641 \u0627\u0644\u0648\u0627\u0644\u062F\u064A\u0646)\u060C \u0645\u062D\u0631\u0643 \u0628\u062D\u062B" }, duration: 30, say: { en: "Let\u2019s ask the AI some questions you already know the answers to.", ar: "\u0647\u064A\u0627 \u0646\u0633\u0623\u0644 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0623\u0633\u0626\u0644\u0629 \u062A\u0639\u0631\u0641 \u0623\u0646\u062A \u0625\u062C\u0627\u0628\u0627\u062A\u0647\u0627." }, notice: { en: "Does your child trust the AI answers automatically?", ar: "\u0647\u0644 \u064A\u062B\u0642 \u0637\u0641\u0644\u0643 \u0628\u0625\u062C\u0627\u0628\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u061F" }, after: { en: "Discuss: \u2018The AI was confident even when wrong.\u2019", ar: "\u0646\u0627\u0642\u0634: \u2018\u0643\u0627\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0627\u062B\u0642\u0627\u064B \u062D\u062A\u0649 \u0639\u0646\u062F\u0645\u0627 \u0623\u062E\u0637\u0623.\u2019" } },
  { title: { en: "Build an AI Bias Detector", ar: "\u0627\u0628\u0646\u0650 \u0643\u0627\u0634\u0641 \u062A\u062D\u064A\u0632 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, need: { en: "A notebook, access to an image generation AI (parent-supervised)", ar: "\u062F\u0641\u062A\u0631 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u060C \u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0635\u0648\u0631 (\u0628\u0625\u0634\u0631\u0627\u0641 \u0627\u0644\u0648\u0627\u0644\u062F\u064A\u0646)" }, duration: 30, say: { en: "Let\u2019s ask the AI to draw different types of people.", ar: "\u0647\u064A\u0627 \u0646\u0637\u0644\u0628 \u0645\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0631\u0633\u0645 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646 \u0627\u0644\u0646\u0627\u0633." }, notice: { en: "Does the AI default to certain genders or races for professions?", ar: "\u0647\u0644 \u064A\u0641\u062A\u0631\u0636 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u062C\u0646\u0633\u0627\u064B \u0623\u0648 \u0639\u0631\u0642\u0627\u064B \u0645\u0639\u064A\u0646\u0627\u064B \u0644\u0645\u0647\u0646 \u0645\u0639\u064A\u0646\u0629\u061F" }, after: { en: "Talk about where bias comes from: \u2018AI learns from data made by humans.\u2019", ar: "\u062A\u062D\u062F\u062B \u0639\u0646 \u0645\u0635\u062F\u0631 \u0627\u0644\u062A\u062D\u064A\u0632: \u2018\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u064A\u062A\u0639\u0644\u0645 \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u0646\u0639\u0647\u0627 \u0627\u0644\u0628\u0634\u0631.\u2019" } },
  { title: { en: "AI Privacy Audit", ar: "\u062A\u062F\u0642\u064A\u0642 \u062E\u0635\u0648\u0635\u064A\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, need: { en: "Your child\u2019s phone or tablet (with their permission)", ar: "\u0647\u0627\u062A\u0641 \u0623\u0648 \u062C\u0647\u0627\u0632 \u0637\u0641\u0644\u0643 \u0627\u0644\u0644\u0648\u062D\u064A (\u0628\u0625\u0630\u0646\u0647)" }, duration: 25, say: { en: "Let\u2019s look at what apps on your phone use AI.", ar: "\u0647\u064A\u0627 \u0646\u0646\u0638\u0631 \u0623\u064A \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0639\u0644\u0649 \u0647\u0627\u062A\u0641\u0643 \u062A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A." }, notice: { en: "Is your child surprised by what data apps collect?", ar: "\u0647\u0644 \u064A\u062A\u0641\u0627\u062C\u0623 \u0637\u0641\u0644\u0643 \u0645\u0645\u0627 \u062A\u062C\u0645\u0639\u0647 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A\u061F" }, after: { en: "Together, decide which permissions to revoke.", ar: "\u0645\u0639\u0627\u064B\u060C \u0642\u0631\u0631\u0648\u0627 \u0623\u064A \u0623\u0630\u0648\u0646\u0627\u062A \u062A\u0633\u062D\u0628\u0648\u0646\u0647\u0627." } },
];

export default function TryAiClient({ locale }: Props) {
  const t = useTranslations("tryAi");
  const [activeTab, setActiveTab] = useState<"6_9" | "10_13">("6_9");
  const isAr = locale === "ar";

  useEffect(() => {
    const stored = localStorage.getItem("ethika_ages");
    if (stored) {
      const ages: string[] = JSON.parse(stored);
      if (ages.includes("10_13") && !ages.includes("6_9")) setActiveTab("10_13");
    }
  }, []);

  const tools = activeTab === "6_9" ? TOOLS_6_9 : TOOLS_10_13;
  const activities = activeTab === "6_9" ? ACTIVITIES_6_9 : ACTIVITIES_10_13;

  return (
    <div className="animate-fade-in">
      <div className="bg-emerald-50 border-b border-emerald-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-ethika-green-dark mb-1">{t("title")}</h1>
          <p className="text-sm text-neutral-600">{t("subtitle")}</p>
        </div>
      </div>

      {/* Age filter bar at top */}
      <div className="bg-white border-b border-neutral-100 sticky top-14 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-xs font-semibold text-neutral-500">{isAr ? "\u0627\u0644\u0639\u0645\u0631:" : "Age:"}</span>
          <button onClick={() => setActiveTab("6_9")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${activeTab === "6_9" ? "bg-ethika-green text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"}`}>
            {t("age_6_9_title")}
          </button>
          <button onClick={() => setActiveTab("10_13")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${activeTab === "10_13" ? "bg-ethika-green text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"}`}>
            {t("age_10_13_title")}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Dev Note */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-6">
          <h3 className="text-sm font-semibold text-amber-700 mb-1">{t("dev_note")}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{activeTab === "6_9" ? t("age_6_9_dev") : t("age_10_13_dev")}</p>
        </div>

        {/* Activities */}
        <h2 className="text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <WatsonxAi size={20} className="text-ethika-green" />
          {t("activities_title")}
        </h2>
        <div className="space-y-4 mb-10">
          {activities.map((act, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-5">
              <h3 className="text-base font-semibold text-neutral-800 mb-4">{isAr ? act.title.ar : act.title.en}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                <div><span className="font-medium text-neutral-700">{t("what_need")}: </span><span className="text-neutral-600">{isAr ? act.need.ar : act.need.en}</span></div>
                <div><span className="font-medium text-neutral-700">{t("how_long")}: </span><span className="text-neutral-600">{t("minutes", { count: act.duration })}</span></div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <span className="text-xs font-semibold text-blue-700 block mb-1">{t("what_say")}</span>
                  <p className="text-sm text-neutral-600 italic">&ldquo;{isAr ? act.say.ar : act.say.en}&rdquo;</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl">
                  <span className="text-xs font-semibold text-neutral-700 block mb-1">{t("what_notice")}</span>
                  <p className="text-sm text-neutral-600">{isAr ? act.notice.ar : act.notice.en}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <span className="text-xs font-semibold text-emerald-700 block mb-1">{t("what_after")}</span>
                  <p className="text-sm text-neutral-600">{isAr ? act.after.ar : act.after.en}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <h2 className="text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <Tools size={20} className="text-ethika-green" />
          {t("tools_title")}
        </h2>
        <div className="space-y-3 mb-10">
          {tools.map((tool) => (
            <div key={tool.name} className="bg-white rounded-2xl border border-neutral-200 p-4">
              {(tool as any).ageWarning && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2 mb-3 rounded-xl font-medium">{t("age_warning", { min: tool.minAge })}</div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800">{tool.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1">{tool.privacy}</p>
                </div>
                <a href={tool.link} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-semibold text-ethika-green hover:underline shrink-0 flex items-center gap-1">
                  {isAr ? "\u0632\u064A\u0627\u0631\u0629" : "Visit"}
                  <ArrowRight size={12} className="flip-rtl" />
                </a>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tool.free ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {tool.free ? t("free") : t("paid")}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tool.ksa ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {tool.ksa ? t("ksa_yes") : t("ksa_no")}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tool.arabic ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>
                  {tool.arabic ? t("arabic_yes") : t("arabic_no")}
                </span>
                {tool.minAge > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">{t("min_age", { age: tool.minAge })}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Family Agreement */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
          <h2 className="text-base font-bold text-neutral-800 mb-2 flex items-center gap-2">
            <Document size={20} className="text-ethika-green" />
            {t("agreement_title")}
          </h2>
          <p className="text-sm text-neutral-600 mb-3">{t("agreement_desc")}</p>
          <button className="bg-ethika-green text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-ethika-green-dark transition-all">
            {t("agreement_download")}
          </button>
        </div>
      </div>
    </div>
  );
}
