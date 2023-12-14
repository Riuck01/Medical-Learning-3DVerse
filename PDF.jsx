import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import './PDF.css';

export const PDF = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfText, setPdfText] = useState(''); // État pour stocker le texte du PDF

  const openModal = async () => {
    try {
      const pdfUrl = './TEST2.pdf';
      const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Obtenez le texte du PDF
      const pages = pdfDoc.getPages();
      const pdfText = await Promise.all(pages.map(page => page.getText()));

      setPdfText(pdfText.join('\n')); // Mettez le texte dans l'état du composant
      setModalVisible(true);
    } catch (error) {
      console.error('Erreur lors du chargement du PDF :', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setPdfText(''); // Réinitialisez le texte du PDF lorsque le modal est fermé
  };

  return (
    <div className='PDF'>
      <button onClick={openModal}>OPEN PDF</button>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <div className="pdf-content">
              <pre>{pdfText}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDF;