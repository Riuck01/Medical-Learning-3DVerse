 
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