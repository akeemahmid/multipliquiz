"use client";
import React, { useState } from "react";
import { quiz } from "../app/data/data";
import congrat from "../public/congrat.png";
type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

interface Quiz {
  questions: Question[];
}

interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

import Image from "next/image";
import logo from "../public/multiimage.png";

const Entrypage = () => {
  const { questions } = quiz as Quiz;

  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswerIsCorrect, setSelectedAnswerIsCorrect] = useState<
    boolean | null
  >(null); // null | true | false
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const current = questions[activeQuestion];

  const onAnswerSelected = (answer: string, index: number) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    setSelectedAnswerIsCorrect(answer === current.correctAnswer);
  };

  const nextQuestion = () => {
    setResult((prev) =>
      selectedAnswerIsCorrect
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }

    setChecked(false);
    setSelectedAnswerIndex(null);
    setSelectedAnswerIsCorrect(null);
  };

  const totalPoints = questions.length * 5 || 1;
  const percent = Math.round((result.score / totalPoints) * 100);
  return (
    <>
      <nav className=" w-full bg-[#090a0c] text-[#FFFFFFB2] border-1 border-[#3a2d52] rounded-4xl mt-7 py-4 px-4 md:px-8 sticky  ">
        <div className="flex items-center justify-between">
          <a href="https://multipli.fi/">
            <Image src={logo} alt="name" className="w-[90px] md:w-[150px]" />
          </a>
          <h3 className="font-semibold text-[16px] md:text-xl md:font-bold">
            Knowledge Quiz
          </h3>
        </div>
      </nav>

      <main className="w-full flex items-center justify-center mt-[15%] md:mt-[10%]">
        {!showResult ? (
          <section className="w-auto md:max-w-[500px] md:w-[500px] rounded-3xl border-1 border-[#3a2d52] shadow-xs shadow-[#a66cff] ">
            <h1 className="text-center p-4  border-b-1 border-[#3a2d52] font-bold text-3xl text-white">
              Questions
            </h1>
            <div className="flex justify-between items-center gap-3  p-4 border-b-1 border-[#3a2d52]">
              <h3 className="font-semibold text-[16px] md:text-xl md:font-bold">
                Progress
              </h3>

              <span className="text-white font-bold">
                {Math.min(activeQuestion + 1, questions.length)} /{" "}
                {questions.length}
              </span>
            </div>

            <main className="mt-5">
              <div className="p-5  shadow-2xl rounded-3xl text-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-7">
                    {current.question}
                  </h3>

                  <ul className=" grid grid-cols-1 gap-3 mb-3 text-left">
                    {current.answers.map((answer, index) => (
                      <li
                        key={index}
                        onClick={() => onAnswerSelected(answer, index)}
                        className={`hover:text-lg transition-all transform ease-in-out duration-300 delay-100
                   ${
                     selectedAnswerIndex === index
                       ? "border-2 border-[#a66cff] p-3 rounded-xl text-white text-lg"
                       : "p-3 rounded-xl border-[#3a2d52] border-2 hover:border-[#a66cff] text-[16px]"
                   }`}
                      >
                        <span>{answer}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={nextQuestion}
                    className={` rounded-2xl text-lg text-white border-[#a66cff] border-1 py-3 px-7 mt-7 cursor-pointer hover:text-xl transition-all transform ease-in-out duration-300 delay-100`}
                    disabled={!checked}
                  >
                    {activeQuestion === questions.length - 1
                      ? "Submit"
                      : "Next Question"}
                  </button>
                </div>
              </div>
            </main>
          </section>
        ) : (
          <section className="flex flex-col items-center w-auto text-center md:max-w-[500px] md:w-[500px] rounded-3xl border-1 border-[#3a2d52] shadow-xs shadow-[#a66cff] p-5">
            <div className="flex items-center  justify-center  border-1 border-[#3a2d52] rounded-full p-5 mb-7">
              <Image src={congrat} alt="name" width={50} height={50} />
            </div>
            <h1 className=" mb-3 font-bold text-3xl text-white">
              Quiz Completed!
            </h1>
            <h4 className="font-semibold text-lg text-white">
              {`Here's how you performed`}
            </h4>

            <div className="w-full space-y-3  rounded-3xl py-5 my-[7%] border-1 border-[#3a2d52] shadow-xs shadow-[#a66cff] text-white font-bold">
              <h3 className="text-2xl">
                Total score : <span>{percent} %</span>
              </h3>
              <h3 className="text-2xl">
                Correct Answers :{" "}
                <span className="text-xl font-semibold text-green-700 ">
                  {result.correctAnswers}
                </span>
              </h3>
              <h3 className="text-2xl">
                Wrong Answers :{" "}
                <span className="text-xl font-semibold text-red-700">
                  {result.wrongAnswers}
                </span>
              </h3>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="hover:text-xl transition-all transform ease-in-out duration-300 delay-100 text-lg text-white font-bold cursor-pointer hover:bg-gradient-to-r hover:border-none from-[#a66cff] to-[#3E3170] rounded-3xl py-3 border-1 border-[#3a2d52] shadow-xs shadow-[#a66cff] w-full"
            >
              Take Quiz Again
            </button>
          </section>
        )}
      </main>
    </>
  );
};

export default Entrypage;
