import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

//component showing all options for a question
const OptionsCardComponent = ({ shuffledOptions, currAnswer, selectAnswer, correctAnswer, showReport }: any) => {
  const [selected, setSelected] = useState(currAnswer);

  const handleSelectAnswer = (answer: string) => {
    setSelected(answer);
    selectAnswer(answer);
  };

  return (
    <div className="mt-5 flex flex-col gap-y-2">
      <RadioGroup value={selected} onChange={(answer) => handleSelectAnswer(answer)}>
        <RadioGroup.Label className="sr-only">Question Answers</RadioGroup.Label>
        <div className="relative bg-white rounded-md space-y-4">
          {shuffledOptions.map((option: string, index: number) => (
            <RadioGroup.Option
              key={index}
              value={option}
              disabled={showReport}
              className={({ checked }) =>
                classNames(
                  index === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  index === shuffledOptions.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                  checked
                    ? `border-2 ${
                        !showReport ? "bg-indigo-50 border-indigo-400" : option == correctAnswer ? "border-green-500" : "border-red-500"
                      } z-10`
                    : `${!showReport ? "border-gray-200 " : option === correctAnswer && !checked ? "border-green-500 " : ""}`,
                  `relative bg-white border rounded-lg shadow-sm px-6 py-4 flex flex-col ${
                    !showReport ? "cursor-pointer" : "cursor-default"
                  } md:pl-4 md:pr-6 md:grid md:grid-cols-2 focus:outline-none`
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center text-sm">
                    <span
                      className={classNames(
                        checked
                          ? `${!showReport ? "bg-indigo-600" : option === correctAnswer ? "bg-green-600" : "bg-red-600"} border-transparent`
                          : "bg-white border-gray-300",
                        active
                          ? `ring-2 ring-offset-2 ${!showReport ? "ring-indigo-500" : option === correctAnswer ? "ring-green-600" : "ring-red-600"}`
                          : "",
                        "h-4 w-4 rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked
                          ? `${!showReport ? "text-indigo-900" : option === correctAnswer ? "text-green-800" : "text-red-800"}`
                          : "text-gray-900",
                        "ml-3 flex-1 flex font-medium"
                      )}
                    >
                      <span className="mr-2">{String.fromCharCode("A".charCodeAt(0) + index)}.</span>
                      {/* make the span left aligned and remove extra spaces */}
                      <span className="text-left">{option}</span>
                    </RadioGroup.Label>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default OptionsCardComponent;
