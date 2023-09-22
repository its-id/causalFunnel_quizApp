"use client";

import toast, { Toaster } from "react-hot-toast";

import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import profileIcon from "@/public/profileIcon.svg";
// import bellIcon from "../../../public/dashbaord/bellIcon.svg";
// import searchIcon from "../../../public/dashbaord/searchIcon.svg";
// import menuIcon from "../../../public/dashbaord/menuIcon.svg";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ session, setSidebarOpen }: any) => {
  return (
    <div className="sticky top-0 flex-shrink-0 flex min-h-16 py-6 bg-[#0e1111] text-white">
      <div className="flex-1 flex px-4 justify-between">
        <div className="hidden flex-1 px-4 sm:flex items-center">
          <p className="tracking-wide font-bold text-xl">Welcome to the Quiz!</p>
        </div>
        <div className="flex-1 md:flex-0 flex items-stretch justify-end items-center md:ml-6 rounded-lg">
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 mx-4 md:mx-6 border border-transparent text-xs shadow-sm font-medium rounded text-white bg-blue-950"
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="-ml-1 mr-3 h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Timer
          </button>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            End Quiz
          </button>

          <div className="mx-4 flex items-center md:mx-6">
            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  {session?.user?.image && session?.user?.image ? (
                    <img src={session?.user?.image} className="h-8 w-8 rounded-full" />
                  ) : (
                    <p className="h-8 w-8 inline-flex justify-center items-center border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      {session?.user?.name && session?.user?.name[0].toUpperCase()}
                    </p>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right z-10 bg-white absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <button disabled className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-300 w-full text-left">
                      {/* {session?.user?.email ? session?.user?.email : userEmail} */}
                      {session?.user?.name && session?.user?.name}
                    </button>
                  </Menu.Item>

                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a href={item.href} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          signOut();
                          toast.success("Signed out successfully");
                        }}
                        className={classNames(active ? "bg-gray-100" : "", "text-left w-full block px-4 py-2 text-sm text-gray-700")}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
