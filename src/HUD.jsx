import './HUD.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Qna } from './Qna';

export function HUD({ isHudDisplayed }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const patientfName = "Arthus";
  const patientlName = "MEURET";
  const patientAge = "19";
  const patientProb = "joueur lol";
  const patientInfo = "";

  if (isHudDisplayed) {
    return (
      <div className='HUD'>
        <Button variant="primary" onClick={handleShow}>
          Fiche Patient
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Fiche Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modal-body'>
              <b>Nom:</b> {patientlName} <b>Prénom:</b> {patientfName} <br/>
              <b>Age:</b> {patientAge} <br/>
              <b>Problèmes:</b> {patientProb} <br/>
              <b>Info importante:</b> {patientInfo}
            </div>
          </Modal.Body>
        </Modal>
        <Qna/>
      </div>
    );
  }
  return null;
}