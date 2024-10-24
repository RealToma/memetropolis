import React, { useState } from 'react'

const ButtonLike = () => {
  const [isSelected, setIsSelected] = useState(false)

  const toggleSelected = () => {
    setIsSelected(!isSelected)
  }

  return (
    <img
      src={
        isSelected
          ? '/assets/img/home/chat/chat-favorite-selected.svg'
          : '/assets/img/home/chat/chat-favorite.svg'
      }
      className={`cursor-pointer`}
      onClick={toggleSelected}
      alt="Like"
    />
  )
}

export default ButtonLike
