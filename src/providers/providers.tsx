"use client";

import { Toaster } from "sonner";
import { LoadingLearnProvider } from "./LoadingLearnProvider";
import QueryProvider from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <LoadingLearnProvider>
        <Toaster position="bottom-right" />
        {children}
      </LoadingLearnProvider>
    </QueryProvider>
  );
}
