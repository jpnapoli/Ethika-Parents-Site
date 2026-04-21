"use client";

import { useTranslations } from "next-intl";
import { Book, Building, Globe } from "@carbon/icons-react";

type Props = { locale: string };

const EXPERTS = [
  { name: "Devorah Heitner", affiliation: "Author, 'Growing Up in Public'", note: { en: "The leading voice on how children navigate digital identity. Essential for parents of tweens and teens.", ar: "\u0627\u0644\u0635\u0648\u062A \u0627\u0644\u0631\u0627\u0626\u062F \u0641\u064A \u0643\u064A\u0641\u064A\u0629 \u062A\u0639\u0627\u0645\u0644 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0645\u0639 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629." }, link: "https://devorahheitner.com" },
  { name: "Jonathan Haidt", affiliation: "NYU Stern, Author of 'The Anxious Generation'", note: { en: "His research on social media and youth mental health is rigorous and urgent.", ar: "\u0623\u0628\u062D\u0627\u062B\u0647 \u0639\u0646 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0648\u0635\u062D\u0629 \u0627\u0644\u0634\u0628\u0627\u0628 \u0627\u0644\u0646\u0641\u0633\u064A\u0629 \u062F\u0642\u064A\u0642\u0629 \u0648\u0639\u0627\u062C\u0644\u0629." }, link: "https://jonathanhaidt.com" },
  { name: "Jean M. Twenge", affiliation: "San Diego State University", note: { en: "Her data on generational shifts in technology use is unmatched.", ar: "\u0628\u064A\u0627\u0646\u0627\u062A\u0647\u0627 \u0639\u0646 \u0627\u0644\u062A\u062D\u0648\u0644\u0627\u062A \u0627\u0644\u062C\u064A\u0644\u064A\u0629 \u0644\u0627 \u0645\u062B\u064A\u0644 \u0644\u0647\u0627." }, link: "https://www.jeantwenge.com" },
  { name: "Ethan Mollick", affiliation: "Wharton, Author of 'Co-Intelligence'", note: { en: "The most balanced, practical guide to working with AI.", ar: "\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0648\u0627\u0632\u0646\u0627\u064B \u0648\u0639\u0645\u0644\u064A\u0629 \u0644\u0644\u0639\u0645\u0644 \u0645\u0639 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A." }, link: "https://www.oneusefulthing.org" },
  { name: "Cynthia Breazeal", affiliation: "MIT Media Lab", note: { en: "Pioneer in social robotics and AI for children.", ar: "\u0631\u0627\u0626\u062F\u0629 \u0641\u064A \u0627\u0644\u0631\u0648\u0628\u0648\u062A\u0627\u062A \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u0644\u0623\u0637\u0641\u0627\u0644." }, link: "https://www.media.mit.edu/people/cynthiab/" },
  { name: "Susan Linn", affiliation: "Boston University", note: { en: "Decades of advocacy for children's right to play without exploitation.", ar: "\u0639\u0642\u0648\u062F \u0645\u0646 \u0627\u0644\u062F\u0641\u0627\u0639 \u0639\u0646 \u062D\u0642 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0641\u064A \u0627\u0644\u0644\u0639\u0628 \u062F\u0648\u0646 \u0627\u0633\u062A\u063A\u0644\u0627\u0644." }, link: "#" },
  { name: "Shuchi Grover", affiliation: "Looking Glass Ventures", note: { en: "Leading researcher on teaching AI literacy to young learners.", ar: "\u0628\u0627\u062D\u062B\u0629 \u0631\u0627\u0626\u062F\u0629 \u0641\u064A \u062A\u0639\u0644\u064A\u0645 \u0645\u062D\u0648 \u0623\u0645\u064A\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A." }, link: "#" },
  { name: "Jason C. Yip", affiliation: "University of Washington", note: { en: "His participatory design research with children shapes tech for kids.", ar: "\u0623\u0628\u062D\u0627\u062B\u0647 \u0641\u064A \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u062A\u0634\u0627\u0631\u0643\u064A \u0645\u0639 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u062A\u0634\u0643\u0644 \u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0644\u0644\u0623\u0637\u0641\u0627\u0644." }, link: "#" },
  { name: "Catherine Steiner-Adair", affiliation: "Author, 'The Big Disconnect'", note: { en: "A clinical psychologist bridging tech and family relationships.", ar: "\u0639\u0627\u0644\u0645\u0629 \u0646\u0641\u0633 \u0633\u0631\u064A\u0631\u064A\u0629 \u062A\u0631\u0628\u0637 \u0628\u064A\u0646 \u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0648\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u0623\u0633\u0631\u064A\u0629." }, link: "#" },
  { name: "Elizabeth Milovidov", affiliation: "Council of Europe Expert", note: { en: "International expert on children's rights in the digital age.", ar: "\u062E\u0628\u064A\u0631\u0629 \u062F\u0648\u0644\u064A\u0629 \u0641\u064A \u062D\u0642\u0648\u0642 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0641\u064A \u0627\u0644\u0639\u0635\u0631 \u0627\u0644\u0631\u0642\u0645\u064A." }, link: "#" },
];

