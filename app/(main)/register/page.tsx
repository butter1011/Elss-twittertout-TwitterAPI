'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { ToastContext } from "@/components/Contexts/ToastContext";
import axios from "axios";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";

const Signup = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const { toast } = useContext<any>(ToastContext);
  const router = useRouter();

  const initValue = () => {
    setEmail("");
    setConfirmPassword ("");
    setPassword("");
  }

  const onSignUp = async () => {
    const isPasswordValid = password === confirmPassword;
    const isEmailValid = /^\S+@\S+$/.test(email);

    if(!isEmailValid){
      toast.error("Please input the email like: example@domain.com");
      initValue();
      return;
    }

    if(!isPasswordValid){
      toast.error("Passwords do not match");
      initValue();
      return;
    }
    
    if(password.length < 8){
      toast.error("Password is too weak");
      initValue();
      return;
    }

    setLoading(true);
    await axios.post('/api/auth/register', {
      email,
      password
    }).then((res) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if(res.data.status === 402){
        toast.error(res.data.message);
      }
      
      if(res.data.status === 200){
        toast.success(res.data.message);
        router.push("/login");
      }
    }).catch((err) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      toast.error("Internal Server error");
    })
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#070044]">
      <div className="flex flex-col items-center justify-center w-full max-w-sm px-8 py-12 bg-gray-50 dark:bg-[#38117F] rounded-lg shadow-md gap-4">
        <p className="text-2xl font-bold text-black dark:text-white">Sign Up</p>
        <p className="text-lg text-black dark:text-white">
          Do you know about&nbsp;
          <Link href="">
            <span className="underline cursor-pointer">our policy</span>?
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
            type="email"
            className="w-full outline outline-1 rounded-sm py-1 px-2 bg-gray-100 dark:bg-[#24006C] text-black dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm w-full flex justify-start mb-1 text-black dark:text-white">Password</p>
          <input
            type="password"
            className="w-full outline outline-1 rounded-sm py-1 px-2 bg-gray-100 dark:bg-[#24006C] text-black dark:text-white"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm w-full flex justify-start mb-1 text-black dark:text-white">
            Confirm Password
          </p>
          <input
            type="password"
            className="w-full outline outline-1 rounded-sm py-1 px-2 bg-gray-100 dark:bg-[#24006C] text-black dark:text-white"
            onChange={(e)=> setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button className={`${loading?'opacity-50':''} flex items-center justify-center w-full px-4 py-2 gap-4 text-sm font-medium text-white bg-blue-800 rounded-md shadow-md hover:opacity-90 bg-gradient-to-l from-[#FF8D35] from-[0%] to-[#F01111] mt-2 `} disabled={loading} onClick={onSignUp}>
          { loading ? 
            <div id="loading">
              <svg viewBox="10 10 20 20">
                <circle r="10" cy="20" cx="20"></circle>
              </svg>
            </div>
            : "Sign Up"
          }
        </button>
        <p className="text-md w-full flex justify-center gap-4">
          <span className="text-black dark:text-white">Already have an account?</span>
          <Link href="/login">
            <span className="underline cursor-pointer mb-1 text-black dark:text-white">sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
