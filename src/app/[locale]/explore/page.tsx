import { setRequestLocale } from "next-intl/server";
import ExploreClient from "@/components/ExploreClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ExplorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ExploreClient locale={locale} />;
}
