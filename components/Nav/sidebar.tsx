'use client'
import React from 'react'
import Link from 'next/link';
import { GoCommentDiscussion, GoPeople, GoBell, GoPackage } from "react-icons/go";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const currentPath = usePathname();

    return (
        <aside id="default-sidebar" className="flex left-0 z-20 transition-transform -translate-x-full sm:translate-x-0">
            <div className="p-4 rounded-xl overflow-y-auto bg-white dark:bg-[#732CD8] w-64">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="/admin/dashboard" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPath.includes("dashboard") ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                            <GoPackage size={20} />
                            <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/inbox" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPath.includes("inbox") ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                            <GoBell size={20} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/user" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPath.includes("user") ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                            <GoPeople size={20} />  
                            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/tweets" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPath.includes("tweets") ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                            <GoCommentDiscussion size={20} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Tweets</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar