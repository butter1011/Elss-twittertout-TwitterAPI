'use client'
import React from "react";
import { NavbarMenuToggle, Navbar, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import Cookies from "universal-cookie"
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../Jotai/atoms"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { GoMoon } from "react-icons/go";
import { GoSun } from "react-icons/go";
import { LuBird } from "react-icons/lu";

export default function App() {
    const [user, setLoggedIn] = useAtom(isLoggedInAtom);
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    const menuItems = [
        "Home",
        "FAQs",
        "Contact US",
        "Login",
    ];

    const handleClick = () => {
        if (theme == 'light') {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }

    const handleSignOut = async () => {
        const cookies = new Cookies();
        cookies.remove('token', { path: '/' });
        signOut();
        setLoggedIn(false);
    }

    useEffect(() => {
        if (session) setLoggedIn(session?.user)
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Navbar maxWidth="full" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-white dark:bg-[#38117F]">
            <NavbarBrand>
                <Link href="/" className="flex flex-row gap-2">
                    <LuBird className="text-black text-[30px] dark:text-white" />
                    <p className="hidden sm:flex font-bold font-serif text-black text-[20px] dark:text-white italic">Twitter Touts</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden lg:flex gap-6" justify="end">
                <NavbarItem className="p-2">
                    <Link href="#" color={`${pathname.includes('home') ? "warning" : "foreground"}`}>
                        HOME
                    </Link>
                </NavbarItem>
                <NavbarItem className="p-2">
                    <Link href="#" aria-current="page" color="foreground">
                        FAQS
                    </Link>
                </NavbarItem>
                <NavbarItem className="p-2">
                    <Link color="foreground" href="#">
                        Contact US
                    </Link>
                </NavbarItem>
                {user ?
                    <NavbarItem className="p-2">
                        <Link className={`${pathname.includes('feeds') ? "text-orange-500 font-bold" : "text-black dark:text-white"}`} href="/feeds">
                            Feeds
                        </Link>
                    </NavbarItem>
                    : <></>
                }
                {user ?
                    <NavbarItem className="p-2">
                        <Link className={`${pathname.includes('admin') ? "text-orange-500 font-bold" : "text-black dark:text-white"}`} href="/admin/user">
                            Admin
                        </Link>
                    </NavbarItem>
                    : <></>
                }
            </NavbarContent>

            <NavbarContent as="div" justify="end" className="max-w-[300px]">
                <Switch
                    defaultSelected
                    onClick={handleClick}
                    size="lg"
                    color="secondary"
                    thumbIcon={
                        theme === "light" ? (
                            <GoSun />
                        ) : (
                            <GoMoon />
                        )}
                />
                {user ?
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color={`${theme === "light" ? "secondary" : "default"}`}
                                name=""
                                size="sm"
                                src={user?.image}
                            />
                        </DropdownTrigger>
                        <DropdownMenu variant="flat" className="bg-gray-50 dark:bg-[#732CD8] rounded-lg">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold text-black dark:text-white">Signed in as</p>
                                <p className="font-semibold text-black dark:text-white">{user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" className="text-black dark:text-white">My Settings</DropdownItem>
                            <DropdownItem key="help_and_feedback" className="text-black dark:text-white">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" className="text-black dark:text-white" onClick={handleSignOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    : <>
                        <Link href="/login" className="hidden sm:flex">
                            <Button variant="bordered" className="border-black dark:border-white hover:dark:bg-gray-700 hover:bg-gray-200 text-black dark:text-white">Login</Button>
                        </Link>
                    </>
                }
            </NavbarContent>
            <NavbarContent justify="end" className="max-w-[30px]">
                <NavbarContent className="lg:hidden" justify="center">
                    <NavbarMenuToggle />
                </NavbarContent>
            </NavbarContent>
            <NavbarMenu className="flex gap-10 py-8">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        {item === "Login" && user ?
                            <Link
                                className="w-full text-[28px] font-bold flex flex-col"
                                color={
                                    index === menuItems.length - 1 ? "primary" : "foreground"
                                }
                                href={`/feeds`}
                                size="lg"
                            >
                                Feeds
                            </Link>
                            :
                            <Link
                                className="w-full text-[28px] font-bold flex flex-col"
                                color={
                                    index === menuItems.length - 1 ? "primary" : "foreground"
                                }
                                href={`/${item.toLowerCase()}`}
                                size="lg"
                            >
                                {item}
                            </Link>
                        }
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
