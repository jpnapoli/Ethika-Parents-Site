"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

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
  {
    title: { en: "Draw and Sort with AI", ar: "ارسم وصنّف مع الذكاء الاصطناعي" },
    need: { en: "A computer or tablet, Google Quick Draw!", ar: "حاسوب أو جهاز لوحي، Google Quick, Draw!" },
    duration: 20,
    say: { en: "Let's play a game where you draw something and a computer tries to guess what it is! Do you think a computer can guess better than me?", ar: "هيا نلعب لعبة ترسم فيها شيئاً والحاسوب يحاول تخمينه! هل تظن أن الحاسوب يخمّن أفضل مني؟" },
    notice: { en: "Watch how your child reacts when the AI guesses right vs wrong. Notice if they start drawing differently to 'help' the AI.", ar: "راقب ردة فعل طفلك عندما يخمّن الذكاء الاصطناعي بشكل صحيح أو خاطئ. لاحظ إذا بدأ يرسم بشكل مختلف 'لمساعدة' الذكاء الاصطناعي." },
    after: { en: "Ask: 'How do you think the computer knew what you were drawing? Can it think like you?' This opens a conversation about pattern recognition vs understanding.", ar: "اسأل: 'كيف تظن أن الحاسوب عرف ما كنت ترسمه؟ هل يستطيع التفكير مثلك؟' هذا يفتح حواراً عن التعرف على الأنماط مقابل الفهم." },
  },
  {
    title: { en: "Teach a Machine to See", ar: "علّم الآلة أن ترى" },
    need: { en: "A computer with webcam, Google Teachable Machine", ar: "حاسوب بكاميرا، Google Teachable Machine" },
    duration: 30,
    say: { en: "Today you're going to be the teacher! You'll teach a computer to recognize things — like whether you're smiling or frowning.", ar: "اليوم ستكون أنت المعلم! ستعلّم الحاسوب التعرف على الأشياء — مثل هل أنت تبتسم أو عابس." },
    notice: { en: "Does your child understand they're providing examples? Do they try creative combinations?", ar: "هل يفهم طفلك أنه يقدم أمثلة؟ هل يحاول تركيبات إبداعية؟" },
    after: { en: "Ask: 'What happened when you only showed a few examples? What if you showed many? This is how AI learns — from lots of examples.'", ar: "اسأل: 'ماذا حدث عندما أريته أمثلة قليلة فقط؟ ماذا لو أريته الكثير؟ هكذا يتعلم الذكاء الاصطناعي — من أمثلة كثيرة.'" },
  },
  {
    title: { en: "Spot the AI Art", ar: "اكتشف فن الذكاء الاصطناعي" },
    need: { en: "Printed or screen images — mix of AI-generated and real photos", ar: "صور مطبوعة أو على الشاشة — مزيج من صور مولدة بالذكاء الاصطناعي وصور حقيقية" },
    duration: 15,
    say: { en: "Some of these pictures were made by a computer and some were taken by a real photographer. Can you guess which is which?", ar: "بعض هذه الصور صنعها حاسوب وبعضها التقطها مصور حقيقي. هل تستطيع تخمين أيهما أيهما؟" },
    notice: { en: "What details does your child focus on? Do they develop strategies for telling the difference?", ar: "ما التفاصيل التي يركز عليها طفلك؟ هل يطور استراتيجيات للتمييز بينها؟" },
    after: { en: "Talk about how AI can make fake things that look real. Keep it light: 'That's why we always check if something is real before we share it.'", ar: "تحدث عن كيف يمكن للذكاء الاصطناعي صنع أشياء مزيفة تبدو حقيقية. اجعلها خفيفة: 'لهذا نتأكد دائماً إذا كان شيء حقيقياً قبل مشاركته.'" },
  },
];

