import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'react-bootstrap/Button';
import './PDF.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDF = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('./pose-platre.pdf');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const openModal = async () => {
    try {
      console.log('Fetching PDF:', pdfUrl);

      const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
      console.log('PDF Bytes:', pdfBytes);

      const pdfDoc = new Uint8Array(pdfBytes);
      const pdfText = new TextDecoder().decode(pdfDoc);

      console.log('PDF Text:', pdfText);

      setModalVisible(true);
      setError(null);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setModalVisible(true);
      setError('Failed to load PDF file.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setNumPages(null);
    setError(null);
  };

  return (
    <div>
      <Button className='hud-placement2' variant="primary" onClick={openModal}>
        Open PDF
      </Button>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>&times;</span>
            {error ? (
              <div className="pdf-content-error">{error}</div>
            ) : (
              <div className="pdf-content">
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDF;
