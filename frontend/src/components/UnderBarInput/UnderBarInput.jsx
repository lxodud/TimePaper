import React from 'react';
import styles from './UnderBarInput.module.css';

export default function UnderBarInput({ value, placeholder, onChange, name, onBlur }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      className={styles.underBarInput}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
