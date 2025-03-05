import React from 'react';
import styles from './Alert.module.css';

export default function Alert({ message, buttonTitle, onClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <button className={styles.button} onClick={onClick}>
        {buttonTitle}
      </button>
    </div>
  );
}
