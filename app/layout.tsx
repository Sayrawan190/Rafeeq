import type { Metadata } from "next";
import "./globals.css";
import "./pilgrim-pages.css";
import "./dashboards.css";
import "./responsive.css";
import { AppProvider } from "@/components/app-provider";

export const metadata: Metadata = {
  title: "رفيق | منظومة الذكاء الصحي",
  description: "رفيقك الصحي في رحلة ضيوف الرحمن",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><AppProvider>{children}</AppProvider></body></html>;
}
