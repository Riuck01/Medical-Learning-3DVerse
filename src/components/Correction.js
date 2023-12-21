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
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Correction</h2>
      <div className="mb-4">
        <p className="mb-2">
          <strong>Question :</strong> {currentQuestion.question}
        </p>
        <p className="mb-2">
          <strong>Réponse attendue :</strong>
          {currentQuestion.correctAnswer.map((cAnswer, index) => (
            <span key={index} className={userAnswers[currentQuestionIndex] === cAnswer ? "text-green" : "text-red"}>
              {cAnswer} <br />
            </span>
          ))}

        </p>
        <p className="mb-2">
          <strong>Réponse sélectionnée :</strong>
          <span className={checkAnswer(currentAnswer, currentQuestion.correctAnswer) === true ? "text-green-500" : "text-red-500"}>
            {currentAnswer}
          </span>

        </p>
      </div>
      <button
        onClick={handleNextQuestion}
        className="rounded-full bg-black bg-opacity-30 hover:bg-opacity-40 text-white p-4 m-2 border border-black text-lg"
      >
        Question suivante
      </button>
      {showRestartButton && (
        <button onClick={restartQuiz} className="rounded-full bg-black bg-opacity-30 hover:bg-opacity-40 text-white flex items-center justify-center w-full p-4 m-2 border border-black text-lg">
          Restart
        </button>
      )}
    </div>
  );
};