// app/components/SessionProviderWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: ReactNode;
  session: any; // Session type here
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
