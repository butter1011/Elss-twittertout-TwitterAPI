'use client'
import React from "react";
import Image from "next/image"
import home_bg from "/public/static/hero-banner.png";
import StatsCard from "@/components/UI/Card/StatsCard";
import RankCard from "@/components/UI/Card/RankCard";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { listData, usersData, columns } from "@/public/data/data";

export default function HomePage() {
    const handleScrollDown = () => {
        const arrowContainer = document.querySelector('.top-10-twitter');
        arrowContainer?.scrollIntoView({ behavior: 'smooth' });
    };

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "id":
                return (
                    <><p className="text-bold text-sm capitalize text-default-400">{user.id + 1}</p></>
                );
            case "avatar":
                return (
                    <><Avatar isBordered src="/static/user.png" className="w-8 h-8 rounded-full" /></>
                );
            case "name":
                return (
                    <><p className="text-bold text-sm capitalize text-default-400">{user.name}</p></>
                );
            case "rate":
                return (
                    <><p className="text-bold text-[18px] capitalize text-purple-600 font-bold">{user.winrate}</p></>
                )
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="page_content bg-gray-100 dark:bg-[#38117F]">
                <div className="w-full flex flex-col lg:flex-row justify-center p-10 md:pt-24 lg:pt-32 md:px-20">
                    <div className="animate-fade-right animate-once animate-ease-out flex flex-col justify-start xl:mt-[5rem] lg:gap-8">
                        <h1 className="mb-4 font-extrabold leading-none text-black dark:text-white text-[32px] lg:text-[48px]">Best Betting Aggregator</h1>
                        <p className="mb-6 max-w-2xl font-light lg:mb-8 md:text-lg lg:text-xl dark:text-white text-gray-500">From the feeds page, you can view the latest betting predictions and if you subscribe the membership, you can see the highest winrate posts.</p>
                        <div className="flex flex-row">
                            <div className="hidden sm:inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center dark:text-white text-black rounded-lg">                        Get started
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </div>
                            <a href="#" className="hover:scale-95 bg-gradient-to-l from-[#FF8D35] from-[0%] to-[#F01111] inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-white hover:text-white text-white">
                                Subscribe
                            </a>
                        </div>
                    </div>
                    <div className="animate-fade-left animate-once animate-ease-out mt-20 lg:mt-0">
                        <Image src={home_bg} alt="" width={600} height={600} className="rounded" priority />
                    </div>
                </div>
                <button id="scroll-down" className="py-6 hidden sm:flex w-full items-center justify-center" onClick={handleScrollDown}>
                    <svg className="arrows stroke-black dark:stroke-green-50">
                        <path className="a1" d="M0 0 L30 32 L60 0"></path>
                        <path className="a2" d="M0 20 L30 52 L60 20"></path>
                        <path className="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </button>
                <div className="mx-[1rem] md:mx-[5rem] xl:mx-[10rem] gap-10 flex flex-col mt-[5rem]">
                    <div className="top-10-twitter grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-2 lg:gap-20">
                        {listData.map((item, index) => (
                            <StatsCard key={index} item={item} />
                        ))}
                    </div>
                    <div className="arrow-container animated fadeInDown">
                        <div className="arrow-2">
                            <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="arrow-1 animated hinge infinite zoomIn"></div>
                    </div>
                    
                    <div className="dark:text-white text-black text-[32px] flex items-center justify-center font-semibold">
                        <p className="border-black dark:border-white border-y">Top 10 twitters</p>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full py-4 gap-4 items-end">
                        <div className="w-full lg:w-1/2 flex flex-row gap-5 justify-center">
                            {
                                usersData.map((item, index) => (
                                    index < 3 && <RankCard key={index} item={item} />
                                ))
                            }
                        </div>
                        <div className="w-full lg:w-1/2 flex items-center justify-end">
                            <Table className="flex justify-end h-full" aria-label="Rank Table" aria-labelledby="Rank Table"> 
                                <TableHeader columns={columns}>
                                    {(column) => (
                                        <TableColumn key={column.uid}>
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody items={usersData.slice(3, 10)}>
                                    {(item) => (
                                        <TableRow key={item.id}>
                                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
