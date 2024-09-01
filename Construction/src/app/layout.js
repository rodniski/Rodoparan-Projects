import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TIMBER - SANY",
  description: "Excelência na Construção, Inovação em Maquinário.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
      <GoogleAnalytics gaId="G-KY94CH7M7R" />
      <GoogleTagManager gtmId="GTM-NS5MHST6'" />
    </html>
  );
}
