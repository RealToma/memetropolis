import React from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Providers from '@/components/layout/providers'
import { Header } from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { wagmiConfig } from '@/core/lib/wagmi'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ['latin'] })
const hanson = localFont({
  src: '../../public/assets/fonts/Hanson-Bold.ttf',
  variable: '--font-hanson',
})

export const metadata: Metadata = {
  title: 'Memetropolis Frontend',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie'),
  )

  return (
    <html lang="en">
      <body
        className={
          inter.className +
          ' ' +
          hanson.variable +
          ' font-orbitron text-text m-0 bg-background p-0'
        }
      >
        <Providers initialState={initialState}>
          <Header />
          <main className="flex flex-col items-center">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
