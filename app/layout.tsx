import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";
import { LayoutContent } from "@/app/LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 設定 Base URL（解決相對路徑問題）
  metadataBase: new URL("https://aws-ccp-clf-c02.chen-chan-hsieh.cc/"),

  // 優化標題 (支援子頁面的動態標題)
  title: {
    default: "AWS-CCP-CLF-C02 Notes",
    template: "%s | AWS CCP Notes", // 當子頁面設定 title 為 "EC2" 時，會顯示 "EC2 | AWS CCP Notes"
  },

  // 擴充描述與關鍵字
  description:
    "Comprehensive study notes and guides for the AWS Certified Cloud Practitioner (CLF-C02) exam.",
  keywords: [
    "AWS",
    "CCP",
    "CLF-C02",
    "Cloud Practitioner",
    "AWS Certification",
    "Study Notes",
  ],
  authors: [{ name: "CHEN CHAN HSIEH", url: "https://github.com/ayay459547" }],

  // 搜尋引擎爬蟲指令
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CssBaseline />
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  );
}
