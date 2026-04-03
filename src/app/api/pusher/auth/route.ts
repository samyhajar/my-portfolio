import { NextRequest, NextResponse } from "next/server";

import {
  getPusherServerClient,
  hasPusherServerConfig,
} from "@/lib/pusher-server";
import {
  VISITOR_COOKIE_NAME,
  VISITOR_PRESENCE_CHANNEL,
} from "@/lib/visitor-counter";

export async function POST(request: NextRequest) {
  if (!hasPusherServerConfig()) {
    return NextResponse.json(
      { error: "Pusher is not configured." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const socketId = formData.get("socket_id");
  const channelName = formData.get("channel_name");

  if (typeof socketId !== "string" || typeof channelName !== "string") {
    return NextResponse.json(
      { error: "Missing socket_id or channel_name." },
      { status: 400 },
    );
  }

  if (channelName !== VISITOR_PRESENCE_CHANNEL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const existingVisitorId = request.cookies.get(VISITOR_COOKIE_NAME)?.value;
  const visitorId = existingVisitorId || crypto.randomUUID();
  const pusherServerClient = getPusherServerClient();

  if (!pusherServerClient) {
    return NextResponse.json(
      { error: "Pusher is not configured." },
      { status: 503 },
    );
  }

  const authResponse = pusherServerClient.authorizeChannel(
    socketId,
    channelName,
    {
      user_id: visitorId,
    },
  );
  const response = NextResponse.json(authResponse);

  if (!existingVisitorId) {
    response.cookies.set({
      name: VISITOR_COOKIE_NAME,
      value: visitorId,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}
