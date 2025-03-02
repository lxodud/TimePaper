import React from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, imageUrl, modalContent, from }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <div className={styles.selectedImage}>
          <img src={imageUrl} className={styles.logoImage} alt="선택된 포스트잇 이미지" />
          <textarea
            className={styles.textareaWrapper}
            readOnly
            onDragStart={(e) => e.preventDefault()} // ✅ 드래그 방지
            onMouseDown={(e) => e.preventDefault()} // ✅ 마우스 클릭 드래그 방지
          >
            {modalContent}
          </textarea>
          <div className={styles.block}>
            <p>From. &nbsp;{from}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
