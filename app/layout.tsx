import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "设计师求职文书 AI 助手 · MVP Demo",
  description: "把 JD 解析、文书润色、匹配打分串成一条闭环",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={pressStart.variable}>
      <body className="min-h-screen bg-pixel-bg font-sans text-pixel-text">
        <div className="relative z-10">{children}</div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#121212",
              color: "#ffffff",
              border: "2px solid #43A047",
              borderRadius: 0,
              fontSize: "13px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            },
          }}
        />
      </body>
    </html>
  );
}
