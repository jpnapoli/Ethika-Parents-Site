import { setRequestLocale } from "next-intl/server";
import RightsClient from "@/components/RightsClient";

type Props = { params: Promise<{ locale: string }> };

export default async function RightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RightsClient locale={locale} />;
}
