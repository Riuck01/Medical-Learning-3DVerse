
import './HUD.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Qna } from './Qna';

export function HUD() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const patientfName = "Arthus";
  const patientlName = "MEURET";
  const patientAge = "19";
  const patientProb = "joueur lol";
  const patientInfo = "";

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
=======
 
import React, { useState } from 'react';
import './HUD.css';

export const HUD = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='HUD'>
      <button onClick={openModal}>Open Modal</button>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Fiche patient</h2>
            <p>Nom: x prénom: x</p>
            <p>Age...</p>
            <p>problèmes</p>
            <p>Toutes infos importantes</p>
            <p>Nom: x prénom: x</p>
            <p>Age...</p>
            <p>problèmes</p>
            <p>Toutes infos importantes</p>
            <p>Nom: x prénom: x</p>
            <p>Age...</p>
            <p>problèmes</p>
            <p>Toutes infos importantes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HUD; 
