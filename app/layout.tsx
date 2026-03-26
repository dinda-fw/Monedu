import type { Metadata, Viewport } from 'next'
import { Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: 'Monedu - Platform Edukasi Literasi Keuangan',
  description: 'Belajar literasi keuangan dengan cara yang menyenangkan! Platform edukasi interaktif untuk pelajar dan mahasiswa Indonesia dengan gamifikasi, kuis, dan AI tutor.',
  keywords: ['literasi keuangan', 'edukasi keuangan', 'belajar investasi', 'menabung', 'pengelolaan uang', 'gamifikasi'],
  authors: [{ name: 'Monedu' }],
  openGraph: {
    title: 'Monedu - Platform Edukasi Literasi Keuangan',
    description: 'Belajar literasi keuangan dengan cara yang menyenangkan!',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#8b5cf6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-gradient-sky">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
