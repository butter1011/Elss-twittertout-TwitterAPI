import { Chip } from "@nextui-org/react";

const CardHeader: React.FC<any> = ({ tweet, img }) => {
    return (
        <div className="flex flex-row sm:flex-row rounded-full gap-1 align-middle items-center w-full">
            <img alt="..." src={img} className="mr-[.62rem] rounded-full w-[20px] h-[20px] sm:w-[40px] sm:h-[40px]" />
            <div className="flex flex-col align-middle justify-center overflow-hidden w-full">
                <div className="flex w-full">
                    <div className="flex flex-row gap-4 justify-start">
                        <p className="font-bold text-black dark:text-white text-[12px] sm:text-[16px] text-ellipsis overflow-hidden">{tweet.user}</p>
                        <Chip className="hidden sm:flex" color="secondary" size="sm">winrate</Chip>
                    </div>
                    <div className="gap-4 flex justify-end w-full">
                        <button className="dark:border-white border-black border text-[11px] sm:text-[12px] text-black dark:text-white bg-gray-50 dark:bg-gray-800 rounded-lg px-2 sm:px-4 py-1 active:scale-90" >Follow</button>
                    </div>
                </div>
                <p className="text-black dark:text-gray-400 text-[11px] sm:text-[14px]">
                    {new Date(tweet.postedAt)
                        .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        .replace(',', '') 
                        + ', '
                        + new Date(tweet.postedAt)
                            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                            .replace(':', ':') 
                            .replace('am', 'am')
                            .replace('pm', 'pm')
                    }
                </p>
            </div>
        </div>
    )
}

export default CardHeader