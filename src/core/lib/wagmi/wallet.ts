const isMetamaskInstalled = () => {
  if (typeof window === 'undefined') return false
  if (window.ethereum?.isMetaMask) return true
  if (
    window.ethereum?.providers?.some(
      (p: { isMetaMask: boolean }) => p.isMetaMask,
    )
  )
    return true
  return false
}

const isTrustInstalled = () => {
  const injectedProviderExists =
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  if (!injectedProviderExists) return false
  if (window.ethereum?.isTrust) return true
  if (window.ethereum?.providers?.some((p: { isTrust: boolean }) => p.isTrust))
    return true
  return false
}

export const walletsConfig = (): {
  id: string
  title: string
  readonly installed: boolean
  connectorId: string
}[] => {
  return [
    {
      id: 'metamask',
      title: 'MetaMask',
      get installed() {
        return isMetamaskInstalled()
      },
      connectorId: 'metaMask',
    },
    {
      id: 'metamask',
      title: 'MetaMask',
      get installed() {
        return isMetamaskInstalled()
      },
      connectorId: 'io.metamask',
    },
    {
      id: 'trust',
      title: 'Trust Wallet',
      connectorId: 'trust',
      get installed() {
        return isTrustInstalled()
      },
    },
  ]
}
