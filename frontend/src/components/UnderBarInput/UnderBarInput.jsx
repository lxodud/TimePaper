import React from 'react';
import styles from './UnderBarInput.module.css';

export default function UnderBarInput({ placeholder, onChange }) {
  return (
    <input
      type="text"
      className={styles.underBarInput}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
