import './qna.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
          <ul>
            <li> {questions[curQuestionIndex].a1} </li>
            <li> {questions[curQuestionIndex].a2} </li>
            <li> {questions[curQuestionIndex].a3} </li>
            <li> {questions[curQuestionIndex].a4} </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {if (curQuestionIndex>0) setCount(curQuestionIndex-1)}}>Précédant</Button>
          <Button variant="primary" onClick={() => {if (curQuestionIndex<questions.length-1) setCount(curQuestionIndex+1)}}>Suivant</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}