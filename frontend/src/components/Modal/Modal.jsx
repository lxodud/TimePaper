import React, { useRef } from 'react';
import styles from './Modal.module.css';
import UnderBarButton from '../UnderBarButton/UnderBarButton';

function Modal({ isOpen, onClose, imageUrl, modalContent, from }) {
  const textRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <div className={styles.selectedImage}>
          <img src={imageUrl} className={styles.logoImage} alt="선택된 포스트잇 이미지" />
          <div className={styles.textareaWrapper} ref={textRef}>
            {modalContent}
          </div>
          <div className={styles.block}>
            <p>From. &nbsp;{from}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
