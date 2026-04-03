"use client";

import { Badge } from "@/components/ui/badge";
import { useCookieConsent } from "@/components/cookie-consent-provider";
import { useVisitorCount } from "@/components/visitor-presence-provider";
import { hasPublicPusherConfig } from "@/lib/pusher-client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type LiveVisitorCounterProps = {
  variant?: "hero" | "header";
};

export function LiveVisitorCounter({
  variant = "hero",
}: LiveVisitorCounterProps) {
  const heroT = useTranslations("Hero.liveVisitors");
  const navigationT = useTranslations("Navigation.liveVisitors");
  const t = variant === "header" ? navigationT : heroT;
  const { optionalCookiesAccepted } = useCookieConsent();
  const { count, status } = useVisitorCount();

  if (!hasPublicPusherConfig() || !optionalCookiesAccepted) {
    return null;
  }

  let message = t("loading");
  let compactMessage = "…";

  if (status === "error") {
    message = t("unavailable");
    compactMessage = "!";
  } else if (count !== null) {
    message = t("count", { count });
    compactMessage = String(count);
  }

  return (
    <div
      className={cn(
        "flex",
        variant === "hero" ? "mt-6 justify-center" : "justify-start",
      )}
      aria-live="polite"
    >
      <Badge
        variant="outline"
        aria-label={message}
        className={cn(
          "rounded-full border-neutral-300/70 bg-white/80 text-neutral-700 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-200",
          variant === "hero"
            ? "gap-3 px-4 py-2 text-xs"
            : "gap-2 px-3 py-1.5 text-[11px]",
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        {variant === "hero" ? (
          <>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
              {t("label")}
            </span>
            <span className="text-sm font-medium tracking-tight text-neutral-900 dark:text-white">
              {message}
            </span>
          </>
        ) : (
          <span className="text-xs font-semibold tracking-tight text-neutral-900 dark:text-white">
            {compactMessage}
          </span>
        )}
      </Badge>
    </div>
  );
}
