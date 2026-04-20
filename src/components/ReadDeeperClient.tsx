"use client";

import { useTranslations } from "next-intl";

type Props = { locale: string };

const EXPERTS = [
  { name: "Devorah Heitner", affiliation: "Author, 'Growing Up in Public'", note: { en: "The leading voice on how children navigate digital identity. Essential for parents of tweens and teens.", ar: "الصوت الرائد في كيفية تعامل الأطفال مع الهوية الرقمية. ضروري لآباء المراهقين." }, link: "https://devorahheitner.com" },
  { name: "Jonathan Haidt", affiliation: "NYU Stern, Author of 'The Anxious Generation'", note: { en: "His research on social media and youth mental health is rigorous and urgent. Start with 'The Anxious Generation.'", ar: "أبحاثه عن وسائل التواصل الاجتماعي وصحة الشباب النفسية دقيقة وعاجلة. ابدأ بكتاب 'الجيل القلق'." }, link: "https://jonathanhaidt.com" },
  { name: "Jean M. Twenge", affiliation: "San Diego State University", note: { en: "Her data on generational shifts in technology use is unmatched. 'iGen' is a must-read.", ar: "بياناتها عن التحولات الجيلية في استخدام التكنولوجيا لا مثيل لها. كتاب 'آي جين' قراءة ضرورية." }, link: "https://www.jeantwenge.com" },
  { name: "Ethan Mollick", affiliation: "Wharton, Author of 'Co-Intelligence'", note: { en: "The most balanced, practical guide to working with AI. He shows the possibilities without ignoring the risks.", ar: "الدليل الأكثر توازناً وعملية للعمل مع الذكاء الاصطناعي. يظهر الإمكانيات دون تجاهل المخاطر." }, link: "https://www.oneusefulthing.org" },
  { name: "Cynthia Breazeal", affiliation: "MIT Media Lab", note: { en: "Pioneer in social robotics and AI for children. Her work on how children form relationships with AI is foundational.", ar: "رائدة في الروبوتات الاجتماعية والذكاء الاصطناعي للأطفال. عملها في كيفية تكوين الأطفال علاقات مع الذكاء الاصطناعي أساسي." }, link: "https://www.media.mit.edu/people/cynthiab/" },
  { name: "Susan Linn", affiliation: "Boston University, Campaign for a Commercial-Free Childhood", note: { en: "Decades of advocacy for children's right to play and develop without commercial exploitation.", ar: "عقود من الدفاع عن حق الأطفال في اللعب والنمو دون استغلال تجاري." }, link: "#" },
  { name: "Shuchi Grover", affiliation: "Looking Glass Ventures", note: { en: "Leading researcher on how to teach computational thinking and AI literacy to young learners.", ar: "باحثة رائدة في كيفية تعليم التفكير الحسابي ومحو أمية الذكاء الاصطناعي للمتعلمين الصغار." }, link: "#" },
  { name: "Jason C. Yip", affiliation: "University of Washington", note: { en: "His participatory design research with children shapes how we build technology for kids.", ar: "أبحاثه في التصميم التشاركي مع الأطفال تشكل كيف نبني التكنولوجيا للأطفال." }, link: "#" },
  { name: "Catherine Steiner-Adair", affiliation: "Author, 'The Big Disconnect'", note: { en: "A clinical psychologist who bridges the gap between tech and family relationships.", ar: "عالمة نفس سريرية تربط بين التكنولوجيا والعلاقات الأسرية." }, link: "#" },
  { name: "Elizabeth Milovidov", affiliation: "Council of Europe Digital Citizenship Expert", note: { en: "International expert on children's rights in the digital age with a focus on European and international frameworks.", ar: "خبيرة دولية في حقوق الأطفال في العصر الرقمي مع تركيز على الأطر الأوروبية والدولية." }, link: "#" },
];

const ORGANIZATIONS = [
  { name: "UNICEF Policy Guidance on AI for Children", focus: { en: "Child rights framework for AI policy", ar: "إطار حقوق الطفل لسياسة الذكاء الاصطناعي" }, link: "https://www.unicef.org/globalinsight/featured-projects/ai-children" },
  { name: "Common Sense Media", focus: { en: "Age-based media reviews and digital citizenship", ar: "مراجعات الوسائط حسب العمر والمواطنة الرقمية" }, link: "https://www.commonsensemedia.org" },
  { name: "MIT RAISE", focus: { en: "AI literacy education and Day of AI initiative", ar: "تعليم محو أمية الذكاء الاصطناعي ومبادرة يوم الذكاء الاصطناعي" }, link: "https://raise.mit.edu" },
  { name: "AI Pedagogy Project (Harvard metaLAB)", focus: { en: "Teaching strategies for AI in education", ar: "استراتيجيات التدريس للذكاء الاصطناعي في التعليم" }, link: "https://aipedagogy.org" },
  { name: "CRAFT AI Literacy (Stanford)", focus: { en: "Research-based AI literacy curriculum", ar: "منهج محو أمية الذكاء الاصطناعي القائم على البحث" }, link: "#" },
  { name: "Day of AI (MIT)", focus: { en: "Free AI curriculum for K-12 students", ar: "منهج مجاني للذكاء الاصطناعي لطلاب المدارس" }, link: "https://dayofai.org" },
  { name: "MIT App Inventor", focus: { en: "Block-based programming with AI integration", ar: "برمجة بالكتل مع دمج الذكاء الاصطناعي" }, link: "https://appinventor.mit.edu" },
  { name: "AI4K12", focus: { en: "National guidelines for AI education", ar: "إرشادات وطنية لتعليم الذكاء الاصطناعي" }, link: "https://ai4k12.org" },
  { name: "Stanford Accelerator for Learning", focus: { en: "Research on AI and human learning", ar: "أبحاث عن الذكاء الاصطناعي والتعلم البشري" }, link: "#" },
  { name: "Institute for Experiential AI (Northeastern)", focus: { en: "Responsible AI research and policy", ar: "أبحاث وسياسات الذكاء الاصطناعي المسؤول" }, link: "#" },
];

