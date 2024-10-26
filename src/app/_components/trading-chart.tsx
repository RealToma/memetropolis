import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChartManager } from "../utils/ChartManager";
import { KLine } from "../utils/types";

const TradingChart = ({ market, }: { market: string; }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartManagerRef = useRef<ChartManager>(null);
    const init = async () => {
        let klineData: KLine[] = [];
        try {
            klineData = Array.from({ length: 100 }, (_, i) => ({
                close: (100 + Math.random() * 10).toFixed(2),
                end: new Date(2023, 9, 23, 14 + Math.floor(i / 2), (i % 2) * 30).toISOString(),
                high: (102 + Math.random() * 10).toFixed(2),
                low: (98 + Math.random() * 10).toFixed(2),
                open: (100 + Math.random() * 10).toFixed(2),
                quoteVolume: (5000 + Math.random() * 3000).toFixed(2),
                start: new Date(2023, 9, 23, 14 + Math.floor(i / 2), (i % 2) * 30).toISOString(),
                trades: Math.floor(200 + Math.random() * 100).toString(),
                volume: (7000 + Math.random() * 3000).toFixed(2)
            }));

        } catch (e) { }

        if (chartRef) {
            if (chartManagerRef.current) {
                chartManagerRef.current.destroy();
            }
            const chartManager = new ChartManager(
                chartRef.current,
                [
                    ...klineData?.map((x) => ({
                        close: parseFloat(x.close),
                        high: parseFloat(x.high),
                        low: parseFloat(x.low),
                        open: parseFloat(x.open),
                        timestamp: new Date(x.end),
                    })),
                ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
                {
                    background: "#07040B",
                    color: "white",
                }
            );
            //@ts-ignore
            chartManagerRef.current = chartManager;
        }
    };

    useEffect(() => {
        init();
    }, [market, chartRef]);



    return (
        <div className="relative">
            <div className="bg-[#07040B] h-[363px] relative  clip-trading_chart_card flex">
                {/* nav */}
                <div className="relative h-full">
                    {/* nav border */}
                    <div className="trading_chart_card_nav_border bg-[#605B66] h-full w-[111px] border-[#1E1E1E]">
                    </div>
                    {/* nav buttons */}
                    <div className="left_nav overflow-y-hidden-hidden  clip-trading_chart_card_nav  bg-[#07040B] py-[45px] flex flex-col items-center ">
                        <div className=" flex flex-col items-center space-y-[18px] overflow-y-scroll no-scrollbar">
                            <button>
                                <Image
                                    src="/assets/img/icons/subtract.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/smily.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/subtract.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/smily.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/subtract.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/smily.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/subtract.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/smily.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>                    <button>
                                <Image
                                    src="/assets/img/icons/smily.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/smily.svg"
                                    className=""
                                    alt="subtract"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                {/* chart container */}
                <div className="w-full   mt-[26px] flex  justify-between flex-col">
                    <div className="pl-5 pr-11 pt-3">
                        {/* title */}
                        <div className=" flex items-center justify-start ">
                            <p className="text-sm text-[#928E96] mr-2">Darkmo</p>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009C81] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009C81]"></span>
                            </span>
                        </div>
                        {/* chart */}
                        <div ref={chartRef} className="w-full h-[218px]" ></div>
                    </div>
                    {/* bottom items */}
                    <div className="h-[60px] border-t border-t-white/20 pt-4 flex">
                        <div className="grow  flex items-center justify-between">
                            {/* left filters */}
                            <div className="flex space-x-3 text-[#605B66] text-sm pl-[26px]">
                                <div className="flex space-x-2">
                                    <button>5d</button>
                                    <p className="text-[#605B66]">/</p>
                                    <button>1d</button>
                                </div>
                                <button>
                                    <Image
                                        src="/assets/img/icons/chart_calender.svg"
                                        className=""
                                        alt="scanner"
                                        width={16}
                                        height={16}
                                    />


                                </button>
                            </div>
                            {/* right filters */}
                            <div className="flex space-x-2 text-sm">
                                <button className="text-[#605B66]">$</button>
                                <p className="text-[#605B66]">/</p>
                                <button className="text-[#605B66]">log</button>
                                <p className="text-[#605B66]">/</p>
                                <button className="text-[#725AC1]">auto</button>
                            </div>
                        </div>
                        {/* right icons */}
                        <div className="bg-[#1B1421] w-[192px] trading_chart_bottom_right space-x-6 flex items-center justify-end pr-[27px]">
                            <button>
                                <Image
                                    src="/assets/img/icons/scanner.svg"
                                    className=""
                                    alt="scanner"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/camera.svg"
                                    className=""
                                    alt="camera"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button>
                                <Image
                                    src="/assets/img/icons/settings.svg"
                                    className=""
                                    alt="settings"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            {/* search */}
            <div className="absolute bg-[#191222] treding_chart_search w-[191px] h-[52px] -top-[26px] z-10 left-[83px]">
                <div className="flex items-center justify-between h-full w-[191px] px-[28px]">
                    <div className="flex items-center justify-center">
                        <Image
                            src="/assets/img/icons/search.svg"
                            className="mr-1"
                            alt="search"
                            width={16}
                            height={16}
                        />
                        {/* <input className="bg-transparent"/> */}
                        <input type="text" placeholder="Search" className="bg-transparent text-[#605B66] w-[80px]  outline-none text-sm" />
                    </div>
                    <button>
                        <Image
                            src="/assets/img/icons/plus.svg"
                            className="h-6 w-6"
                            alt="plus"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
            {/* time tag */}
            <div className="w-[114px] h-[32px] rounded-full bg-[#413B48] text-[#FFF37B] p-2 text-[13px] flex items-center justify-center absolute -top-4 right-11">
                <p>22:49:40 (UTC)</p>
            </div>
        </div >
    );
};

export default TradingChart;
