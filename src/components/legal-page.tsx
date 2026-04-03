import type { ReactNode } from "react";

import {
  LEGAL_UPDATED_AT,
  type LegalLocale,
  type LegalPageCopy,
} from "@/lib/legal-content";

type LegalPageProps = {
  locale: LegalLocale;
  page: LegalPageCopy;
  actions?: ReactNode;
};

export function LegalPage({ locale, page, actions }: LegalPageProps) {
  const updatedAt = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${LEGAL_UPDATED_AT}T00:00:00`));

  return (
    <main className="min-h-screen px-4 py-28 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-[2rem] border border-neutral-200/80 bg-white/85 px-6 py-8 shadow-xl shadow-neutral-200/30 backdrop-blur-sm dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:shadow-black/20 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
                {page.eyebrow}
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
                {page.title}
              </h1>
              <p className="max-w-3xl text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
                {page.description}
              </p>
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {page.lastUpdatedLabel}: {updatedAt}
            </p>
          </div>

          {actions ? <div className="mt-6">{actions}</div> : null}
        </header>

        <div className="grid gap-6">
          {page.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-neutral-200/80 bg-white/85 px-6 py-7 shadow-lg shadow-neutral-200/20 backdrop-blur-sm dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:shadow-black/20 sm:px-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {section.title}
              </h2>

              {section.paragraphs?.length ? (
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-neutral-700 dark:text-neutral-300 sm:text-[0.98rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.bullets?.length ? (
                <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-[0.98rem]">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.links?.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {section.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
