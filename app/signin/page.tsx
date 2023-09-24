"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import googleIcon from "../../public/google.svg";

const SignInPage = () => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const { data: session } = useSession({
    required: false,
  }); //client side

  const searchParams = useSearchParams();
  const callbackUrl: any = searchParams.has("callbackUrl") ? searchParams.get("callbackUrl") : "/quiz";

  useEffect(() => {
    if (session) {
      redirect(callbackUrl); //or redirect to callbackUrl
    }
  }, [session]);

  const handleSubmit = async (e: any) => {
    if (!userInfo.email || !userInfo.name) {
      toast.error("Please enter both your name and email!");
      return;
    } else {
      const toastId = toast.loading("Entering the Quiz...");
      //signin with email and name
      const res = await signIn("credentials", {
        name: userInfo.name,
        email: userInfo.email,
        redirect: true,
        callbackUrl,
      });

      if (res) {
        if (res.status === 200) {
          toast.success("Signed in successfully!", {
            id: toastId,
          });
        } else {
          toast.error("Invalid credentials!");
          return;
        }
      }
    }
  };

  return (
    <div className="min-h-full flex">
      <div className="hidden md:flex justify-center items-center w-[40%] h-100vh bg-black">
        <p className="montserrat tracking-wide text-5xl font-bold text-white inline-block">Quiz App.</p>
      </div>
      <div className="w-full md:w-[60%] h-[100vh] py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#F5F5F5]">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-4xl font-extrabold text-gray-900">Sign In</h2>
            <p className="mt-2 font-medium text-gray-800">Sign in to give the quiz</p>
          </div>
          <div className="mt-8 flex flex-col justify-center items-center">
            <button
              className="w-full flex justify-center gap-2 items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <Image src={googleIcon} alt="Google Icon" />
              <span className="text-[0.65rem] md:text-xs">Sign in with Google</span>
            </button>

            <div className="mt-6 px-5 py-8 bg-white rounded-xl w-full">
              <form action="#" method="POST" className="space-y-6">
                <div className="space-y-1 text-gray-700">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Enter your Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={userInfo.name}
                      autoComplete="current-name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })}
                    />
                  </div>
                </div>

                <div className="text-gray-700">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Enter your email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      value={userInfo.email}
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleSubmit}
                >
                  Go to Quiz
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignInPage;
