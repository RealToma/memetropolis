import { MutationCache, QueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify";

const ERRORS: Record<string, string> = {
  UserRejectedRequestError: `User rejected the request`,
  SwitchChainErrorType: `Something went wrong. Try again later.`,
}

function handleErrorMessage(error: Error) {
  return ERRORS[error.name] || `Something went wrong. Try again later.`
}

function makeQueryClient() {
  return new QueryClient({
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        console.error(error)
        console.log(error.name)

        if (mutation.options.onError) return

        toast.dismiss()
        toast.error(handleErrorMessage(error))
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
