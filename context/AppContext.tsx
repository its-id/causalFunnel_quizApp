"use client";

import { createContext, useState } from "react";

interface UserQuizDataProps {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  category: string;
  userAnswer: string;
}

const AppContext: any = createContext(null);

export const AppProvider = ({ children }: any) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [userQuizData, setUserQuizData] = useState<UserQuizDataProps[]>([]);

  const formatText = (text: string) => {
    //replace symbols like &quot; etc with their respective characters
    return text.replace(/(&quot;|&#039;|&amp;|&shy;)/g, (match) => {
      switch (match) {
        case "&quot;":
          return '"';
        case "&#039;":
          return "'";
        case "&amp;":
          return "&";
        case "&shy;":
          return "-";
        default:
          return match;
      }
    });
  };

  //fetch quiz data from opentdb api and push into userQuizData format
  const getUserQuizData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    const data = await response.json();
    const tempUserQuizData: UserQuizDataProps[] = [];
    data.results.length > 0 &&
      data.results.forEach((q: any, index: number) => {
        const combineOptions = [...q.incorrect_answers, q.correct_answer];
        const shuffledOptions = combineOptions.sort(() => Math.random() - 0.5);

        tempUserQuizData.push({
          id: index,
          userAnswer: "",
          question: formatText(q.question),
          correctAnswer: q.correct_answer,
          difficulty: q.difficulty,
          options: shuffledOptions,
          category: q.category,
        });
      });

    setUserQuizData(tempUserQuizData);
  };

  const selectAnswer = (answer: string) => {
    const tempUserQuizData = [...userQuizData];
    tempUserQuizData[currentQuestion] = {
      ...userQuizData[currentQuestion],
      userAnswer: answer,
    };
    setUserQuizData(tempUserQuizData);
  };

  const calculateScore = () => {
    let tempScore = 0;
    userQuizData.forEach((item: any) => {
      if (item.userAnswer === item.correctAnswer) {
        tempScore += 1;
      }
    });
    setScore(tempScore);
  }

  return (
    <AppContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        endQuiz,
        setEndQuiz,
        showReport,
        setShowReport,
        score,
        setScore,
        userQuizData,
        selectAnswer,
        getUserQuizData,
        calculateScore,
        formatText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
