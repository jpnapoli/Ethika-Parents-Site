"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

type Props = { locale: string };

const AVATARS = [
  { emoji: "🌳", label: "Tree" },
  { emoji: "🦉", label: "Owl" },
  { emoji: "🌻", label: "Sunflower" },
  { emoji: "🦋", label: "Butterfly" },
  { emoji: "🐝", label: "Bee" },
  { emoji: "🌙", label: "Moon" },
  { emoji: "🐢", label: "Turtle" },
  { emoji: "🦊", label: "Fox" },
  { emoji: "🌊", label: "Wave" },
  { emoji: "🎨", label: "Palette" },
  { emoji: "🧩", label: "Puzzle" },
  { emoji: "🏔️", label: "Mountain" },
];

const TRIAGE_CARDS = [
  {
    key: "crisis",
    href: "/crisis",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    color: "border-crisis-red hover:bg-red-50",
    textKey: "card_crisis",
    descKey: "card_crisis_desc",
  },
  {
    key: "explore",
    href: "/try-ai",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
    color: "border-ethika-gold hover:bg-amber-50",
    textKey: "card_explore",
    descKey: "card_explore_desc",
  },
  {
    key: "understand",
    href: "/risks",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    color: "border-ethika-navy hover:bg-blue-50",
    textKey: "card_understand",
    descKey: "card_understand_desc",
  },
  {
    key: "read",
    href: "/read-deeper",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    color: "border-ethika-teal hover:bg-teal-50",
    textKey: "card_read",
    descKey: "card_read_desc",
  },
  {
    key: "rights",
    href: "/rights",
    icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
    color: "border-safe-green hover:bg-green-50",
    textKey: "card_rights",
    descKey: "card_rights_desc",
  },
];

const AGE_BANDS = ["3_5", "6_9", "10_13", "14_16"] as const;

