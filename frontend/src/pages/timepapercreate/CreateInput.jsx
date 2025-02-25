import React from 'react';
import styles from './timePaperCreate.module.css';

export default function CreateInput({ placeholder }) {
  return (
    <div>
      <input type="text" placeholder={placeholder} className={styles.textInput} />
    </div>
  );
}
