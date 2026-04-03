import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { Link } from "@/i18n/routing";
import { legalOwner } from "@/lib/legal-content";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/70 bg-white/70 backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Samy Hajar
            </h3>
            <p className="max-w-sm text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              {t("about")}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {legalOwner.city}, {legalOwner.country}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t("explore")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {t("resume")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/imprint"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <CookieSettingsButton
                  label={t("cookieSettings")}
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                />
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t("connect")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={legalOwner.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={legalOwner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${legalOwner.email}`}
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/70 pt-8 text-center text-sm text-neutral-600 dark:border-neutral-800/70 dark:text-neutral-400">
          <p>
            © {currentYear} Samy Hajar. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
