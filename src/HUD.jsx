import React, { useState } from 'react';
import './HUD.css'

export function HUD() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='HUD'>
      <div>
        <h1>This text is printed on top of the scene's canvas</h1>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}