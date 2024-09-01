"use client";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { usePathname } from "next/navigation";
import { Header } from "@/components/theme/header/header";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@theme-toggles/react/css/DarkInner.css"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  const shouldShowHeader = pathname !== "/" && pathname !== "/login";

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div suppressHydrationWarning
              className={`min-h-screen max-h-screen overflow-hidden bg-background flex flex-col ${
                shouldShowHeader ? "" : "pt-0"
              }`}
            >
              {/* Header with animation */}

              {shouldShowHeader && <Header/>}

              <main className="flex-1 w-full">{children}</main>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
