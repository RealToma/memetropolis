import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative text-info">
      <img
        src="/assets/img/footer/top-center.svg"
        className="absolute left-1/2 top-0 z-[10] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative overflow-hidden bg-primary">
        <div className="absolute left-[-22px] top-[-44px] h-16 w-16 rotate-[60deg] bg-background"></div>
        <div className="absolute right-[-22px] top-[-44px] h-16 w-16 rotate-[300deg] bg-background"></div>

        <div className="flex justify-center gap-4 pb-10 pt-16 text-xs md:gap-8 md:text-base 2xl:gap-16">
          <Link href="#">Launchpad</Link>
          <Link href="https://x.com/MEMETR0P0LIS" target="_blank">X</Link>
          <Link href="https://www.instagram.com/bookofdyor/" target="_blank">Instagram</Link>
          <Link href="https://memetropolis.party/" target="_blank">Website</Link>
          <Link href="/profile">Profile</Link>
        </div>

        <hr className="border-secondary" />

        <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between text-xs md:flex-row md:text-base">
          <p className="py-4 text-center uppercase md:py-8">
            <span className="text-white">© MEMEtropolis</span> 2024 All rights
            reserved
          </p>
          <div className="md:mb-0items-center mb-4 flex gap-16">
            <Link href="#">Privacy policy</Link>
            <Link href="#">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
