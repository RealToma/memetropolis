import { useState, useEffect, useRef } from 'react'

import { tokens } from '@/core/constants/mock/token-constants'

interface Token {
  name: string
  value: string
}

const AutocompleteSearchToken = () => {
  const [inputValue, setInputValue] = useState('')
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const filtered = tokens.filter((token) =>
      token.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    setFilteredTokens(filtered)
  }, [inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsOpen(true)
  }

  const handleTokenSelect = (token: Token) => {
    setInputValue(token.name)
    setIsOpen(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        placeholder="Search token"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="w-full bg-secondary py-3 pl-12 pr-6 text-[#FFFAFF] outline-none"
      />
      {isOpen && filteredTokens.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-sm bg-secondary shadow-lg">
          {filteredTokens.map((token, index) => (
            <li
              key={index}
              onClick={() => handleTokenSelect(token)}
              className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-[#3D3D3D]"
            >
              <span className="text-[#FFFAFF]">{token.name}</span>
              <span className="text-[#00FF00]">{token.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AutocompleteSearchToken
