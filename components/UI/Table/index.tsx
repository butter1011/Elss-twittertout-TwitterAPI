import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Tooltip, getKeyValue, Button } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { GoPlus, GoNote, GoEye, GoTrash } from "react-icons/go";
import { isAddOpen, isDeleteOpen } from '@/components/Jotai/modalAtoms';
import { useAtom } from 'jotai';
import { useState } from 'react';

const columns = [
    { name: "UserName", uid: "user" },
    { name: "Tweet Content", uid: "text" },
    { name: "Posted At", uid: "posted_at" },
    { name: "Action", uid: "actions" },
];

const TweetTable = ({ loading, pageTweet }: any) => {
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [, setDeleteModalOpen] = useAtom(isDeleteOpen);

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
                        <Tooltip content="Edit user" className='text-black dark:text-white'>
                            <span className="text-lg text-black dark:text-white cursor-pointer active:opacity-50">
                                <GoNote />
                            </span>
                        </Tooltip>
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
        <>
            {
                loading ?
                    <div id="loading" className="flex justify-center items-center align-middle">
                        <svg viewBox="50 50 100 100" style={{ width: '5rem' }}>
                            <circle r="50" cy="100" cx="100" className='dark:stroke-white stroke-purple-700 stroke-[3px]' />
                        </svg>
                    </div>
                    :
                    pageTweet?.length > 0 &&
                    <Table className="flex justify-end h-full" aria-label='UserTable' aria-labelledby='UserTable'>
                        <TableHeader columns={columns}>
                            {(column: any) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className='text-center'>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={pageTweet}>
                            {(item: any) => (
                                <TableRow key={item?._id} className='hover:dark:bg-purple-600 hover:bg-gray-300 border-b-1 dark:border-gray-500'>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
            }
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
        </>
    )
}

export default TweetTable