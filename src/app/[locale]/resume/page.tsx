import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

const resumePath = "/SamyHajar_resume_2025_Deutsch.pdf";

export default async function ResumePage() {
  const t = await getTranslations("Resume");

  return (
    <main className="min-h-screen px-4 py-28 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
            {t("eyebrow")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
                {t("title")}
              </h1>
              <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
                {t("description")}
              </p>
            </div>

            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href={resumePath} target="_blank" rel="noopener noreferrer">
                {t("openPdf")}
              </a>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
          <object
            data={`${resumePath}#toolbar=0&navpanes=0&scrollbar=1`}
            type="application/pdf"
            className="h-[78vh] w-full"
          >
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
              <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
                {t("fallback")}
              </p>
              <Button asChild size="lg" className="rounded-full">
                <a href={resumePath} target="_blank" rel="noopener noreferrer">
                  {t("openPdf")}
                </a>
              </Button>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
