import React from 'react';
import images from '../../constant/staticImagePath';
import styles from './TimePaperIsLocked.module.css';
import UnderBarButton from '../../components/UnderBarButton/UnderBarButton';
import { useNavigate } from 'react-router-dom';

export default function TimePaperIsLocked() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.imageContainer}>
        <img src={images.timeCapsule} className="logo-image" alt="타임캡슐 이미지"></img>
      </div>
      <div className={styles.buttonContainer}>
        <UnderBarButton title={'홈으로 이동'} onClick={() => navigate('/')}></UnderBarButton>
      </div>
    </>
  );
}
