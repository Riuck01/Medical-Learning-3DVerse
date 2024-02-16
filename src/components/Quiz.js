import React from 'react';

export const Quiz = ({ question, handleAnswerClick, quizPhase }) => {
  return (
    <div>
      <h2 class="my-4">{question.question}</h2>
      <div class="border-b border-black"></div>

      <div class="flex">
        {question.options.map((option, index) => (
          <button
            class="flex-1 rounded-full bg-black bg-opacity-30 hover:bg-opacity-40 hover:bg-opacity-60 text-white flex items-center justify-center w-full p-4 m-2 border border-black text-lg"
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={quizPhase === 'correction'}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};