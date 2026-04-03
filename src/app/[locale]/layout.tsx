import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CookieConsentProvider } from "@/components/cookie-consent-provider";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { VisitorPresenceProvider } from "@/components/visitor-presence-provider";
import {
  COOKIE_CONSENT_COOKIE_NAME,
  isCookieConsentChoice,
} from "@/lib/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import { GlobalSidebars } from "@/components/global-sidebars";

const haloHandletter = localFont({
  src: "../../../public/fonts/HaloHandletter.otf",
  variable: "--font-halo-handletter",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const cookieStore = await cookies();
  const consentCookie = cookieStore.get(COOKIE_CONSENT_COOKIE_NAME)?.value;
  const initialConsent = isCookieConsentChoice(consentCookie)
    ? consentCookie
    : null;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${haloHandletter.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CookieConsentProvider initialChoice={initialConsent}>
              <VisitorPresenceProvider>
                {/* Global Background */}
                <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
                  <div className="absolute right-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-transparent via-cyan-100/30 to-transparent dark:via-neutral-900/10" />
                </div>

                <GlobalSidebars />

                <SmoothScroll>
                  <Navigation />
                  <div>{children}</div>
                  <Footer />
                </SmoothScroll>
              </VisitorPresenceProvider>
            </CookieConsentProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
