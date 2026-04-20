import { setRequestLocale } from "next-intl/server";
import ReadDeeperClient from "@/components/ReadDeeperClient";

type Props = { params: Promise<{ locale: string }> };

export default async function ReadDeeperPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReadDeeperClient locale={locale} />;
}
