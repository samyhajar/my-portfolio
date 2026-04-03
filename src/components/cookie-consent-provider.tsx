"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  COOKIE_CONSENT_COOKIE_NAME,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";
import { useTranslations } from "next-intl";

type CookieConsentContextValue = {
  isReady: boolean;
  hasDecision: boolean;
  optionalCookiesAccepted: boolean;
  acceptOptional: () => void;
  rejectOptional: () => void;
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
  isReady: false,
  hasDecision: false,
  optionalCookiesAccepted: false,
  acceptOptional: () => undefined,
  rejectOptional: () => undefined,
  openPreferences: () => undefined,
});

export function CookieConsentProvider({
  initialChoice,
  children,
}: {
  initialChoice: CookieConsentChoice | null;
  children: ReactNode;
}) {
  const [choice, setChoice] = useState<CookieConsentChoice | null>(initialChoice);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(initialChoice === null);
  const t = useTranslations("CookieConsent");

  const persistChoice = (nextChoice: CookieConsentChoice) => {
    try {
      document.cookie = [
        `${COOKIE_CONSENT_COOKIE_NAME}=${nextChoice}`,
        "Path=/",
        "Max-Age=31536000",
        "SameSite=Lax",
        window.location.protocol === "https:" ? "Secure" : "",
      ]
        .filter(Boolean)
        .join("; ");
    } catch {
      // Ignore cookie write failures and still respect the in-memory choice.
    }

    setChoice(nextChoice);
    setIsPreferencesOpen(false);
  };

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      isReady: true,
      hasDecision: choice !== null,
      optionalCookiesAccepted: choice === "accepted",
      acceptOptional: () => persistChoice("accepted"),
      rejectOptional: () => persistChoice("rejected"),
      openPreferences: () => setIsPreferencesOpen(true),
    }),
    [choice],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}

      <button
        type="button"
        onClick={() => setIsPreferencesOpen(true)}
        aria-label={t("openSettings")}
        className="fixed bottom-5 right-5 z-[80] inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200/80 bg-white/95 text-neutral-700 shadow-xl shadow-neutral-300/30 backdrop-blur-xl transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-800/80 dark:bg-neutral-950/95 dark:text-neutral-200 dark:shadow-black/30 dark:hover:border-white dark:hover:text-white"
      >
        <Cookie className="h-5 w-5" />
        <span className="sr-only">{t("openSettings")}</span>
      </button>

      {choice === null || isPreferencesOpen ? (
        <div className="fixed inset-x-0 bottom-4 z-[70] px-4 sm:bottom-6 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200/80 bg-white/95 p-5 shadow-2xl shadow-neutral-300/30 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-950/95 dark:shadow-black/30 sm:p-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                {t("title")}
              </p>
              <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-300 sm:text-base">
                {t("description")}
              </p>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                {t("details")}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                size="lg"
                className="rounded-full"
                onClick={() => persistChoice("accepted")}
              >
                {t("accept")}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => persistChoice("rejected")}
              >
                {t("reject")}
              </Button>
              <Link
                href="/privacy"
                className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
              >
                {t("privacy")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}
