"use client";

// import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

const AppContext: any = createContext(null);

export const AppProvider = ({ children }: any) => {
  const [quizData, setQuizData] = useState<any>([]);

  const fetchQuizData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    const data = await response.json();
    console.log("response data", data);
    // setQuizData(data.results);
  };

  //write a function to call fetch api from link https://opentdb.com/api.php?amount=15 store the results in quizData
//   useEffect(() => {
//     fetchQuizData();
//   }, []);

  return (
    <AppContext.Provider
      value={{
        quizData,
        setQuizData,
        fetchQuizData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
