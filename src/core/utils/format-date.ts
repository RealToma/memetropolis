export const getTimeAgo = (timestamp: number): string => {
  if (!timestamp) return 'long time ago'

  const now = Date.now()
  const diffInSeconds = Math.floor((now - timestamp * 1000) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth() is zero-indexed
  const year = date.getFullYear().toString().slice(-2)
  return `${month}/${day}/${year}`
}
