import * as launchpadIdl from './idl/launchpad.json'
import * as pumpfunIdl from './idl/pumpfun.json'

export const PROGRAMS_IDL: { [key: string]: any } = {
  LAUNCHPAD: launchpadIdl,
  PUMPFUN: pumpfunIdl
} as const
