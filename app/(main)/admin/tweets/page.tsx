"use client"
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';

import axios from 'axios';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Tooltip, getKeyValue, Button } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { GoPlus, GoNote, GoEye, GoTrash } from "react-icons/go";

import { tweetUsers, tweetsList } from "@/components/Jotai/atoms";
import DeleteTweet from '@/components/UI/Modals/DeleteTweet';

import { useAtom } from 'jotai';
import { isAddOpen, isDeleteOpen } from '@/components/Jotai/modalAtoms';

const columns = [
  { name: "UserName", uid: "user" },
  { name: "Tweet Content", uid: "text" },
  { name: "Posted At", uid: "posted_at" },
  { name: "Action", uid: "actions" },
];

const TweetsPage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<any>(false);
  const [todayTweets, setTodayTweets] = useState([]);
  const [tweets, setGetTweets] = useState(false);

  const [tweetData, setTweetData] = useAtom(tweetsList);
  const [, setDeleteModalOpen] = useAtom(isDeleteOpen);

  // Page info
  const tweetsPerPage = 10;
  const startIndex = (page - 1) * tweetsPerPage;
  const endIndex = startIndex + tweetsPerPage;

  useEffect(() => {
    setLoading(true);
    const getTweets = async function () {
      await axios.post("/api/v2/tweets", { timeSort: false }).then((res) => {
        setTweetData(res.data.tweets);
        setTodayTweets(res.data.todayTweets);
        setLoading(false);
      });
    };

    getTweets();
  }, [tweets]);

  const CheckTweet = async function (tweetId: any, isCheck: any) {
    await axios.post("/api/v1/tweet/update", { tweetId, isCheck }).then((res) => {
      setGetTweets(!tweets);
    });
  }

  const renderCell = React.useCallback((tweet: any, columnKey: any) => {
    const cellValue = tweet[columnKey];

    switch (columnKey) {
      case "user":
        return (
          <><p className="text-bold text-sm capitalize text-black dark:text-white">{tweet.user}</p></>
        );
      case "text":
        return (
          <>
            <p className="text-bold text-sm capitalize text-black dark:text-white" dangerouslySetInnerHTML={{ __html: tweet?.text.replaceAll("\n", "<br>") }}></p>
          </>
        );
      case "posted_at":
        return (
          <>
            <p className="text-bold text-sm capitalize text-black dark:text-white">
              {new Date(tweet.postedAt)
                .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                .replace(',', '')
                + ', '
                + new Date(tweet.postedAt)
                  .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                  .replace(':', ':')
                  .replace('am', 'am')
                  .replace('pm', 'pm')
              }</p>
          </>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-4 justify-center">
            <Tooltip content="Details" className='text-black dark:text-white'>
              <span className="text-lg text-black dark:text-white cursor-pointer active:opacity-50">
                <GoEye />
              </span>
            </Tooltip>
            <Popover key={"top"} placement={"top"} color="default">
              {
                tweet?.isCheck !== undefined ?
                  (tweet?.isCheck ? <FaCheck className='text-green-500' /> : <RxCross2 className='text-red-500 text-[18px]' />) :
                  <PopoverTrigger>
                    <span className="text-lg text-black dark:text-white cursor-pointer active:opacity-50">
                      <GoNote />
                    </span>
                  </PopoverTrigger>
              }
              <PopoverContent>
                <div className="flex flex-row gap-4">
                  <Button onClick={() => { alert(tweet._id); CheckTweet(tweet._id, true); }}>
                    <FaCheck className='text-green-500' />
                  </Button>

                  <Button onClick={() => { alert(tweet._id); CheckTweet(tweet._id, false); }}>
                    <RxCross2 className='text-red-500 text-[18px]' />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => setDeleteModalOpen(tweet._id)}>
                <GoTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className='flex flex-col gap-10 w-full justify-start'>
      <div className="flex items-center space-x-64 text-[16px] text-black dark:text-white justify-center py-6">
        <div className='flex flex-col text-center p-4 gap-2'>
          <p className='text-5xl'>
            <CountUp end={todayTweets?.length} duration={3} />
          </p>
          <p className='text-small'>Newly Added</p>
        </div>
        <Divider orientation="vertical" className='bg-white h-16' />
        <div className='flex flex-col text-center p-4 gap-2'>
          <p className='text-5xl'>
            <CountUp end={tweetData?.length} duration={3} />
          </p>
          <p className='text-small'>Total Tweets</p>
        </div>
      </div>
      <div className='flex flex-col gap-10 px-4'>
        <div className='flex flex-col justify-between px-2'>
          {
            loading ?
              <div id="loading" className="flex justify-center items-center align-middle">
                <svg viewBox="50 50 100 100" style={{ width: '5rem' }}>
                  <circle r="50" cy="100" cx="100" className='dark:stroke-white stroke-purple-700 stroke-[3px]' />
                </svg>
              </div>
              :
              <Tabs key={"full"} radius={"full"} aria-label="Tabs radius" defaultSelectedKey={"total"}>
                <Tab key="new" title="Newly Added">
                  <div className='flex justify-center p-1 mb-2'>
                    <Pagination
                      color="secondary"
                      showControls
                      initialPage={1}
                      siblings={1}
                      total={Math.ceil(todayTweets?.length / 10)}
                      page={page}
                      onChange={(page: any) => setPage(page)}
                    />
                  </div>
                  <Table className="flex justify-end" aria-label='UserTable' aria-labelledby='UserTable'>
                    <TableHeader columns={columns}>
                      {(column: any) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className='text-center'>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={todayTweets?.slice(startIndex, endIndex)}>
                      {(item: any) => (
                        <TableRow key={item?._id} className='hover:dark:bg-purple-600 hover:bg-gray-300 border-b-1 dark:border-gray-500'>
                          {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className='flex justify-center mb-8 p-1'>
                    <Pagination
                      color="secondary"
                      showControls
                      initialPage={1}
                      siblings={1}
                      total={Math.ceil(todayTweets?.length / 10)}
                      page={page}
                      onChange={(page: any) => setPage(page)}
                    />
                  </div>
                </Tab>

                <Tab key="total" title="Total">
                  <div className='flex justify-center p-1 mb-2'>
                    <Pagination
                      color="secondary"
                      showControls
                      initialPage={1}
                      siblings={1}
                      total={Math.ceil(tweetData?.length / 10)}
                      page={page}
                      onChange={(page: any) => setPage(page)}
                    />
                  </div>
                  <Table className="flex justify-end" aria-label='UserTable' aria-labelledby='UserTable'>
                    <TableHeader columns={columns}>
                      {(column: any) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className='text-center'>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={tweetData?.slice(startIndex, endIndex)}>
                      {(item: any) => (
                        <TableRow key={item?._id} className='hover:dark:bg-purple-600 hover:bg-gray-300 border-b-1 dark:border-gray-500'>
                          {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className='flex justify-center mb-8 p-1'>
                    <Pagination
                      color="secondary"
                      showControls
                      initialPage={1}
                      siblings={1}
                      total={Math.ceil(tweetData?.length / 10)}
                      page={page}
                      onChange={(page: any) => setPage(page)}
                    />
                  </div>
                </Tab>
              </Tabs>
          }
        </div>
      </div>
      <DeleteTweet />
    </div>
  )
}

export default TweetsPage