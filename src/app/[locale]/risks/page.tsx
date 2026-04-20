import { setRequestLocale } from "next-intl/server";
import RisksClient from "@/components/RisksClient";

type Props = { params: Promise<{ locale: string }> };

export default async function RisksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RisksClient locale={locale} />;
}
