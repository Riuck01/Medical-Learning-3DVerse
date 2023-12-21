import React, { useState, useEffect } from 'react';
import { Quiz } from './components/Quiz.js';
import { Correction } from './components/Correction.js';
import { FunctionButton } from './components/FunctionButton.js';
import getDataQuestion from './utils/getDataQuestion.js';

const Training = ({ endTrainingFunction }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizPhase, setQuizPhase] = useState('questionnaire');
  const [showRestartButton, setShowRestartButton] = useState(false);
  const NB_OF_QUESTIONS = 5;

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizPhase('questionnaire');
    const newQuestions = getDataQuestion(NB_OF_QUESTIONS);
    setQuestions(newQuestions);
    setQuestion(newQuestions[0]);
    setShowRestartButton(false);
  };

  useEffect(() => {
    const initialQuestions = getDataQuestion(NB_OF_QUESTIONS);
    setQuestions(initialQuestions);
    setQuestion(initialQuestions[currentQuestionIndex]);
  }, []);

  const handleAnswerClick = (selectedOption) => {
    // Si la phase est 'questionnaire', met à jour la réponse de l'utilisateur
    if (quizPhase === 'questionnaire') {
      setUserAnswers([...userAnswers, selectedOption]);
  
      const currentQuestion = questions[currentQuestionIndex];
      
      // Vérifie si la réponse de l'utilisateur est correcte
      if (selectedOption === currentQuestion.answer) {
        setCorrectAnswersCount(correctAnswersCount + 1);
      }
  
      // Passe à la question suivante
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  
      // Si toutes les questions ont été posées, passe à la phase de correction
      if (currentQuestionIndex + 1 === questions.length) {
        setQuizPhase('correction');
        setCurrentQuestionIndex(0);
      } else {
        setQuestion(questions[currentQuestionIndex + 1]);
      }
      console.log("NB good answer :", correctAnswersCount);
    }
  };

  if (!question) {
    return <p>Chargement...</p>;
  } else {
    return (
      <div>
        {quizPhase === 'questionnaire' ? (
          <Quiz
            question={question}
            handleAnswerClick={handleAnswerClick}
            quizPhase={quizPhase}
          />
        ) : (
          <>
            {showRestartButton === false ? (
              <Correction
                currentQuestionIndex={currentQuestionIndex}
                questions={questions}
                userAnswers={userAnswers}
                showRestartButton={showRestartButton}
                restartQuiz={restartQuiz}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setShowRestartButton={setShowRestartButton}
              />
            ) : (
              <>
                <div class="flex">
                  <FunctionButton
                    buttonFunction={restartQuiz}
                    text="Restart"
                  />
                  <FunctionButton
                    buttonFunction={endTrainingFunction}
                    text="Stop"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
};

export default Training;
