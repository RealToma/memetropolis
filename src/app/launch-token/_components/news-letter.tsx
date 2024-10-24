import NewsletterBox from "@/app/launch-token/_components/newsletter-box";
import { Button } from "@/components/ui/button";
import ButtonSendEmail from "@/app/_components/button-send-email";

export const Newsletter = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <NewsletterBox
          borderFlag="top-right"
          bgSrc="/assets/img/home/crypto-news.svg"
          alignFlag="end"
        >
          <p className="text-lg font-semibold text-white md:text-3xl">
            Need Bots?
          </p>
          <p>
            Boost your project with Memetropolis Bots. Increase transactions,
            volume, and visibility with these 12-hour bots, available only with
            the main Memetropolis package.
          </p>
          <Button
            borderColor="border-accent"
            className={
              'group relative h-[40px] w-[150px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[240px]'
            }
          >
            <span className="relative z-10">Access Bot</span>
          </Button>
        </NewsletterBox>
        <NewsletterBox
          borderFlag="top-left"
          bgSrc="/assets/img/home/crypto-contests.svg"
          alignFlag="end"
        >
          <p className="text-lg font-semibold text-white md:text-3xl">
            Set MEMETROPOLIS directly on Telegram
          </p>
          <p>
            Memetropolis is your gateway to success on the Solana chain.
            Designed to attract investors and increase token visibility, $Memes
            boosts trading volume and captures the crypto community&apos;s
            attention.
          </p>
          <Button
            borderColor="border-accent"
            className={
              'group relative h-[40px] w-[150px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[240px]'
            }
          >
            <span className="relative z-10">Telegram</span>
          </Button>
        </NewsletterBox>
      </div>
      <NewsletterBox>
        <p className="text-center font-hanson text-xl font-bold uppercase text-white md:text-4xl">
          Sign up for the
          <br />
          crypto newsletter
        </p>
        <p className="text-center text-xs md:text-base">
          Get updates for news, coins, contests, pre-access and much more.
        </p>
        <div className="relative w-full max-w-[470px]">
          <input
            placeholder="Enter your email"
            className="w-full rounded-lg border border-violet-100 bg-transparent px-6 py-3 text-xs text-white md:text-base"
          />
          <ButtonSendEmail />
        </div>
      </NewsletterBox>
    </>
  )
}