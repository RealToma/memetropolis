import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChartManager } from "../utils/ChartManager";
const TradingChart = ({ market, }: { market: string; }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartManagerRef = useRef<ChartManager>(null);



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
                        <div ref={chartRef} style={{ height: "520px", width: "100%", marginTop: 4 }}></div>
                    </div>
                    {/* bottom items */}
                    <div className="h-[60px] bg-black">
                        kjh
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