const ORGANIZATIONS = [
  { name: "UNICEF AI for Children", focus: { en: "Child rights framework for AI policy", ar: "\u0625\u0637\u0627\u0631 \u062D\u0642\u0648\u0642 \u0627\u0644\u0637\u0641\u0644 \u0644\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, link: "https://www.unicef.org/globalinsight/featured-projects/ai-children" },
  { name: "Common Sense Media", focus: { en: "Age-based media reviews and digital citizenship", ar: "\u0645\u0631\u0627\u062C\u0639\u0627\u062A \u0627\u0644\u0648\u0633\u0627\u0626\u0637 \u062D\u0633\u0628 \u0627\u0644\u0639\u0645\u0631" }, link: "https://www.commonsensemedia.org" },
  { name: "MIT RAISE", focus: { en: "AI literacy education and Day of AI initiative", ar: "\u062A\u0639\u0644\u064A\u0645 \u0645\u062D\u0648 \u0623\u0645\u064A\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, link: "https://raise.mit.edu" },
  { name: "AI4K12", focus: { en: "National guidelines for AI education", ar: "\u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0648\u0637\u0646\u064A\u0629 \u0644\u062A\u0639\u0644\u064A\u0645 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, link: "https://ai4k12.org" },
];

const SAUDI_RESOURCES = [
  { name: "SDAIA Youth Programs", focus: { en: "Saudi national AI programs for youth", ar: "\u0628\u0631\u0627\u0645\u062C \u0633\u062F\u0627\u064A\u0627 \u0627\u0644\u0648\u0637\u0646\u064A\u0629 \u0644\u0644\u0634\u0628\u0627\u0628" }, link: "https://sdaia.gov.sa" },
  { name: "Tuwaiq Academy", focus: { en: "Tech bootcamps for Saudi youth", ar: "\u0645\u0639\u0633\u0643\u0631\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0634\u0628\u0627\u0628 \u0627\u0644\u0633\u0639\u0648\u062F\u064A" }, link: "https://tuwaiq.edu.sa" },
  { name: "ALLaM", focus: { en: "Saudi Arabic-first large language model", ar: "\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0643\u0628\u064A\u0631 \u0627\u0644\u0633\u0639\u0648\u062F\u064A" }, link: "#" },
  { name: "HUMAIN", focus: { en: "Saudi AI and data infrastructure company", ar: "\u0634\u0631\u0643\u0629 \u0633\u0639\u0648\u062F\u064A\u0629 \u0644\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }, link: "#" },
];

export default function ReadDeeperClient({ locale }: Props) {
  const t = useTranslations("readDeeper");
  const isAr = locale === "ar";

  return (
    <div className="animate-fade-in">
      <div className="bg-blue-50 border-b border-blue-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800 mb-1">{t("title")}</h1>
          <p className="text-sm text-neutral-600">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Experts */}
        <section>
          <h2 className="text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <Book size={20} className="text-blue-600" />
            {t("experts_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXPERTS.map((expert) => (
              <div key={expert.name} className="bg-white rounded-2xl border border-neutral-200 p-4 hover:border-blue-200 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 text-blue-700 font-bold text-xs">
                    {expert.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-neutral-800">{expert.name}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{expert.affiliation}</p>
                  </div>
                </div>
                <div className="mt-3 bg-neutral-50 p-3 rounded-xl">
                  <p className="text-[11px] font-semibold text-amber-600 mb-1">{t("why_we_recommend")}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{isAr ? expert.note.ar : expert.note.en}</p>
                </div>
                {expert.link !== "#" && (
                  <a href={expert.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ethika-green mt-3 hover:underline">
                    {t("visit")} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Organizations */}
        <section>
          <h2 className="text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <Building size={20} className="text-blue-600" />
            {t("orgs_title")}
          </h2>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left rtl:text-right p-3 font-semibold text-neutral-700 text-xs">{isAr ? "\u0627\u0644\u0627\u0633\u0645" : "Name"}</th>
                  <th className="text-left rtl:text-right p-3 font-semibold text-neutral-700 text-xs">{t("focus")}</th>
                  <th className="text-left rtl:text-right p-3 font-semibold text-neutral-700 text-xs">{isAr ? "\u0631\u0627\u0628\u0637" : "Link"}</th>
                </tr>
              </thead>
              <tbody>
                {ORGANIZATIONS.map((org) => (
                  <tr key={org.name} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="p-3 font-medium text-neutral-800 text-xs">{org.name}</td>
                    <td className="p-3 text-neutral-600 text-xs">{isAr ? org.focus.ar : org.focus.en}</td>
                    <td className="p-3">
                      {org.link !== "#" ? (
                        <a href={org.link} target="_blank" rel="noopener noreferrer" className="text-ethika-green hover:underline text-xs font-medium">{t("visit")} &rarr;</a>
                      ) : <span className="text-neutral-300 text-xs">&mdash;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Saudi Resources */}
        <section>
          <h2 className="text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-emerald-600" />
            {t("saudi_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAUDI_RESOURCES.map((res) => (
              <div key={res.name} className="bg-white rounded-2xl border border-neutral-200 p-4">
                <h3 className="text-sm font-semibold text-neutral-800">{res.name}</h3>
                <p className="text-xs text-neutral-500 mt-1">{isAr ? res.focus.ar : res.focus.en}</p>
                {res.link !== "#" && (
                  <a href={res.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ethika-green mt-2 hover:underline">{t("visit")} &rarr;</a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Islamic Perspective */}
        <section className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
          <h2 className="text-base font-bold text-neutral-800 mb-2">{t("islamic_title")}</h2>
          <p className="text-sm text-neutral-600 mb-2">{t("islamic_desc")}</p>
          <p className="text-xs text-neutral-500 italic">{t("islamic_note")}</p>
        </section>
      </div>
    </div>
  );
}
