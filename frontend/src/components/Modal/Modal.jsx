import React from 'react';
import styles from './Modal.module.css';
import Dropdown from '../dropdownmenu/Dropdown.jsx';

function Modal({ onClose, onDelete, imageUrl, modalContent, from }) {
  const handleSelect = (value) => {
    if (value === 'delete') {
      onDelete(); // 포스트잇 삭제 동작 실행
    } else if (value === 'close') {
      onClose(); // 모달 닫기 동작 실행
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Dropdown 컴포넌트에 options와 onSelect 전달 */}
        <div className={styles.selectedImage}>
          <Dropdown
            options={[
              { label: '포스트잇 삭제', value: 'delete' },
              { label: '닫기', value: 'close' },
            ]}
            onSelect={handleSelect}
          />
          <img src={imageUrl} className={styles.logoImage} alt="선택된 포스트잇 이미지" />
          <textarea className={styles.textareaWrapper} readOnly>
            {modalContent}
          </textarea>
          <div className={styles.block} data-fulltext={from}>
            <p className={styles.fromText} tabIndex="0">
              From. &nbsp;{from}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
