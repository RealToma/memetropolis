import { CHAIN_ID } from './chains'
import { zeroAddress } from 'viem'

abstract class BaseCurrency {
  public abstract readonly isNative: boolean
  public abstract readonly isToken: boolean
  public abstract readonly address: string

  public readonly chainId: number
  public readonly decimals: number
  public readonly symbol: string
  public readonly name?: string

  protected constructor(
    chainId: number,
    decimals: number,
    symbol: string,
    name?: string,
  ) {
    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }

  public abstract equals(other: Currency): boolean
  public abstract get wrapped(): Token
}

abstract class NativeCurrency extends BaseCurrency {
  public readonly isNative: true = true
  public readonly isToken: false = false
  public readonly address = zeroAddress
}

export type Currency = NativeCurrency | Token

export class SolanaToken extends BaseCurrency {
  public readonly isNative: false = false
  public readonly isToken: true = true

  public readonly address: string
  public readonly name: string
  public readonly symbol: string
  public readonly decimals: number

  public constructor(
    address: string,
    name: string,
    symbol: string,
    decimals: number,
  ) {
    super(CHAIN_ID.SOLANA, decimals, symbol, name)
    this.address = address
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
  }

  public equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.chainId === other.chainId &&
      this.address.toLowerCase() === other.address.toLowerCase()
    )
  }

  public get wrapped(): Token {
    return this
  }
}

export class Token extends BaseCurrency {
  public readonly isNative: false = false
  public readonly isToken: true = true

  public readonly address: string

  public constructor(
    chainId: number,
    address: `0x${string}` | string,
    decimals: number,
    symbol: string,
    name?: string,
  ) {
    super(chainId, decimals, symbol, name)
    this.address = address
  }

  public equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.chainId === other.chainId &&
      this.address.toLowerCase() === other.address.toLowerCase()
    )
  }

  public get wrapped(): Token {
    return this
  }
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } =
  {
    [CHAIN_ID.MAINNET]: new Token(
      CHAIN_ID.MAINNET,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      18,
      'WETH',
      'Wrapped Ether',
    ),
    [CHAIN_ID.BASE]: new Token(
      CHAIN_ID.BASE,
      '0x4200000000000000000000000000000000000006',
      18,
      'WETH',
      'Wrapped Ether',
    ),
    [CHAIN_ID.ARBITRUM_ONE]: new Token(
      CHAIN_ID.ARBITRUM_ONE,
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      18,
      'WETH',
      'Wrapped Ether',
    ),
    [CHAIN_ID.BNB]: new Token(
      CHAIN_ID.BNB,
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      18,
      'WBNB',
      'Wrapped BNB',
    ),
    [CHAIN_ID.SOLANA]: new Token(
      CHAIN_ID.SOLANA,
      'J4AsrsmJNVux6W84n9jMReJ9t95g4Zr6x1ZNdoz3Wehb',
      9,
      'WSOL',
      'Wrapped Solana',
    ),
  }

class ExtendedEther extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'ETH', 'Ether')
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error(`Unsupported chain ID: ${this.chainId}`)
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {}

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    )
  }
}

export function isSolana(chainId: number): chainId is typeof CHAIN_ID.SOLANA {
  return chainId === CHAIN_ID.SOLANA
}

class SolanaNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (this.chainId !== CHAIN_ID.SOLANA) throw new Error('Not Solana')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error(`Unsupported chain ID: ${this.chainId}`)
  }

  public constructor(chainId: number) {
    if (!isSolana(chainId)) throw new Error('Not Solana')
    super(chainId, 9, 'SOL', 'SOL')
  }
}
