"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import HomeLayout from "@/components/HomeLayout/HomeLayout";

const QuizPage = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackUrl=/quiz");
    },
  }); //client side

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Navbar session={session} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 bg-[#F5F5F5]">
        <HomeLayout />
      </main>
    </div>
  );
};

export default QuizPage;
