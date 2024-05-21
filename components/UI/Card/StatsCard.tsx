import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { TbUsersPlus } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";

const StatsCard: React.FC<any> = ({ item }) => {

  return (
    <>
      <Card shadow="sm" className="dark:bg-[#070044]">
        <CardBody className="overflow-visible flex items-center flex-col sm:flex-row py-6">
          <div className="w-1/4 flex items-center justify-center text-[50px] py-4">
            {item.id === 0 ? <><FaUsers /></> : item.id === 1 ? <><TbUsersPlus /></> : <><TfiWrite /></>}
          </div>
          <div className="flex flex-col gap-2 p-4">
            <p className="font-bold text-[16px]">
              {item.title}
            </p>
            <p className="text-[20px] sm:text-[30px] font-bold">
              {item.amount}
            </p>
            <p>
              <span className={`${item.id === 0 ? "text-yellow-400" : item.id === 1 ? "text-green-500" : "text-red-600"} font-bold text-[16px] mx-1`}>{item.new_data}</span>
              {item.content}
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default StatsCard;