import { useState } from 'react'

import SelectChatType from '@/app/_components/select-chat-type'
import ButtonAttach from '@/app/_components/button-attach'
import ButtonSendMessage from '@/app/_components/button-send-message'
import ButtonLike from '@/app/_components/button-like'

import { ChatBoxConstants } from '@/core/constants/mock/chat-box-constants'

const ChatTabs = () => {
  const [tabSelected, setTabSelected] = useState('memetropolis')
  const toggleTab = (tab: string) => {
    setTabSelected(tab)
  }

  return (
    <div className="absolute left-0 top-0 flex w-full justify-around text-xs font-semibold md:text-lg">
      <p
        className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-b-full bg-background px-3 py-1 md:gap-2 md:px-6 md:py-2"
        onClick={() => toggleTab('memetropolis')}
      >
        <img
          src="/assets/img/home/tab-memetropolis.svg"
          className="hidden md:block"
        />
        Memetropolis
        <img
          src="/assets/img/home/dropdown-arrow.svg"
          className="hidden md:block"
        />
        {tabSelected === 'memetropolis' && (
          <img
            src="/assets/img/home/tab-ellipse.svg"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          />
        )}
      </p>
      <p
        className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-b-full bg-background px-3 py-1 md:gap-2 md:px-6 md:py-2"
        onClick={() => toggleTab('tremp')}
      >
        <img
          src="/assets/img/home/tab-tremp.svg"
          className="hidden md:block"
        />
        Tremp
        <img
          src="/assets/img/home/dropdown-arrow.svg"
          className="hidden md:block"
        />
        {tabSelected === 'tremp' && (
          <img
            src="/assets/img/home/tab-ellipse.svg"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          />
        )}
      </p>
      <p
        className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-b-full bg-background px-3 py-1 md:gap-2 md:px-6 md:py-2"
        onClick={() => toggleTab('super_fwog')}
      >
        <img
          src="/assets/img/home/tab-super-fwog.svg"
          className="hidden md:block"
        />
        SUPER <br className="block md:hidden" />
        FWOG
        <img
          src="/assets/img/home/dropdown-arrow.svg"
          className="hidden md:block"
        />
        {tabSelected === 'super_fwog' && (
          <img
            src="/assets/img/home/tab-ellipse.svg"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          />
        )}
      </p>
      <p
        className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-b-full bg-background px-3 py-1 md:gap-2 md:px-6 md:py-2"
        onClick={() => toggleTab('sop')}
      >
        <img src="/assets/img/home/tab-sop.svg" className="hidden md:block" />
        SOP
        <img
          src="/assets/img/home/dropdown-arrow.svg"
          className="hidden md:block"
        />
        {tabSelected === 'sop' && (
          <img
            src="/assets/img/home/tab-ellipse.svg"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          />
        )}
      </p>
      <p
        className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-b-full bg-background px-3 py-1 md:gap-2 md:px-6 md:py-2"
        onClick={() => toggleTab('dogwifhat')}
      >
        <img
          src="/assets/img/home/tab-dogwifhat.svg"
          className="hidden md:block"
        />
        DogWifHat
        <img
          src="/assets/img/home/dropdown-arrow.svg"
          className="hidden md:block"
        />
        {tabSelected === 'dogwifhat' && (
          <img
            src="/assets/img/home/tab-ellipse.svg"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          />
        )}
      </p>
    </div>
  )
}
interface ChatBoxProps {
  avatarSrc: string
  userName: string
  isOnline: boolean
  lastSeen: string
  message: string
}
const ChatBox = ({
  avatarSrc,
  userName,
  isOnline,
  lastSeen,
  message,
}: ChatBoxProps) => {
  return (
    <div className="flex gap-3 bg-secondary p-4 md:gap-6 md:p-8">
      <div className="w-full">
        <div className="flex items-center gap-3">
          <img
            src={`/assets/img/home/${avatarSrc}`}
            className="h-6 w-6 rounded-full"
            alt=""
          />
          <p>{userName}</p>
          <div className="h-1 w-1 rounded-full bg-[#767676]"></div>
          <p>{lastSeen}</p>
        </div>
        <p>{message}</p>
      </div>
      <ButtonLike />
      <img src="/assets/img/home/chat-reply.svg" className="cursor-pointer" />
    </div>
  )
}
const TradingChat = () => {
  return (
    <>
      <h1 className="text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        trading chat
      </h1>

      <div className="relative w-full border-l-2 border-accent bg-primary py-16 md:py-28">
        <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"></div>
        <div className="absolute right-0 top-0 h-12 w-[2px] -translate-x-1/2 bg-accent"></div>
        <img
          src="/assets/img/home/chat/ribbon.svg"
          className="absolute right-0 top-12 w-[52px] translate-x-1/2"
        />

        <ChatTabs />

        <div className="mx-auto flex max-w-[960px] flex-col gap-4 px-3 text-xs md:text-base">
          <SelectChatType />

          {ChatBoxConstants.map((constant) => {
            return (
              <ChatBox
                key={constant.id}
                avatarSrc={constant.avatarSrc}
                userName={constant.userName}
                isOnline={constant.isOnline}
                lastSeen={constant.lastSeen}
                message={constant.message}
              />
            )
          })}

          <div className="flex items-center gap-5 rounded-xl border-2 border-accent px-8 py-6">
            <p className="w-full">
              Join the tg and make let’s make a whale chat
            </p>
            <ButtonAttach />
            <ButtonSendMessage />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-[30px] w-[50%] -translate-x-1/2 bg-background md:h-[70px]"></div>
        <div className="absolute bottom-[-36px] left-[calc(25%-3px)] h-[55px] w-[55px] -translate-x-1/2 rotate-[50deg] bg-background md:bottom-[-64px] md:left-[calc(25%-7px)] md:h-[110px] md:w-[110px]"></div>
        <div className="absolute bottom-[-36px] left-[calc(75%+3px)] h-[55px] w-[55px] -translate-x-1/2 rotate-[130deg] bg-background md:bottom-[-64px] md:left-[calc(75%+7px)] md:h-[110px] md:w-[110px]"></div>
        <img
          src="/assets/img/home/trading-chat-square-right.svg"
          className="absolute bottom-0 right-0"
        />
      </div>
    </>
  )
}

export default TradingChat
