import { getAccountTopTraders } from '@/core/services/_api/use-account'
import { useQuery } from '@tanstack/react-query'

const TopTraders = () => {
  const { data: traders, isLoading } = useQuery(getAccountTopTraders())

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#FFFAFF]"></div>
      </div>
    )
  }

  return (
    <>
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        top traders
        <img
          src="/assets/img/home/top-traders/title-ribbon.svg"
          className="absolute left-[-65px] top-[-75px]"
        />
      </h1>

      <div className="flex flex-col gap-8">
        <div className="flex w-full">
          <img src="/assets/img/home/trader-ribbon-2.svg" className="w-2/5" />
          <img
            src="/assets/img/home/trader-ribbon-1.svg"
            className="-ml-[10%] w-2/5"
          />
          <img
            src="/assets/img/home/trader-ribbon-2.svg"
            className="-ml-[10%] w-2/5 -scale-x-100"
          />
        </div>

        <div className="w-full max-w-[100dvw] overflow-x-auto">
          <table className="w-full border-separate">
            <thead className="text-left text-[#999999]">
              <tr>
                <th className="min-w-[90px]">Name</th>
                <th className="min-w-[50px]">PnL</th>
                <th className="min-w-[120px]">Volume Total</th>
                <th className="min-w-[200px]">Volume average Per Trade</th>
                <th className="min-w-[100px]">Trades Per Week</th>
                <th className="min-w-[100px]">Highest Win %,</th>
                <th className="min-w-[200px]">Highest Win Amount in $$</th>
                <th className="min-w-[40px]"></th>
              </tr>
            </thead>
            <tbody className="text-white">
              {traders &&
                traders.map((trader, index) => (
                  <tr key={index}>
                    <td className="py-2">{trader.name}</td>
                    <td>80%</td>
                    <td>${trader.volumeTotal}</td>
                    <td>${trader.volumeAveragePerTrade}</td>
                    <td>{trader.tradesPerWeek}</td>
                    <td>80%</td>
                    <td>$9390302.082</td>
                    <td>
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary">
                        <img
                          src="/assets/img/home/left-arrow.svg"
                          className=""
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full">
          <img
            src="/assets/img/home/trader-ribbon-2.svg"
            className="w-2/5 -scale-y-100"
          />
          <img
            src="/assets/img/home/trader-ribbon-1.svg"
            className="-ml-[10%] w-2/5 -scale-y-100"
          />
          <img
            src="/assets/img/home/trader-ribbon-2.svg"
            className="-ml-[10%] w-2/5 -scale-x-100 -scale-y-100"
          />
        </div>
      </div>
    </>
  )
}

export default TopTraders
