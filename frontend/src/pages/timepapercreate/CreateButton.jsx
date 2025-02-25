import React from 'react';
import styles from './timePaperCreate.module.css';

export default function Button({ children }) {
  return <button className={styles.buttonBasic}>{children}</button>;
}
