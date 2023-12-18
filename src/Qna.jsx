import './qna.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export function Qna() {
  const [open, setShow] = useState(false);
  const closeForm = () => setShow(false);
  const openForm = () => setShow(true);
  const [curQuestionIndex, setCount] = useState(0);
  const questions = [
    {title: "Laquelle de ces réponse n'est pas significative du fun ?", a1: "mdr", a2: "lol", a3: "connard", a4: "XD", },
    {title: "Quel est mon main sur LoL ?", a1: "Aatrox", a2: "Jax", a3: "Diluc", a4: "Hwei", },
    {title: "Tom va-t-il gagner sa game ?", a1: "non", a2: "non", a3: "non", a4: "non", },
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