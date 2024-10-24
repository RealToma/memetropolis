import React, { useState, useEffect } from 'react'
import { copyToClipboard } from '@/core/utils/copy-to-clipboard'

interface CopyButtonProps {
  textToCopy: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false)
      }, 5000) // 5 seconds
    }
    return () => clearTimeout(timer)
  }, [copied])

  const handleClick = () => {
    if (textToCopy) {
      copyToClipboard(textToCopy).then(() => setCopied(true))
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col items-center justify-center rounded-xl border-2 px-[18px] py-[9px] text-xs font-bold uppercase ${
        copied || isHovered
          ? 'border-[#77FB77] text-[#77FB77]'
          : 'border-[#B5B3B8] text-[#B5B3B8]'
      }`}
    >
      <img
        src={
          copied || isHovered
            ? '/assets/img/profile/summary/icons_copied.svg'
            : '/assets/img/profile/summary/icons_copy.svg'
        }
        alt="Copy icon"
      />
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default CopyButton
