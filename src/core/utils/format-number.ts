export const convertToCurrency = (number: number) => {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(number)
}
