import React, { useState } from 'react';
import styles from './MyPage.module.css';

const Dropdown = ({ onActionClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleActionClick = (path) => {
    onActionClick(path); // 상위 컴포넌트로 경로 전달
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        ...
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <button
            className={styles.dropdownItem}
            onClick={() => handleActionClick('/logout')}
          >
            로그아웃
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleActionClick('/withdraw')}
          >
            회원탈퇴
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleActionClick('/contact')}
          >
            문의하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
