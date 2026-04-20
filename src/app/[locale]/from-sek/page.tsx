import { setRequestLocale } from "next-intl/server";
import FromSekClient from "@/components/FromSekClient";

type Props = { params: Promise<{ locale: string }> };

export default async function FromSekPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FromSekClient locale={locale} />;
}
