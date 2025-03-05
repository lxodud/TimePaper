import React from 'react'
import styles from './ErrorAlert.module.css'

export default function ErrorAlert({ message, buttonTitle, onClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <button className={styles.button} onClick={onClick}>{buttonTitle}</button>
    </div>
  )
}
