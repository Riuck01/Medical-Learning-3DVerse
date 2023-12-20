import './qna.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function Qna() {
  const [open, setShow] = useState(false);
  const closeForm = () => setShow(false);
  const openForm = () => setShow(true);
  const [curQuestionIndex, setCount] = useState(0);
  const questions = [
    {title: "Question 1: ......?", a1: "mauvaise reponse", a2: "mauvaise reponse", a3: "mauvaise reponse", a4: "bonne reponse", },
    {title: "Question 2: ......?", a1: "mauvaise reponse", a2: "bonne reponse", a3: "mauvaise reponse", a4: "mauvaise reponse", },
    {title: "Question 3: ......?", a1: "bonne reponse", a2: "mauvaise reponse", a3: "mauvaise reponse", a4: "mauvaise reponse", },
  ];

  const answers = {
    0: '',
  };
  
  const nextQuestion = (answer) => {
    answers[curQuestionIndex] = answer;
    if (curQuestionIndex<questions.length-1) setCount(curQuestionIndex+1)
    changeAnswer();
  };

  const prevQuestion = () => {
    if (curQuestionIndex>0) setCount(curQuestionIndex-1)
  };

  const changeAnswer = () => {
    if (document.getElementById('answer1').checked) answers[curQuestionIndex] = "1";
    if (document.getElementById('answer2').checked) answers[curQuestionIndex] = "2";
    if (document.getElementById('answer3').checked) answers[curQuestionIndex] = "3";
    if (document.getElementById('answer4').checked) answers[curQuestionIndex] = "4";
  };

  return (
    <div className='qna-container'>
      <Button variant="primary" onClick={openForm}>Questionnaire</Button>
      <Modal size='lg' show={open} onHide={closeForm} centered>
        <Modal.Header>
          <Modal.Title>Questionnaire Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>{questions[curQuestionIndex].title}</Modal.Title>
          <br />
          <Form.Group>
            <Form.Check type={'radio'} id='answer1' name='answer' label={questions[curQuestionIndex].a1}/>
            <Form.Check type={'radio'} id='answer2' name='answer' label={questions[curQuestionIndex].a2}/>
            <Form.Check type={'radio'} id='answer3' name='answer' label={questions[curQuestionIndex].a3}/>
            <Form.Check type={'radio'} id='answer4' name='answer' label={questions[curQuestionIndex].a4}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={prevQuestion}>Précédant</Button>
          <Button variant="primary" type='submit' onClick={nextQuestion}>Suivant</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}