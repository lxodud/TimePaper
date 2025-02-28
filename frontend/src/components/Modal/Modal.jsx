import React from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, imageUrl, modalContent }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <img src={imageUrl} alt="Modal Content" className={styles.image} />
      </div>
    </div>
  );
}

export default Modal;
