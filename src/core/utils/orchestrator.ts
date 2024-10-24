import { Web3Wallet } from '../types/web3'

type FunctionType = (...args: any[]) => any
export function orchestrator<
  T extends Record<Web3Wallet.Providers, FunctionType>,
>(functions: T): any {
  return function <A extends Web3Wallet.Providers>(
    provider: A,
    ...args: Parameters<T[A]>
  ): ReturnType<T[A]> {
    return functions[provider](...args)
  }
}
