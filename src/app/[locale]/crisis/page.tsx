import { setRequestLocale } from "next-intl/server";
import CrisisClient from "@/components/CrisisClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CrisisPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CrisisClient locale={locale} />;
}
