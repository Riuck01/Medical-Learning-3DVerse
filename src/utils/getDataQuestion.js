import data from '../data/questions.json';

function getDataQuestions(NB_OF_QUESTIONS) {
  // Assurez-vous que NB_OF_QUESTIONS n'est pas supérieur au nombre total de questions disponibles
  const totalQuestions = Math.min(NB_OF_QUESTIONS, data.length);

  // Mélangez les questions de manière aléatoire
  const shuffledQuestions = [...data].sort(() => Math.random() - 0.5);

  // Retournez le nombre spécifié de questions
  return shuffledQuestions.slice(0, totalQuestions);
}

export default getDataQuestions;
