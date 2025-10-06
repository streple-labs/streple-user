import { test_data } from "@/assets/gamification-lessons/data";
import { getRandomQuestions } from "@/utils/utils";
import { Dispatch, SetStateAction, useState } from "react";

export default function Quiz({
  level,
  phase,
  setStpCollected,
  next,
}: {
  level: number;
  phase: 1 | 2;
  setStpCollected: Dispatch<SetStateAction<number>>;
  next: () => void;
}) {
  const [quizForm, setQuizForm] = useState<Record<number, number | null>>({
    0: null,
  });
  const [quizResults, setQuizResults] = useState<
    Record<number, boolean | null>
  >({
    0: null,
  });

  const [quizFormQuestions] = useState(() =>
    getRandomQuestions(test_data[phase][level - 1], 1)
  );

  return (
    <div className="border border-white/10 rounded-[20px] p-6 flex flex-col items-center gap-10">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/50">1/1</p>
          <button className="text-underline font-semibold text-sm text-white/50">
            Skip quiz
          </button>
        </div>
        <p className="text-xl font-semibold text-white/80">
          {quizFormQuestions[0].question}
        </p>
      </div>
      <div className="space-y-4 md:space-y-8 w-full">
        {quizFormQuestions[0].options.map((option, i) => (
          <button
            key={i}
            disabled={quizResults[0] !== null}
            className={`w-full rounded-3xl border-[5px] ${
              quizForm[0] == i
                ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                : quizForm[0] === i && quizResults[0] === true
                ? "border-[#009632B2] shadow-[0px_5px_0px_0px_#00963299] bg-[#0096321A]"
                : quizForm[0] === i && quizResults[0] === false
                ? "bg-[#F982821A] border-[#F98282B2] shadow-[0px_5px_0px_0px_#F9828299]"
                : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
            } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4 disabled:opacity-100!`}
            onClick={() => {
              setQuizForm((prev) => ({
                ...prev,
                [0]: i,
              }));
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {quizResults[0] === null && (
        <button
          onClick={() => {
            setQuizResults((prev) => ({
              ...prev,
              [0]: quizForm[0] === quizFormQuestions[0].answer,
            }));
            if (quizForm[0] === quizFormQuestions[0].answer)
              setStpCollected((prev) => prev + 5);
          }}
          disabled={quizForm[0] === null}
          className={`${
            quizForm[0] === null && "grayscale-100"
          } text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[15px] h-[55px] w-full md:w-[214px]`}
        >
          Check
        </button>
      )}

      {quizResults[0] !== null && (
        <>
          <p className="text-base w-full font-semibold text-[#BEBBC6]">
            {quizFormQuestions[0].info}
          </p>

          <button
            onClick={next}
            className={`${
              quizResults[0] === true
                ? "text-[#181812B2] bg-[#009632]"
                : quizResults[0] === false
                ? "text-[#000000B2] bg-[#F98282]"
                : "text-[#F1F0DFB2] bg-[#414139]"
            } text-base font-bold flex items-center justify-center rounded-[10px] h-[60px] w-full md:w-[214px]`}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
