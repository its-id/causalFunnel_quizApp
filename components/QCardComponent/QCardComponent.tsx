import react, { useContext, useEffect } from "react";
import OptionsCardComponent from "../OptionsCardComponent/OptionsCardComponent";
import AppContext from "@/context/AppContext";

export interface QCardComponentProps {
  title: string;
  description: string;
}

//component showing question and options
const QCardComponent = ({ currQCardItem }: any) => {
  const { selectAnswer, showReport, formatText }: any = useContext(AppContext);

  return (
    <>
      <div className="flex items-center gap-x-3">
        <p className="text-xl font-semibold">Q{currQCardItem.id + 1}.</p>
        <p className="text-lg text-left">{currQCardItem.question}</p>
      </div>
      <OptionsCardComponent
        shuffledOptions={currQCardItem.options}
        currAnswer={currQCardItem.userAnswer}
        correctAnswer={currQCardItem.correctAnswer}
        selectAnswer={selectAnswer}
        showReport={showReport}
        formatText={formatText}
      />
    </>
  );
};

export default QCardComponent;
