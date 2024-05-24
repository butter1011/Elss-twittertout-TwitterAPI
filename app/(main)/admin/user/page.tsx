"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { tweetUsers, articleAtoms } from '@/components/Jotai/atoms';
import { Button } from "@nextui-org/react";
import { GoPlus, GoNote, GoEye, GoTrash } from "react-icons/go";
import AddUser from '@/components/UI/Modals/AddUser';
import DeleteUser from '@/components/UI/Modals/DeleteUser';
import CountUp from 'react-countup';
import axios from 'axios';

import { useAtom } from 'jotai';
import { isAddOpen, isDeleteOpen } from '@/components/Jotai/modalAtoms';
import { Divider } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

const columns = [
  { name: "Name", uid: "name" },
  { name: "Image", uid: "avatar" },
  { name: "UserName", uid: "username" },
  { name: "Winrate", uid: "rate" },
  { name: "Description", uid: "description" },
  { name: "Action", uid: "actions" }
];

const home_columns = [
  { name: "Username", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Role", uid: "role" },
  { name: "createdAt", uid: "date" },
];


const UserPage = () => {
  const [usersData, setUsersData] = useAtom(tweetUsers);
  const [hm_users, setHomeUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [, setAddModalOpen] = useAtom(isAddOpen);
  const [, setDeleteModalOpen] = useAtom(isDeleteOpen);
  const [loading, setLoading] = useState<any>(false);

  // Page info
  const tweetsPerPage = 10;
  const startIndex = (page - 1) * tweetsPerPage;
  const endIndex = startIndex + tweetsPerPage;

  useEffect(() => {
    const getUserData = async function () {
      setLoading(true);
      await axios.post("/api/v2/twitter_data").then((res) => {
        setUsersData(res.data.users);
      });
    }

    const getHomeUserData = async function () {
      await axios.post("/api/v2/user").then((res) => {
        setHomeUsers(res.data.hm_users);
        setLoading(false);
      });
    }

    getUserData();
    getHomeUserData();
  }, [])

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <><p className="text-bold text-sm capitalize text-black dark:text-white">{user.name}</p></>
        );
      case "avatar":
        return (
          <><Avatar isBordered src={user.profile_image_url} className="w-8 h-8 rounded-full" /></>
        );
      case "username":
        return (
          <><p className="text-bold text-sm capitalize text-black dark:text-white">{user.username}</p></>
        );
      case "description":
        return (
          <><p className="text-bold text-sm capitalize text-black dark:text-white">{user.description}</p></>
        );
      case "rate":
        return (
          <><p className="text-bold text-[18px] capitalize text-purple-600 font-bold">{user.winrate}</p></>
        )
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
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => setDeleteModalOpen(user.username)}>
                <GoTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const home_renderCell = React.useCallback((user: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <><p className="text-bold text-center text-sm text-black dark:text-white">{user.username}</p></>
        );
      case "email":
        return (
          <><p className="text-bold text-center text-sm text-black dark:text-white">{user.email}</p></>
        );
      case "role":
        return (
          <><p className="text-bold text-center text-sm text-black dark:text-white">{user.role}</p></>
        );
      case "date":
        return (
          <><p className="text-bold text-center text-sm text-black dark:text-white">{user.createdAt}</p></>
        )
    }
  }, []);

  return (
    <>
      <div className='flex flex-col gap-10 w-full justify-start'>
        <div className="flex items-center space-x-64 text-[16px] text-black dark:text-white justify-center py-6">
          <div className='flex flex-col text-center p-4 gap-2'>
            <p className='text-5xl'>
              <CountUp end={usersData?.length} duration={2} />
            </p>
            <p className='text-small'>Twitter Users</p>
          </div>
          <Divider orientation="vertical" className='bg-white h-16' />
          <div className='flex flex-col text-center p-4 gap-2'>
            <p className='text-5xl'>
              <CountUp end={hm_users?.length} duration={2} />
            </p>
            <p className='text-small'>HomePage Users</p>
          </div>
        </div>
        <div className='flex flex-col gap-10 px-4'>
          <div className='flex flex-col justify-between px-2'>
            <div className='flex justify-end'>
              <Button color="secondary" className='text-[12px] w-32' variant="shadow" startContent={<GoPlus size={18} />} onClick={() => setAddModalOpen(true)}>
                Add user
              </Button>
            </div>
            {
              loading ?
                <div id="loading" className="flex justify-center items-center align-middle">
                  <svg viewBox="50 50 100 100" style={{ width: '5rem' }}>
                    <circle r="50" cy="100" cx="100" className='dark:stroke-white stroke-purple-700 stroke-[3px]' />
                  </svg>
                </div> : <>
                  <Tabs key={"full"} radius={"full"} aria-label="Tabs radius">
                    <Tab key="twitter" title="Twitter User">
                      <Table className="flex justify-end" aria-label='UserTable' aria-labelledby='UserTable'>
                        <TableHeader columns={columns}>
                          {(column: any) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className='text-center'>
                              {column.name}
                            </TableColumn>
                          )}
                        </TableHeader>
                        <TableBody items={usersData?.slice(startIndex, endIndex)}>
                          {(item: any) => (
                            <TableRow key={item?.username} className='hover:dark:bg-purple-600 hover:bg-gray-300 border-b-1 dark:border-gray-500 my-2'>
                              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <div className="flex justify-center mb-8 p-1">
                        <Pagination
                          color="secondary"
                          showControls
                          initialPage={1}
                          siblings={1}
                          total={Math.ceil(usersData?.length / 10)}
                          page={page}
                          onChange={(page: any) => setPage(page)}
                        />
                      </div>
                    </Tab>
                    <Tab key="homepage" title="Home User">
                      <Table className="flex justify-end" aria-label='UserTable' aria-labelledby='UserTable'>
                        <TableHeader columns={home_columns}>
                          {(column: any) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className='text-center'>
                              {column.name}
                            </TableColumn>
                          )}
                        </TableHeader>
                        <TableBody items={hm_users?.slice(startIndex, endIndex)}>
                          {(item: any) => (
                            <TableRow key={item?.email} className='hover:dark:bg-purple-600 hover:bg-gray-300 border-b-1 dark:border-gray-500 my-2'>
                              {(columnKey) => <TableCell>{home_renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <div className="flex justify-center mb-8 p-1">
                        <Pagination
                          color="secondary"
                          showControls
                          initialPage={1}
                          siblings={1}
                          total={Math.ceil(hm_users?.length / 10)}
                          page={page}
                          onChange={(page: any) => setPage(page)}
                        />
                      </div>
                    </Tab>
                  </Tabs>
                </>
            }
          </div>
        </div>
      </div>
      <AddUser />
      <DeleteUser />
    </>
  )
}

export default UserPage