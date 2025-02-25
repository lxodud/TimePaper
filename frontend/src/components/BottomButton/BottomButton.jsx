import React from 'react';
import styles from './BottomButton.module.css';

export default function BottomButton({ title, onClick }) {
  return (
    <button onClick={onClick} className={styles.bottomButton}>
      {title}
    </button>
  );
}
