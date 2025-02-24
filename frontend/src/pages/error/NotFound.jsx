import React from 'react';
import images from '../../constant/staticImagePath';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <div className={styles.imageContainer}>
        <img src={images.notFound} alt="404 이미지" />
      </div>
      <div className={styles.homeLink}>
        <Link to="/">홈으로 이동</Link>
      </div>
    </>
  );
}
