import {
  estimateFeesPerGas,
  getGasPrice,
  getWalletClient,
  readContract,
  switchChain,
  waitForTransactionReceipt,
  WriteContractParameters,
} from '@wagmi/core'
import {
  Abi,
  Address,
  CallParameters,
  ContractFunctionArgs,
  ContractFunctionName,
  erc20Abi,
  EstimateContractGasParameters,
} from 'viem'

import { publicClient } from '@/core/lib/viem'
import { ChainId, wagmiConfig } from '@/core/lib/wagmi'

export async function writeContractAndWaitForReceipt<
  TAbi extends Abi | unknown[],
  functionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    TAbi,
    'nonpayable' | 'payable',
    functionName
  >,
>(
  contract: {
    abi: TAbi
    account?: string
    address: string
    args?: args
    chainId?: number
    functionName: functionName
    value?: bigint
  } | null,
  overrides: Omit<CallParameters, 'chain' | 'data' | 'to'> = {},
) {
  if (!contract) throw new Error('No valid contract provided')

  const _account = contract.account as Address | undefined
  const walletClient = await getWalletClient(wagmiConfig, {
    account: _account,
    chainId: contract.chainId,
  })
  if (!walletClient) throw new Error('No wallet client found')

  const _chainId = contract.chainId as ChainId | undefined
  const _address = contract.address as Address
  const { gas: _gas, ...overrides_ } = overrides
  let gas = _gas
  if (!gas) {
    gas = await publicClient({ chainId: _chainId }).estimateContractGas({
      abi: contract.abi,
      address: _address,
      functionName: contract.functionName,
      account: walletClient.account,
      args: contract.args,
      value: contract.value,
      ...overrides_,
    } as unknown as EstimateContractGasParameters)
  }

  const gasPrice = await getGasPrice(wagmiConfig, { chainId: _chainId })
  const hash = await walletClient.writeContract({
    abi: contract.abi,
    address: _address,
    functionName: contract.functionName,
    account: walletClient.account,
    args: contract.args,
    gasPrice,
    gas: calculateBigIntMargin(gas),
    value: contract.value,
  } as unknown as WriteContractParameters)
  const receipt = await waitForTransactionReceipt(wagmiConfig, {
    hash,
    chainId: _chainId,
    confirmations: 1,
  })

  return { hash, receipt }
}

export function calculateBigIntMargin(
  value: bigint,
  margin = BigInt(1000),
): bigint {
  return (value * (BigInt(10000) + margin)) / BigInt(10000)
}

export async function switchUserChain({
  account,
  chainId,
}: {
  chainId: number
  account?: string
}) {
  const _account = account as Address | undefined
  const _chainId = chainId as ChainId
  const walletClient = await getWalletClient(wagmiConfig, { account: _account })

  if (!walletClient) throw new Error('No wallet client found')

  if (walletClient.chain.id === chainId) return

  await switchChain(wagmiConfig, { chainId: _chainId })

  return
}
