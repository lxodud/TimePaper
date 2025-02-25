import React from 'react';
import UnderBarButton from '../../components/UnderBarButton/UnderBarButton';
import { useNavigate } from 'react-router-dom';
import images from '../../constant/staticImagePath';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.imageContainer}>
        <img src={images.notFound} className="logo-image" alt="404 이미지" />
      </div>
      <div className={styles.buttonContainer}>
        <UnderBarButton title={'홈으로 이동'} onClick={() => navigate('/')}></UnderBarButton>
      </div>
    </>
  );
}
