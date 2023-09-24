"use client";

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

  return (
    <div className="flex flex-col">
      <Navbar session={session} />
      <main className="items-stretch bg-[#F5F5F5]">
        <HomeLayout />
      </main>
    </div>
  );
};

export default QuizPage;
