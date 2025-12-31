import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PWARegister } from "@/components/pwa-register"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CHWEK - 안심 리포트",
  description: "걱정을 덜어주는 체크리스트 앱",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#83ABC4",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CHWEK",
  },
  icons: {
    icon: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <PWARegister />
      </body>
    </html>
  )
}
