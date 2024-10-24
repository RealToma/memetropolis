const NewsletterBox = ({
  borderFlag,
  bgSrc,
  alignFlag,
  children,
}: {
  borderFlag?: string
  bgSrc?: string
  alignFlag?: string
  children: React.ReactNode
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-secondary p-3">
      {borderFlag !== 'top-left' && (
        <div className="absolute left-[-22px] top-[-22px] z-[10] h-[44px] w-[44px] rotate-45 bg-background"></div>
      )}
      {borderFlag !== 'top-right' && (
        <div className="absolute right-[-22px] top-[-22px] z-[10] h-[44px] w-[44px] rotate-[135deg] bg-background"></div>
      )}
      <div className="absolute bottom-[-22px] left-[-22px] z-[10] h-[44px] w-[44px] rotate-[315deg] bg-background"></div>
      <div className="absolute bottom-[-22px] right-[-22px] z-[10] h-[44px] w-[44px] rotate-[225deg] bg-background"></div>
      <div
        className={`relative flex h-[250px] w-full flex-col gap-4 border-4 border-accent p-8 md:h-[350px] ${bgSrc ? '' : 'bg-[#07040B]'} ${alignFlag === 'end' ? 'items-start justify-end' : 'items-center justify-center'}`}
        style={bgSrc ? { backgroundImage: `url(${bgSrc})` } : undefined}
      >
        {borderFlag !== 'top-left' && (
          <div className="absolute left-[-21px] top-[-21px] h-10 w-10 rotate-45 border-r-4 border-r-accent bg-secondary"></div>
        )}
        {borderFlag !== 'top-right' && (
          <div className="absolute right-[-21px] top-[-21px] h-10 w-10 rotate-[135deg] border-r-4 border-r-accent bg-secondary"></div>
        )}
        <div className="absolute bottom-[-21px] left-[-21px] h-10 w-10 rotate-[315deg] border-r-4 border-r-accent bg-secondary"></div>
        <div className="absolute bottom-[-21px] right-[-21px] h-10 w-10 rotate-[225deg] border-r-4 border-r-accent bg-secondary"></div>
        {children}
      </div>
    </div>
  )
}

export default NewsletterBox
