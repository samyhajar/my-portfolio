"use client";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { cn } from "@/lib/utils";

type CookieSettingsButtonProps = {
  label: string;
  className?: string;
};

export function CookieSettingsButton({
  label,
  className,
}: CookieSettingsButtonProps) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(className)}
    >
      {label}
    </button>
  );
}
