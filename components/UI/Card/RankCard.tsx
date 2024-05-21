import { Card, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import firstMedal from "/public/images/firstMedal/48.png";
import secondMedal from "/public/images/secondMedal/48.png";
import thirdMedal from "/public/images/thirdMedal/48.png";

const RankCard: React.FC<any> = ({ item }) => {

  return (
    <>
      <div className={`w-full justify-end flex flex-col ${item.id === 1 ? "order-1" : item.id === 2 ? "order-3" : "order-2"}`}>
        <div className="flex flex-col gap-2 py-6 items-center">
          <Avatar isBordered src="" className="w-16 h-16 md:w-20 md:h-20 xl:w-28 xl:h-28 rounded-full" />
          <p className="text-[16px] text-black dark:text-white bg-white dark:bg-[#732CD8] px-6 rounded-lg absolute xl:mt-[5.5rem] mt-[3.5rem]">{item.name}</p>
        </div>
        <Card shadow="sm" className={`w-full ${item.id === 1 ? "h-[200px] sm:h-[250px]" : item.id === 2 ? "h-[150px] sm:h-[200px]" : "h-[250px] sm:h-[300px]"}`}>
          <CardBody className="overflow-visible p-0">
            <div className="flex items-center justify-center text-[50px] py-4 dark:bg-[#070044] flex-col h-full">
              <div className="text-white md:text-[40px]">
                {
                  item.id === 0 ? <><Image src={firstMedal} width={96} height={96} alt="" className="w-[48px] h-[48px] sm:w-[96px] sm:h-[96px] lg:w-[96px] lg:h-[96px]" /></>
                    : item.id === 1 ? <Image src={secondMedal} width={96} height={96} alt="" className="w-[48px] h-[48px] sm:w-[96px] sm:h-[96px] lg:w-[96px] lg:h-[96px]" />
                      : <Image src={thirdMedal} width={96} height={96} alt="" className="w-[48px] h-[48px] sm:w-[96px] sm:h-[96px] lg:w-[96px] lg:h-[96px]" />
                }
              </div>
              <p className="flex flex-col items-center justify-center text-[16px] sm:text-[18px] md:text-[24px] h-full">
                {item.winrate+" %"}
                <span className="text-[16px]">Winrate</span>  
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default RankCard;