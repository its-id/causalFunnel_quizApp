import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import QuizPage from "./quiz/page";

const Home = async () => {
  const session = await getServerSession(authOptions); //server side auth

  if (!session) {
    redirect("/signin?callbackUrl=/quiz");
  }

  return (
    <>
      <QuizPage />
    </>
  );
};

export default Home;
