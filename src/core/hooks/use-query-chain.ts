import { parseAsInteger, useQueryState } from 'nuqs'

export function useQueryChain(key = 'chain') {
  return useQueryState(
    key,
    parseAsInteger.withDefault(0).withOptions({ clearOnDefault: true }),
  )
}
