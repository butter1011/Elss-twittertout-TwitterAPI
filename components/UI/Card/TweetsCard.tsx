import CardHeader from "./CardHeader";
import { Image } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tweetUsers } from "@/components/Jotai/atoms";
import { useAtom } from "jotai";

const TweetsCard: React.FC<any> = ({ tweet }) => {
    const router = useRouter();
    const [isExpanded, setExpand] = useState(false);
    const [users,] = useAtom(tweetUsers);
    // onClick={() => { setExpand(!isExpanded); }}
    // ${isExpanded ? "" : "max-h-[10rem]"}`
    
    return (
        <>
            <div className={`flex flex-col rounded-2xl justify-between hover:rounded-[16px] hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg text-white border-b-2 border-gray-500 bg-gray-50 dark:bg-[#38117F] px-6 py-8 transition-all overflow-hidden duration-300 ease-in-out `} >
                <div className="w-full flex flex-col sm:flex-row justify-between px-2" >
                    <CardHeader tweet={tweet} img={users[tweet?.user]} />
                </div>
                <div className="w-full flex flex-col justify-between text-start px-2 font-bold mt-4 text-black dark:text-white text-[14px] gap-6">
                    <div className="w-full">
                        <p className="leading-1 font-thin" dangerouslySetInnerHTML={{ __html: tweet?.text.replaceAll("\n", "<br>") }}></p>
                    </div>
                    <div className="w-full flex flex-col p-2 rounded-lg justify-center items-center">
                        {
                            tweet.attachments.map(
                                (attachment: any) => (
                                    <Image key={attachment.media_url} width={300} src={attachment.media_url} alt="" className="sm:w-[300px] w-[200px]" />
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TweetsCard;