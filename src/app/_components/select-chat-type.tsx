import { useState } from 'react'

const SelectChatType = () => {
  const [isFeaturedChatsSelected, setIsFeaturedChatsSelected] = useState(false)
  const toggleFeaturedChats = () => {
    setIsFeaturedChatsSelected(!isFeaturedChatsSelected)
  }

  return (
    <div className="flex gap-8">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => toggleFeaturedChats()}
      >
        {!isFeaturedChatsSelected && (
          <div className="relative h-4 w-4 rounded-full bg-[#E7E7E8]">
            <div className="absolute left-[3px] top-[3px] h-[10px] w-[10px] rounded-full bg-secondary"></div>
          </div>
        )}
        {isFeaturedChatsSelected && (
          <div className="h-4 w-4 rounded-full bg-[#E7E7E8]"></div>
        )}
        <p>All chats</p>
      </div>
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => toggleFeaturedChats()}
      >
        {isFeaturedChatsSelected && (
          <div className="relative h-4 w-4 rounded-full bg-[#E7E7E8]">
            <div className="absolute left-[3px] top-[3px] h-[10px] w-[10px] rounded-full bg-secondary"></div>
          </div>
        )}
        {!isFeaturedChatsSelected && (
          <div className="h-4 w-4 rounded-full bg-[#E7E7E8]"></div>
        )}
        <p>Featured chats</p>
      </div>
    </div>
  )
}

export default SelectChatType
