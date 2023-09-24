import React, { useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AppContext from "@/context/AppContext";

//component showing all questions in the above row
const OverviewPanel = () => {
  const { userQuizData, currentQuestion, setCurrentQuestion, showReport }: any = useContext(AppContext);

  return (
    <div className="py-2 px-2 w-[100vw] flex overflow-x-auto justify-start md:justify-center shadow-lg gap-x-2 md:gap-x-4 bg-white">
      {userQuizData &&
        userQuizData?.length > 0 &&
        userQuizData.map((item: any) => {
          return (
            <button
              key={item.id}
              onClick={() => setCurrentQuestion(item.id)}
              type="button"
              className={`w-8 h-8 inline-flex justify-center items-center border text-xs md:text-sm md:text-base rounded-full shadow-sm ${
                currentQuestion === item.id
                  ? `border-2 ${
                      !showReport || !item.userAnswer
                        ? "border-indigo-600"
                        : item.userAnswer == item.correctAnswer
                        ? "border-green-700"
                        : "border-red-700"
                    } bg-white ${
                      !showReport || !item.userAnswer ? "text-indigo-600" : item.userAnswer == item.correctAnswer ? "text-green-800" : "text-red-800"
                    }`
                  : item.userAnswer
                  ? `${!showReport ? "bg-indigo-500" : item.userAnswer == item.correctAnswer ? "bg-green-700" : "bg-red-700"} hover:${
                      !showReport ? "bg-indigo-700" : item.userAnswer == item.correctAnswer ? "bg-green-800" : "bg-red-800"
                    } text-white`
                  : "bg-gray-400 hover:bg-gray-500 text-white"
              }`}
            >
              {item.id + 1}
            </button>
          );
        })}
    </div>
  );
};

export default OverviewPanel;
