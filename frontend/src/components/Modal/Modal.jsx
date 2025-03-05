import React, { useState } from 'react';
import styles from './Modal.module.css';
import Dropdown from '../dropdownmenu/Dropdown.jsx';
import ConfirmModal from '../confirmmodal/ConfirmModal';
import { api } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';

function Modal({ onClose, onDelete, imageUrl, modalContent, from, postitId}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false); // ConfirmModal 상태 관리

  const handleSelect = (value) => {
    if (value === 'delete') {
      setShowConfirmModal(true); // 포스트잇 삭제 ConfirmModal 열기
    } else if (value === 'close') {
      onClose(); // 모달 닫기
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await api.deletePostit(postitId);
      alert('포스트잇이 성공적으로 삭제되었습니다');
      // 삭제 성공 후 부모 콜백 호출하여 postits 상태 업데이트
      onDelete(postitId);
      // 페이지 이동 없이 상태 업데이트만으로 시간 페이퍼 목록 반영
    } catch (error) {
      console.error('포스트잇 삭제 실패:', error);
      alert('포스트잇을 삭제하는데 실패했습니다');
    }
    setShowConfirmModal(false);
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

        {/* ConfirmModal */}
        {showConfirmModal && (
          <ConfirmModal
            message="정말로 이 포스트잇을 삭제하시겠습니까?"
            onConfirm={handleConfirmDelete} // 확인 클릭 시 삭제 처리
            onCancel={() => setShowConfirmModal(false)} // 취소 클릭 시 ConfirmModal 닫기
          />
        )}
      </div>
    </div>
  );
}

export default Modal;
