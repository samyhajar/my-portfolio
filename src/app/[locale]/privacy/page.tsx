import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { getLegalLocale, legalCopy } from "@/lib/legal-content";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLegalLocale(locale);
  const page = legalCopy[currentLocale].privacy;

  return {
    title: `${page.title} | Samy Hajar`,
    description: page.description,
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const currentLocale = getLegalLocale(locale);

  return (
    <LegalPage locale={currentLocale} page={legalCopy[currentLocale].privacy} />
  );
}
