'use client'
import { useState, useContext, useEffect } from "react"
import TweetsCard from "@/components/UI/Card/TweetsCard";
import { Input, user } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { Pagination } from "@nextui-org/react";
import axios from "axios";
import { tweetUsers, tweetsList } from "@/components/Jotai/atoms";
import { useAtom } from "jotai";

export default function BotPage() {
  const [tweetData, setTweetData] = useAtom(tweetsList);
  const [, setUserData] = useAtom(tweetUsers);
  const [loading, setLoading] = useState<any>(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isTimeSort, setTimeSort] = useState(false);

  // Page info
  const tweetsPerPage = 10;
  const startIndex = (page - 1) * tweetsPerPage;
  const endIndex = startIndex + tweetsPerPage;
  const currentTweets = tweetData.slice(startIndex, endIndex);

  useEffect(() => {
    setLoading(true);
    const getTweets = async function () {
      await axios.post("/api/v2/tweets", { timeSort: isTimeSort }).then((res) => {
        setTweetData(res.data.tweets);
        setUserData(res.data.users);
        setTotalPage(Math.ceil(res.data.tweets.length / 10));
        setLoading(false);
      });
    };

    getTweets();
  }, [isTimeSort]);

  return (
    <div className="page_content bg-gray-100 dark:bg-[#38117F] flex justify-center">
      <div className="mx-4 p-4 flex w-full">
        <div className="w-full flex flex-col xl:flex-row justify-between gap-5">
          <div className="px-4 w-full bg-gray-50 dark:bg-[#070044] rounded-lg xl:order-1 order-2">
            <div className="w-full justify-center gap-2 md:gap-10 lg:gap-20 items-center mt-4 flex">
              <div className="flex flex-col gap-4 w-full lg:w-[1200px]">
                <span className="text-[14px] sm:text-[20px] p-2 text-black dark:text-white">
                  Search the feeds by keyward
                </span>
                <Input
                  label="Search"
                  isClearable
                  radius="lg"
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-[12px] dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-xl",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focused=true]:bg-default-200/50",
                      "dark:group-data-[focused=true]:bg-default/60",
                      "!cursor-text",
                    ],
                  }}
                  placeholder="Type to search..."
                  startContent={
                    <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div
                className="lg:w-[1200px] flex justify-end mx-2 mt-4 w-full"
                data-twe-toggle="tooltip"
                title="Time Sort"
              >
                <button className="text-black dark:text-white hover:opacity-70 active:scale-95" onClick={() => setTimeSort(!isTimeSort)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col sm:w-full md:row-start-2 lg:col-start-2 mt-4 mb-6 items-center justify-center">
              <div className="flex flex-col gap-4 mt-4 justify-center mx-0 md:mx-5 lg:mx-20 xl:w-[1200px]">
                {loading ? (
                  <div
                    id="loading"
                    className="flex justify-center items-center align-middle py-2"
                  >
                    <svg viewBox="50 50 100 100" style={{ width: "5rem" }}>
                      <circle r="50" cy="100" cx="100" className="stroke-black dark:stroke-white" />
                    </svg>
                  </div>
                ) : (
                  currentTweets.map((tweet: any) => (
                    <TweetsCard key={tweet.tweetId} tweet={tweet} />
                  ))
                )}
              </div>
            </div>
            <div className="flex justify-center mb-8 p-1">
              <Pagination
                color="secondary"
                showControls
                initialPage={1}
                siblings={1}
                total={totalPage}
                page={page}
                onChange={(page: any) => setPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}