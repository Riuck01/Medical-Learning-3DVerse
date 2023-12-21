import './qna.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Training from './Training'

export default function Qna() {
  const [open, setShow] = useState(false);
  const closeForm = () => setShow(false);
  const openForm = () => setShow(true);

  return (
    <div className='qna-container'>
      <Button variant="primary" onClick={openForm}>Questionnaire</Button>
      <Modal size='lg' show={open} onHide={closeForm} centered>
        <Training/>
      </Modal>
    </div>
  )
}