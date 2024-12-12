import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import tokenCache from "../utils/tokenCache.util";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const queryClient = new QueryClient();

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          {children}
          <Slot />
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
