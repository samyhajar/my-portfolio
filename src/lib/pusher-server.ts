import "server-only";

import Pusher from "pusher";

const PUSHER_APP_ID = process.env.PUSHER_APP_ID;
const PUSHER_SECRET = process.env.PUSHER_SECRET;
const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

let pusherServerClient: Pusher | null = null;

export function hasPusherServerConfig() {
  return Boolean(
    PUSHER_APP_ID && PUSHER_SECRET && PUSHER_KEY && PUSHER_CLUSTER,
  );
}

export function getPusherServerClient() {
  if (!hasPusherServerConfig()) {
    return null;
  }

  if (!pusherServerClient) {
    pusherServerClient = new Pusher({
      appId: PUSHER_APP_ID!,
      key: PUSHER_KEY!,
      secret: PUSHER_SECRET!,
      cluster: PUSHER_CLUSTER!,
      useTLS: true,
    });
  }

  return pusherServerClient;
}
