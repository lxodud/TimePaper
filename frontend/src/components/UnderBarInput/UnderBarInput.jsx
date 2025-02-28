import React from 'react';
import styles from './UnderBarInput.module.css';

export default function UnderBarInput({ value, placeholder, onChange, name }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      className={styles.underBarInput}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
