import React from 'react';

export const Quiz = ({ question, handleAnswerClick, quizPhase }) => {
  return (
    <div>
      <h2 class="my-4">{question.question}</h2>
      <div class="border-bottom border-dark"></div>

      <div class="d-flex">
        {question.options.map((option, index) => (
          <button
            class="btn btn-dark btn-opacity-30 hover-opacity-40 text-white d-flex align-items-center justify-content-center w-100 p-4 m-2 border border-dark fs-5 rounded-circle"
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