const ACTIVITIES_10_13 = [
  {
    title: { en: "Fact-Check the AI", ar: "تحقق من حقائق الذكاء الاصطناعي" },
    need: { en: "Access to ChatGPT or similar (parent-supervised), a search engine", ar: "وصول إلى ChatGPT أو مشابه (بإشراف الوالدين)، محرك بحث" },
    duration: 30,
    say: { en: "Let's ask the AI some questions you already know the answers to — and some you don't. Then let's check if it got them right.", ar: "هيا نسأل الذكاء الاصطناعي أسئلة تعرف أنت إجاباتها — وبعضاً لا تعرفه. ثم لنتحقق هل أجاب بشكل صحيح." },
    notice: { en: "Does your child trust the AI answers automatically? Do they learn to verify?", ar: "هل يثق طفلك بإجابات الذكاء الاصطناعي تلقائياً؟ هل يتعلم التحقق؟" },
    after: { en: "Discuss: 'The AI was confident even when wrong. What does that teach us about trusting AI — or anything online?'", ar: "ناقش: 'كان الذكاء الاصطناعي واثقاً حتى عندما أخطأ. ماذا يعلمنا هذا عن الثقة بالذكاء الاصطناعي — أو أي شيء على الإنترنت؟'" },
  },
  {
    title: { en: "Build an AI Bias Detector", ar: "ابنِ كاشف تحيز الذكاء الاصطناعي" },
    need: { en: "A notebook, access to an image generation AI (parent-supervised)", ar: "دفتر ملاحظات، وصول إلى ذكاء اصطناعي لتوليد الصور (بإشراف الوالدين)" },
    duration: 30,
    say: { en: "Let's ask the AI to draw different types of people — a doctor, a nurse, a CEO, a teacher. Let's see what it assumes.", ar: "هيا نطلب من الذكاء الاصطناعي رسم أنواع مختلفة من الناس — طبيب، ممرضة، مدير تنفيذي، معلم. لنرى ماذا يفترض." },
    notice: { en: "Does the AI default to certain genders, races, or ages for certain professions? Does your child notice?", ar: "هل يفترض الذكاء الاصطناعي جنساً أو عرقاً أو عمراً معيناً لمهن معينة؟ هل يلاحظ طفلك؟" },
    after: { en: "Talk about where bias comes from: 'AI learns from data made by humans. If the data has bias, the AI has bias too.'", ar: "تحدث عن مصدر التحيز: 'الذكاء الاصطناعي يتعلم من بيانات صنعها البشر. إذا كانت البيانات متحيزة، يكون الذكاء الاصطناعي متحيزاً أيضاً.'" },
  },
  {
    title: { en: "AI Privacy Audit", ar: "تدقيق خصوصية الذكاء الاصطناعي" },
    need: { en: "Your child's phone or tablet (with their permission)", ar: "هاتف أو جهاز طفلك اللوحي (بإذنه)" },
    duration: 25,
    say: { en: "Let's look at what apps on your phone use AI and what data they collect. We'll check the privacy settings together.", ar: "هيا ننظر أي تطبيقات على هاتفك تستخدم الذكاء الاصطناعي وما البيانات التي تجمعها. سنفحص إعدادات الخصوصية معاً." },
    notice: { en: "Is your child surprised by what data apps collect? Do they understand what 'permissions' mean?", ar: "هل يتفاجأ طفلك مما تجمعه التطبيقات؟ هل يفهم ماذا تعني 'الأذونات'؟" },
    after: { en: "Together, decide which permissions to revoke. Explain: 'You have the right to say no to data collection — Saudi law supports this.'", ar: "معاً، قرروا أي أذونات تسحبونها. اشرح: 'لك الحق في رفض جمع البيانات — القانون السعودي يدعم هذا.'" },
  },
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
      <section className="bg-amber-50 border-b border-amber-200 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brand-navy mb-2">{t("title")}</h1>
          <p className="text-base text-carbon-gray-70">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Age Tab */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("6_9")}
            className={`px-5 py-2.5 text-sm font-medium transition-all duration-150
              ${activeTab === "6_9" ? "bg-brand-navy text-white" : "bg-carbon-gray-10 text-carbon-gray-70 hover:bg-carbon-gray-20"}`}
          >
            {t("age_6_9_title")}
          </button>
          <button
            onClick={() => setActiveTab("10_13")}
            className={`px-5 py-2.5 text-sm font-medium transition-all duration-150
              ${activeTab === "10_13" ? "bg-brand-navy text-white" : "bg-carbon-gray-10 text-carbon-gray-70 hover:bg-carbon-gray-20"}`}
          >
            {t("age_10_13_title")}
          </button>
        </div>

        {/* Dev Note */}
        <div className="tile border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-gold mb-8">
          <h3 className="text-sm font-semibold text-brand-gold mb-2">{t("dev_note")}</h3>
          <p className="text-sm text-carbon-gray-70 leading-relaxed">
            {activeTab === "6_9" ? t("age_6_9_dev") : t("age_10_13_dev")}
          </p>
        </div>

        {/* Activities */}
        <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          {t("activities_title")}
        </h2>
        <div className="space-y-5 mb-10">
          {activities.map((act, i) => (
            <div key={i} className="card p-5">
              <h3 className="text-base font-semibold text-carbon-gray-100 mb-4">
                {isAr ? act.title.ar : act.title.en}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-carbon-gray-100">{t("what_need")}: </span>
                  <span className="text-carbon-gray-70">{isAr ? act.need.ar : act.need.en}</span>
                </div>
                <div>
                  <span className="font-medium text-carbon-gray-100">{t("how_long")}: </span>
                  <span className="text-carbon-gray-70">{t("minutes", { count: act.duration })}</span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="bg-blue-50 p-3 rounded-sm">
                  <span className="text-xs font-semibold text-brand-navy block mb-1">{t("what_say")}</span>
                  <p className="text-sm text-carbon-gray-70 italic">&ldquo;{isAr ? act.say.ar : act.say.en}&rdquo;</p>
                </div>
                <div className="bg-carbon-gray-10 p-3 rounded-sm">
                  <span className="text-xs font-semibold text-carbon-gray-100 block mb-1">{t("what_notice")}</span>
                  <p className="text-sm text-carbon-gray-70">{isAr ? act.notice.ar : act.notice.en}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-sm">
                  <span className="text-xs font-semibold text-brand-green block mb-1">{t("what_after")}</span>
                  <p className="text-sm text-carbon-gray-70">{isAr ? act.after.ar : act.after.en}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1.25 1.25 0 014.25 17.25V6.75a1.25 1.25 0 011.786-1.1l5.384 3.18a.75.75 0 010 1.34zm0 0l5.384 3.18A1.25 1.25 0 0018.59 17.25V6.75a1.25 1.25 0 00-1.786-1.1l-5.384 3.18" />
          </svg>
          {t("tools_title")}
        </h2>
        <div className="space-y-3 mb-10">
          {tools.map((tool) => (
            <div key={tool.name} className="card p-4">
              {(tool as any).ageWarning && (
                <div className="bg-amber-50 border border-amber-300 text-amber-800 text-xs p-2 mb-3 rounded-sm">
                  {t("age_warning", { min: tool.minAge })}
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-carbon-gray-100">{tool.name}</h3>
                  <p className="text-xs text-carbon-gray-60 mt-1">{tool.privacy}</p>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs px-3 py-1.5 flex-shrink-0 border border-carbon-gray-30"
                >
                  {isAr ? "زيارة" : "Visit"} &rarr;
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${tool.free ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {tool.free ? t("free") : t("paid")}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${tool.ksa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {tool.ksa ? t("ksa_yes") : t("ksa_no")}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${tool.arabic ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                  {tool.arabic ? t("arabic_yes") : t("arabic_no")}
                </span>
                {tool.minAge > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {t("min_age", { age: tool.minAge })}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Family Agreement */}
        <div className="tile border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-green">
          <h2 className="text-lg font-semibold text-brand-navy mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {t("agreement_title")}
          </h2>
          <p className="text-sm text-carbon-gray-70 mb-3">{t("agreement_desc")}</p>
          <button className="btn-primary text-sm px-5 py-2.5 bg-brand-green hover:bg-brand-green-light">
            {t("agreement_download")}
          </button>
        </div>
      </div>
    </div>
  );
}
