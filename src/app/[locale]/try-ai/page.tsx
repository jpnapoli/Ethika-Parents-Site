import { setRequestLocale } from "next-intl/server";
import TryAiClient from "@/components/TryAiClient";

type Props = { params: Promise<{ locale: string }> };

export default async function TryAiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TryAiClient locale={locale} />;
}
