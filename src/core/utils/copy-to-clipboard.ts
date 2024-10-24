import { toast } from 'react-toastify'

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard
      .writeText(text)
    toast.success('Copied to clipboard!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch {
    toast.error('Failed to copy to clipboard')
  }
}
