'use client'

import React, { ReactNode } from 'react'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from 'react-toastify'
import { State } from 'wagmi'

import { ConnectWalletModal } from '@/components/layout/connect-wallet'
import { BlockchainProvider } from '@/components/blockchain-provider'
import 'react-toastify/dist/ReactToastify.css'

type ProvidersProps = {
  children: ReactNode
  initialState?: State
}

export default function Providers({ children, initialState }: ProvidersProps) {
  return (
    <BlockchainProvider initialState={initialState}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#9957FF',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        appInfo={{
          appName: 'Memetropolis',
        }}
      >
        {children}
        <ConnectWalletModal />
        <ReactQueryDevtools initialIsOpen={false} />
      </RainbowKitProvider>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick={true} pauseOnHover={true} />
    </BlockchainProvider>
  )
}
