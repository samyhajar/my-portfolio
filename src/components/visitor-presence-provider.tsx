"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import {
  getBrowserPusherClient,
  hasPublicPusherConfig,
  teardownBrowserPusherClient,
} from "@/lib/pusher-client";
import { VISITOR_PRESENCE_CHANNEL } from "@/lib/visitor-counter";

type VisitorCountStatus = "idle" | "connected" | "error";

type VisitorPresenceContextValue = {
  count: number | null;
  status: VisitorCountStatus;
};

function getPresenceMemberCount(channel: unknown) {
  if (
    typeof channel === "object" &&
    channel !== null &&
    "members" in channel &&
    typeof channel.members === "object" &&
    channel.members !== null &&
    "count" in channel.members &&
    typeof channel.members.count === "number"
  ) {
    return channel.members.count;
  }

  return null;
}

const VisitorPresenceContext = createContext<VisitorPresenceContextValue>({
  count: null,
  status: "idle",
});

export function VisitorPresenceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { optionalCookiesAccepted } = useCookieConsent();
  const [liveVisitorCount, setLiveVisitorCount] = useState<VisitorPresenceContextValue>({
    count: null,
    status: "idle",
  });
  const hasLoggedConfigWarning = useRef(false);

  useEffect(() => {
    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    if (!optionalCookiesAccepted) {
      return;
    }

    if (!hasPublicPusherConfig()) {
      if (
        process.env.NODE_ENV === "development" &&
        !hasLoggedConfigWarning.current
      ) {
        console.warn(
          "Live visitor counter is disabled because the public Pusher env vars are missing.",
        );
        hasLoggedConfigWarning.current = true;
      }

      return;
    }

    const setupPresence = async () => {
      const pusher = await getBrowserPusherClient();

      if (!pusher || isCancelled) {
        return;
      }

      const channel = pusher.subscribe(VISITOR_PRESENCE_CHANNEL);

      const syncVisitorCount = () => {
        const nextCount = getPresenceMemberCount(channel);

        setLiveVisitorCount({
          count: nextCount,
          status: nextCount === null ? "idle" : "connected",
        });
      };

      const handleSubscriptionSucceeded = (members: { count?: number }) => {
        setLiveVisitorCount({
          count: typeof members.count === "number" ? members.count : null,
          status: "connected",
        });
      };

      const handleSubscriptionError = () => {
        setLiveVisitorCount({
          count: null,
          status: "error",
        });
      };

      const handleConnectionError = () => {
        setLiveVisitorCount({
          count: null,
          status: "error",
        });
      };

      channel.bind("pusher:subscription_succeeded", handleSubscriptionSucceeded);
      channel.bind("pusher:subscription_error", handleSubscriptionError);
      channel.bind("pusher:member_added", syncVisitorCount);
      channel.bind("pusher:member_removed", syncVisitorCount);
      pusher.connection.bind("error", handleConnectionError);

      cleanup = () => {
        channel.unbind("pusher:subscription_succeeded", handleSubscriptionSucceeded);
        channel.unbind("pusher:subscription_error", handleSubscriptionError);
        channel.unbind("pusher:member_added", syncVisitorCount);
        channel.unbind("pusher:member_removed", syncVisitorCount);
        pusher.connection.unbind("error", handleConnectionError);
        pusher.unsubscribe(VISITOR_PRESENCE_CHANNEL);
        teardownBrowserPusherClient();
      };
    };

    void setupPresence();

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, [optionalCookiesAccepted]);

  const visitorCount = optionalCookiesAccepted
    ? liveVisitorCount
    : {
        count: null,
        status: "idle" as const,
      };

  return (
    <VisitorPresenceContext.Provider value={visitorCount}>
      {children}
    </VisitorPresenceContext.Provider>
  );
}

export function useVisitorCount() {
  return useContext(VisitorPresenceContext);
}