export default function HomeClient({ locale }: Props) {
  const t = useTranslations("home");
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [ageSaved, setAgeSaved] = useState(false);
  const [hasStoredAges, setHasStoredAges] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [onboardingStep, setOnboardingStep] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("ethika_ages");
    const user = localStorage.getItem("ethika_user");
    if (stored) {
      setSelectedAges(JSON.parse(stored));
      setHasStoredAges(true);
    }
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id);
      setSelectedAvatar(userData.avatar);
      setDisplayName(userData.name);
      setTermsAccepted(true);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const generateId = () => {
    return "ETK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const completeOnboarding = () => {
    const id = generateId();
    const userData = { id, avatar: selectedAvatar, name: displayName || id };
    localStorage.setItem("ethika_user", JSON.stringify(userData));
    setUserId(id);
    setShowOnboarding(false);
    document.cookie = `ethika_uid=${id}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const toggleAge = (age: string) => {
    setSelectedAges((prev) => prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]);
  };

  const saveAges = () => {
    localStorage.setItem("ethika_ages", JSON.stringify(selectedAges));
    setAgeSaved(true);
    setHasStoredAges(true);
    setTimeout(() => setAgeSaved(false), 3000);
  };

  const isAr = locale === "ar";

  // Onboarding Overlay
  if (showOnboarding) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="bg-ethika-green p-6 rounded-t-xl text-white text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ethika" className="h-16 w-auto mx-auto mb-1" />
            <h2 className="text-xl font-bold">
              {isAr ? "مرحباً بك في إثيكا" : "Welcome to Ethika"}
            </h2>
            <p className="text-sm opacity-90 mt-1">
              {isAr ? "أدوات الآباء للذكاء الاصطناعي" : "Parents AI Toolkit"}
            </p>
          </div>

          <div className="p-6">
            {onboardingStep === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-base font-semibold text-gray-100 mb-3">
                  {isAr ? "قبل أن نبدأ" : "Before we begin"}
                </h3>
                <div className="bg-gray-10 rounded-lg p-4 text-sm text-gray-70 leading-relaxed mb-4 max-h-48 overflow-y-auto">
                  {isAr ? (
                    <>
                      <p className="mb-2">هذا الموقع مورد مجاني مقدم لأولياء الأمور المشاركين في ورش عمل إثيكا. باستخدامك لهذا الموقع، فإنك توافق على:</p>
                      <ul className="list-disc mr-4 space-y-1">
                        <li>المعلومات المقدمة للأغراض التعليمية وقابلة للتغيير.</li>
                        <li>الاستخدام يخضع لإرشادات إثيكا.</li>
                        <li>لا نجمع أي بيانات شخصية. تُحفظ تفضيلاتك فقط على جهازك.</li>
                        <li>المحتوى لا يشكل نصيحة قانونية أو طبية.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="mb-2">This website is a complimentary resource for parents attending Ethika workshops. By using this site, you agree that:</p>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Information provided is for educational purposes and subject to change.</li>
                        <li>Use of this website is subject to Ethika's guidelines.</li>
                        <li>We do not collect any personal data. Your preferences are stored only on your device.</li>
                        <li>Content does not constitute legal or medical advice.</li>
                      </ul>
                    </>
                  )}
                </div>
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-30 text-ethika-green accent-[#35a318]" />
                  <span className="text-sm text-gray-70">
                    {isAr ? "أوافق على هذه الشروط وأفهم أن المعلومات قابلة للتغيير." : "I agree to these terms and understand information is subject to change."}
                  </span>
                </label>
                <button onClick={() => setOnboardingStep(2)} disabled={!termsAccepted}
                  className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed">
                  {isAr ? "متابعة" : "Continue"}
                </button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-base font-semibold text-gray-100 mb-1">
                  {isAr ? "اختر صورتك الرمزية" : "Choose your avatar"}
                </h3>
                <p className="text-xs text-gray-50 mb-4">
                  {isAr ? "للخصوصية الكاملة — لا حاجة لاسمك الحقيقي." : "Full privacy — no real name needed."}
                </p>
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {AVATARS.map((a) => (
                    <button key={a.emoji} onClick={() => setSelectedAvatar(a.emoji)}
                      className={`text-2xl p-3 rounded-lg border-2 transition-all
                        ${selectedAvatar === a.emoji ? "border-ethika-green bg-ethika-green-50 scale-105" : "border-gray-20 hover:border-ethika-green-light"}`}
                      aria-label={a.label}>
                      {a.emoji}
                    </button>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-70 block mb-1">
                    {isAr ? "اسم العرض (اختياري)" : "Display name (optional)"}
                  </label>
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={isAr ? "مثال: أم أحمد" : "e.g. Ahmed's Parent"}
                    className="w-full text-sm px-3 py-2.5 border border-gray-20 rounded-lg focus:border-ethika-green focus:outline-none bg-white text-gray-100 placeholder:text-gray-50" />
                  <p className="text-xs text-gray-50 mt-1">
                    {isAr ? "يمكنك استخدام أي اسم. لا شيء شخصي مطلوب." : "Use any name you like. Nothing personal required."}
                  </p>
                </div>
                <button onClick={completeOnboarding} disabled={!selectedAvatar}
                  className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed">
                  {isAr ? "ابدأ الاستكشاف" : "Start Exploring"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Welcome back bar */}
      {userId && (
        <div className="bg-ethika-green-50 border-b border-ethika-green/20">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-ethika-green-dark flex items-center gap-2">
              <span className="text-lg">{selectedAvatar}</span>
              <span className="font-medium">{displayName || userId}</span>
            </span>
            <span className="text-xs text-ethika-green/60 font-mono">{userId}</span>
          </div>
        </div>
      )}

      {/* Hero / Triage */}
      <section className="bg-gradient-to-b from-ethika-green-50 to-white py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-3 tracking-tight">
              {t("hero_title")}
            </h1>
            <p className="text-base sm:text-lg text-gray-60 max-w-2xl mx-auto">
              {t("hero_subtitle")}
            </p>
          </div>

          {/* Five Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRIAGE_CARDS.map((card, i) => (
              <a key={card.key} href={`/${locale}${card.href}`}
                className={`card border-l-4 rtl:border-l-0 rtl:border-r-4 p-5 ${card.color} group transition-all duration-200
                  ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="text-gray-70 group-hover:text-ethika-green transition-colors shrink-0 mt-0.5">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-100 mb-1 group-hover:text-ethika-green transition-colors">
                      {t(card.textKey)}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-60 leading-relaxed">{t(card.descKey)}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <svg className="w-4 h-4 text-gray-30 group-hover:text-ethika-green transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Age Selector */}
      {!hasStoredAges && (
        <section className="py-10 border-b border-gray-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">{t("age_title")}</h2>
            <p className="text-sm text-gray-60 mb-6">{t("age_subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {AGE_BANDS.map((age) => (
                <button key={age} onClick={() => toggleAge(age)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-150
                    ${selectedAges.includes(age)
                      ? "bg-ethika-green text-white shadow-sm"
                      : "bg-gray-10 text-gray-70 hover:bg-gray-20 border border-gray-30"
                    }`}>
                  {t(`age_${age}`)}
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={saveAges} disabled={selectedAges.length === 0}
                className="btn-primary px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed">
                {t("age_save")}
              </button>
              <button onClick={() => setHasStoredAges(true)} className="btn-ghost px-6 py-2.5">
                {t("age_skip")}
              </button>
            </div>
            {ageSaved && (
              <p className="text-sm text-ethika-green mt-4 animate-fade-in font-medium">{t("age_saved")}</p>
            )}
          </div>
        </section>
      )}

      {/* From Ethika + What's New */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="tile border-l-4 rtl:border-l-0 rtl:border-r-4 border-ethika-green">
              <div className="flex items-center gap-2 mb-3">
                <span className="voice-tag-ethika">{isAr ? "إثيكا تقول" : "Ethika says"}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-100 mb-2">{t("from_sek_position")}</h3>
              <p className="text-sm text-gray-70 leading-relaxed mb-3">{t("from_sek_position_text")}</p>
              <p className="text-xs text-gray-50">{t("from_sek_signer")}</p>
              <p className="text-xs text-gray-50">{t("from_sek_date")}</p>
              <a href={`/${locale}/from-sek`}
                className="inline-flex items-center gap-1 text-sm text-ethika-green font-medium mt-3 hover:underline">
                {isAr ? "اقرأ المزيد" : "Read more"}
                <svg className="w-3.5 h-3.5 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="tile">
              <h3 className="text-base font-semibold text-gray-100 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-ethika-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
                {t("whats_new")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-70">
                  <span className="w-1.5 h-1.5 bg-ethika-green rounded-full mt-2 shrink-0"></span>
                  {t("whats_new_item1")}
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-70">
                  <span className="w-1.5 h-1.5 bg-ethika-green rounded-full mt-2 shrink-0"></span>
                  {t("whats_new_item2")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
