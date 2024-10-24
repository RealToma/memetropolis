import { fallback, Transport } from "viem";
import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
} from 'wagmi'

import {  PUBLIC_NODES, SUPPORT_CHAINS } from "@/core/constants/chains";
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { CLIENT_CONFIG } from "@/core/lib/viem";

const chains = SUPPORT_CHAINS

export const transports = chains.reduce(
  (ts, chain) => {
    const httpsStrings = !!PUBLIC_NODES[chain.id] ? PUBLIC_NODES[chain.id] : []

    if (!!ts) {
      return {
        ...ts,
        [chain.id]: fallback(httpsStrings.map((url) => http(url))),
      }
    }

    return {
      [chain.id]: fallback(httpsStrings.map((url) => http(url))),
    }
  },
  {} as Record<number, Transport>,
)

export type ChainId = (typeof SUPPORT_CHAINS)[number]['id']

const coinbaseConnector = coinbaseWallet({
  appName: 'Memetropolis',
})
const walletConnectConnector = walletConnect({
  showQrModal: true,
  projectId: 'd15625ebb0147eeff009c1187a01ffe2',
})
const metamaskConnector = injected({
  target: 'metaMask',
  shimDisconnect: false,
})
const trustConnector = injected({ target: 'trust', shimDisconnect: false })

export const wagmiConfig = createConfig({
  ssr: true,
  chains,
  connectors: [
    metamaskConnector,
    // injectedConnector,
    coinbaseConnector,
    walletConnectConnector,
    trustConnector,
  ],
  transports,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ...CLIENT_CONFIG,
});
