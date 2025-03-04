import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './RootHeader.module.css';
import images from '../../constant/staticImagePath';

export default function RootHeader() {
  const navigate = useNavigate();
  const title = useSelector((state) => state.header.pageTitle);

  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={images.arrowBackIcon} alt="뒤로가기" />
      </button>
      <h1 className={styles.title}>{title}</h1>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <img src={images.homeIcon} alt="홈 버튼" />
      </button>
    </div>
  );
}
