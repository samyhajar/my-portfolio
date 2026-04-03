"use client";

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

type BrowserPusherClient = import("pusher-js").default;

let browserPusherClient: BrowserPusherClient | null = null;
let browserPusherModulePromise: Promise<typeof import("pusher-js")> | null = null;

export function hasPublicPusherConfig() {
  return Boolean(PUSHER_KEY && PUSHER_CLUSTER);
}

export async function getBrowserPusherClient() {
  if (typeof window === "undefined" || !hasPublicPusherConfig()) {
    return null;
  }

  if (!browserPusherModulePromise) {
    browserPusherModulePromise = import("pusher-js");
  }

  if (!browserPusherClient) {
    const { default: Pusher } = await browserPusherModulePromise;

    browserPusherClient = new Pusher(PUSHER_KEY!, {
      cluster: PUSHER_CLUSTER!,
      forceTLS: true,
      channelAuthorization: {
        endpoint: "/api/pusher/auth",
        transport: "ajax",
      },
    });
  }

  return browserPusherClient;
}

export function teardownBrowserPusherClient() {
  if (!browserPusherClient) {
    return;
  }

  browserPusherClient.disconnect();
  browserPusherClient = null;
}
