import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './hud.css'

export default function FichePatient() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const patientfName = "Jean";
  const patientlName = "DUPOND";
  const patientAge = "39";
  const patientProb = "un problème quelconque";
  const patientInfo = "une information quelconque";
  
  return (
  <div className=''>
    <Button variant="primary" onClick={handleShow}>
    Fiche Patient
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fiche Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className=''>
        <b>Nom:</b> {patientlName} <br/>
        <b>Prénom:</b> {patientfName} <br/>
        <b>Age:</b> {patientAge} <br/>
        <b>Problèmes:</b> {patientProb} <br/>
        <b>Info importante:</b> {patientInfo}
        </div>
      </Modal.Body>
    </Modal>
  </div>
  );
}