const SAUDI_RESOURCES = [
  { name: "SDAIA Youth Programs", focus: { en: "Saudi national AI development programs for youth", ar: "برامج سدايا الوطنية لتطوير الذكاء الاصطناعي للشباب" }, link: "https://sdaia.gov.sa" },
  { name: "Tuwaiq Academy", focus: { en: "Tech bootcamps and training for Saudi youth", ar: "معسكرات تدريب تقنية للشباب السعودي" }, link: "https://tuwaiq.edu.sa" },
  { name: "ALLaM (Saudi LLM)", focus: { en: "Saudi Arabia's Arabic-first large language model", ar: "نموذج اللغة الكبير السعودي بالعربية أولاً" }, link: "#" },
  { name: "HUMAIN", focus: { en: "Saudi company advancing AI and data infrastructure", ar: "شركة سعودية تطور البنية التحتية للذكاء الاصطناعي والبيانات" }, link: "#" },
];

export default function ReadDeeperClient({ locale }: Props) {
  const t = useTranslations("readDeeper");
  const isAr = locale === "ar";

  return (
    <div className="animate-fade-in">
      <section className="bg-carbon-gray-10 border-b border-carbon-gray-20 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brand-navy mb-2">{t("title")}</h1>
          <p className="text-base text-carbon-gray-70">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* Experts */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-5 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            {t("experts_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPERTS.map((expert) => (
              <div key={expert.name} className="card p-5 hover:border-brand-navy transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-navy/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-navy font-semibold text-sm">
                    {expert.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-carbon-gray-100">{expert.name}</h3>
                    <p className="text-xs text-carbon-gray-60 mt-0.5">{expert.affiliation}</p>
                  </div>
                </div>
                <div className="mt-3 bg-carbon-gray-10 p-3 rounded-sm">
                  <p className="text-xs font-medium text-brand-gold mb-1">{t("why_we_recommend")}</p>
                  <p className="text-xs text-carbon-gray-70 leading-relaxed">{isAr ? expert.note.ar : expert.note.en}</p>
                </div>
                {expert.link !== "#" && (
                  <a href={expert.link} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 text-xs font-medium text-brand-navy mt-3 hover:underline">
                    {t("visit")} &rarr;
                  </a>
                )}
                <div className="mt-2">
                  <span className="voice-tag-curates text-xs">{isAr ? "إثيكا تختار" : "Ethika curates"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-5 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            {t("orgs_title")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-carbon-gray-10">
                  <th className="text-left rtl:text-right p-3 font-semibold text-carbon-gray-100 border-b-2 border-carbon-gray-30">{isAr ? "الاسم" : "Name"}</th>
                  <th className="text-left rtl:text-right p-3 font-semibold text-carbon-gray-100 border-b-2 border-carbon-gray-30">{t("focus")}</th>
                  <th className="text-left rtl:text-right p-3 font-semibold text-carbon-gray-100 border-b-2 border-carbon-gray-30">{isAr ? "رابط" : "Link"}</th>
                </tr>
              </thead>
              <tbody>
                {ORGANIZATIONS.map((org) => (
                  <tr key={org.name} className="border-b border-carbon-gray-20 hover:bg-carbon-gray-10 transition-colors">
                    <td className="p-3 font-medium text-carbon-gray-100">{org.name}</td>
                    <td className="p-3 text-carbon-gray-70">{isAr ? org.focus.ar : org.focus.en}</td>
                    <td className="p-3">
                      {org.link !== "#" ? (
                        <a href={org.link} target="_blank" rel="noopener noreferrer" className="text-brand-navy hover:underline text-xs">
                          {t("visit")} &rarr;
                        </a>
                      ) : <span className="text-carbon-gray-50 text-xs">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Saudi Resources */}
        <section>
          <h2 className="text-xl font-semibold text-brand-navy mb-5 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            {t("saudi_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAUDI_RESOURCES.map((res) => (
              <div key={res.name} className="card p-4">
                <h3 className="text-sm font-semibold text-carbon-gray-100">{res.name}</h3>
                <p className="text-xs text-carbon-gray-60 mt-1">{isAr ? res.focus.ar : res.focus.en}</p>
                {res.link !== "#" && (
                  <a href={res.link} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 text-xs font-medium text-brand-navy mt-2 hover:underline">
                    {t("visit")} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Islamic Perspective */}
        <section className="tile border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-gold">
          <h2 className="text-lg font-semibold text-brand-navy mb-2">{t("islamic_title")}</h2>
          <p className="text-sm text-carbon-gray-70 mb-2">{t("islamic_desc")}</p>
          <p className="text-xs text-carbon-gray-60 italic">{t("islamic_note")}</p>
        </section>
      </div>
    </div>
  );
}
