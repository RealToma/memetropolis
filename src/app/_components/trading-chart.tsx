import Image from "next/image";
const TradingChart = () => {

    return (
        <div className="bg-[#07040B] h-[363px] relative  clip-trading_chart_card flex">
            {/* nav */}
            <div className="relative h-full">
                {/* nav border */}
                <div className="trading_chart_card_nav_border bg-[#605B66] h-full w-[111px] border-[#1E1E1E]">
                </div>
                {/* nav */}
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
                        </button>                    <button>
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
            {/* search */}
            <div className="absolute bg-white treding_chart_search w-[191px] h-[52px] -top-[26px] z-10 left-[83px]"></div>
        </div>
    );
};

export default TradingChart;
