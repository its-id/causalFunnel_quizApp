import React, { useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import OverviewPanel from "../OverviewPanel/OverviewPanel";
import QCardComponent from "../QCardComponent/QCardComponent";
import AppContext from "@/context/AppContext";

const HomeLayout = () => {
  const { userQuizData, getUserQuizData, showReport, endQuiz, setShowReport, score, currentQuestion, setCurrentQuestion }: any =
    useContext(AppContext);
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    getUserQuizData();
  }, []);

  //if current question from overview panel is changed, currrent slide should change too
  useEffect(() => {
    if(swiper){
      // swiper.slideTo(currentQuestion);
      //above code gives following error sometimes: Cannot read properties of undefined (reading 'speed')
      //this can be fixed by following code
      swiper.slideTo(currentQuestion, 0);
    }
  }, [currentQuestion]);

  if (!userQuizData.length) return <div className="min-h-[85vh] flex justify-center items-center"><span className="loader"></span></div>;

  return (
    <div className="flex flex-col min-h-[85vh]">
      {!endQuiz || showReport ? <OverviewPanel /> : <></>}

      {endQuiz && !showReport ? (
        <div className="w-[90%] md:w-1/2 min-h-[50vh] mx-auto mt-10 px-5 py-8 bg-white rounded-xl">
          <div className="flex flex-col items-center space-y-12">
            <p className="text-lg text-gray-800 font-medium">Quiz has been submitted successfully!</p>
            <p className="text-4xl">
              You scored{" "}
              <span className={`font-bold ${score < 10 ? "text-orange-700" : score < 20 ? "text-orange-500" : "text-green-600"}`}>{score}</span>
              <span className="font-bold">/30</span>!
            </p>
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 mt-[50%] border border-transparent text-lg font-medium rounded shadow-sm text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setShowReport(true);
              }}
            >
              Show Report
            </button>
          </div>
        </div>
      ) : (
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          navigation={true}
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => setCurrentQuestion(swiper.activeIndex)}
        >
          {userQuizData &&
            userQuizData?.length > 0 &&
            userQuizData.map((item: any, index: number) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="w-[90%] md:w-1/2 min-h-[50vh] mx-auto mt-10 px-5 py-8 bg-white rounded-xl">
                    <QCardComponent currQCardItem={item} setCurrentQuestion={setCurrentQuestion} />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </div>
  );
};

export default HomeLayout;
