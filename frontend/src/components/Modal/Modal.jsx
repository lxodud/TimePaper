import React from 'react';
import styles from './Modal.module.css';

function Modal({ onClose, imageUrl, modalContent, from }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <div className={styles.selectedImage}>
          <img src={imageUrl} className={styles.logoImage} alt="선택된 포스트잇 이미지" />
          <textarea className={styles.textareaWrapper} readOnly>
            {modalContent}
          </textarea>
          <div className={styles.block} data-fulltext={from}>
            <p>From. &nbsp;{from}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
