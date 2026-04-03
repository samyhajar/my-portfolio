import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { getLegalLocale, legalCopy } from "@/lib/legal-content";

type ImprintPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ImprintPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLegalLocale(locale);
  const page = legalCopy[currentLocale].imprint;

  return {
    title: `${page.title} | Samy Hajar`,
    description: page.description,
  };
}

export default async function ImprintPage({ params }: ImprintPageProps) {
  const { locale } = await params;
  const currentLocale = getLegalLocale(locale);

  return (
    <LegalPage locale={currentLocale} page={legalCopy[currentLocale].imprint} />
  );
}
