'use client'
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { ToastContext } from "@/components/Contexts/ToastContext";
import axios from "axios";
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa6";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/components/Jotai/atoms";

const Signin = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const { toast } = useContext<any>(ToastContext);
  const router = useRouter();
  const [user, setLoggedIn] = useAtom(isLoggedInAtom);

  const handleSignin = async ()=>{
    if(email && password){
      setLoading(true);
      await axios.post('/api/auth/login', {
        email,
        password
      }).then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        
        if(res.data.status === 402 || res.data.status === 403){
          toast.error(res.data.message);
        }
        
        if(res.data.status === 200){
          toast.success("Successfully logged in");
          setLoggedIn(res?.data);
          router.push("/feeds")
        }
      }).catch(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        toast.error("Internal Server error");
      })
    } else {
      setEmail("")
      setPassword("")
      toast.error("Please input password is incorrect");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#070044]">
      <div className="flex flex-col items-center justify-center w-full max-w-sm px-8 py-12 bg-gray-50 dark:bg-[#38117F] rounded-lg shadow-md gap-5">
        <p className="text-2xl font-bold text-black dark:text-white">Sign In</p>
        <p className="text-md gap-2 flex flex-row">
          <span className="text-black dark:text-white">Do you know about</span>
          <Link href="">
            <span className="underline cursor-pointer text-black dark:text-white">our policy</span>?
          </Link>
        </p>
        <button className="flex items-center justify-center w-full px-4 py-2 gap-4 text-sm font-medium text-white bg-[#24006C] rounded-md shadow-md hover:opacity-80 bg-gradient-to-l from-[#FF8D35] from-[0%] to-[#F01111] mt-2" onClick={() => signIn('google', {callbackUrl:'/feeds'})}>
          <FaGoogle className="text-[18px]" />
          Continue with Google
        </button>
        <div className="flex items-center justify-center w-full mt-4 gap-4">
          <div className="border-b border-gray-400 w-1/12"></div>
          <p className="text-black dark:text-white">Or using your email</p>
          <div className="border-b border-gray-400 w-1/12"></div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm w-full flex justify-start mb-1 text-black dark:text-white">Email</p>
          <input
            id="email"
            type="text"
            className="w-full outline outline-1 rounded-sm py-1 px-2 bg-gray-100 dark:bg-[#24006C] text-black dark:text-white"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm w-full flex justify-between">
            <span className="text-black dark:text-white">Password</span>
            <span className="underline cursor-pointer mb-1 text-black dark:text-white">
              Forgot Password?
            </span>
          </p>
          <input
            id="password"
            type="password"
            className="w-full outline outline-1 rounded-sm py-1 px-2 bg-gray-100 dark:bg-[#24006C] text-black dark:text-white"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button className={`${loading?'opacity-50':''} flex items-center justify-center w-full px-4 py-2 gap-4 text-sm font-medium text-white bg-gradient-to-l from-[#FF8D35] from-[0%] to-[#F01111] rounded-md shadow-md hover:opacity-80 mt-2`} disabled={loading} onClick={handleSignin}>
          { loading ? 
            <div id="loading">
              <svg viewBox="10 10 20 20">
                <circle r="10" cy="20" cx="20"></circle>
              </svg>
            </div>
            : "Sign In"
          }
        </button>
        <p className="text-md w-full flex justify-center gap-4">
          <span className="text-black dark:text-white">Don&apos;t you have account?</span>
          <Link href="/register">
            <span className="underline cursor-pointer mb-1 text-black dark:text-white">sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
