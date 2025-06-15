"use server";

import { SlackService } from "@/services/slack.service";

interface PageViewPayload {
  pathname: string;
  ref?: string | null;
}

export async function logPageView({
  pathname,
  ref,
}: PageViewPayload): Promise<void> {
  const message = `[PageView] ${pathname} | ref=${ref ?? "none"}`;

  await SlackService.sendMessage(message);
}
