import React from 'react';
import styles from './UnderBarButton.module.css';

export default function UnderBarButton({ title, onClick }) {
  return (
    <button onClick={onClick} className={styles.underBarButton}>
      {title}
    </button>
  );
}
