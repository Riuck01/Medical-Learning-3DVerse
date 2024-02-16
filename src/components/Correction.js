import React from 'react';

export const Correction = ({
  currentQuestionIndex,
  questions,
  userAnswers,
  showRestartButton,
  restartQuiz,
  setCurrentQuestionIndex,
  setShowRestartButton
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    if (currentQuestionIndex + 1 >= 5) {
      setShowRestartButton(true);
    }
  };

  const checkAnswer = (answer, correctAnswer) => {
    correctAnswer.map((cAnswer, index) => {
      console.log("cAnswer :", cAnswer);
      console.log("answer :", answer);
      if (cAnswer === answer) {
        console.log("true");
        return true;
      }
    });
    console.log("false");
    return false;
  }

  return (
    <div class="bg-secondary p-4 rounded-md">
      <h2 class="h4 font-weight-bold mb-4">Correction</h2>
      <div class="mb-4">
        <p class="mb-2">
          <strong>Question :</strong> {currentQuestion.question}
        </p>
        <p class="mb-2">
          <strong>Réponse attendue :</strong>
          {currentQuestion.correctAnswer.map((cAnswer, index) => (
            <span key={index} class={userAnswers[currentQuestionIndex] === cAnswer ? "text-success" : "text-danger"}>
              {cAnswer} <br />
            </span>
          ))}
        </p>
        <p class="mb-2">
          <strong>Réponse sélectionnée :</strong>
          <span class={checkAnswer(currentAnswer, currentQuestion.correctAnswer) === true ? "text-success" : "text-danger"}>
            {currentAnswer}
          </span>
        </p>
      </div>
      <button
        onClick={handleNextQuestion}
        class="btn btn-dark btn-opacity-30 hover-opacity-40 text-white p-4 m-2 border border-dark h5"
      >
        Question suivante
      </button>
      {showRestartButton && (
        <button onClick={restartQuiz} class="btn btn-dark btn-opacity-30 hover-opacity-40 text-white rounded-full d-flex align-items-center justify-content-center w-100 p-4 m-2 border border-dark h5">
          Restart
        </button>
      )}
    </div>

  );
};