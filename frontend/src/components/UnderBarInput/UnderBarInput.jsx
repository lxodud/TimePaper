import React from 'react';
import styles from './UnderBarInput.module.css';

export default function UnderBarInput({ value, placeholder, onChange }) {
  return (
    <input
      type="text"
      value={value}
      className={styles.underBarInput}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
