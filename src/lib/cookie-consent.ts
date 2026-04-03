export type CookieConsentChoice = "accepted" | "rejected";

export const COOKIE_CONSENT_COOKIE_NAME = "portfolio_cookie_consent";

export function isCookieConsentChoice(
  value: string | undefined | null,
): value is CookieConsentChoice {
  return value === "accepted" || value === "rejected";
}
