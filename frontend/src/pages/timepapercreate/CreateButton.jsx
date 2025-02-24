import React from 'react';
import style from './timePaperCreate.module.css';

export default function Button({ children }) {
  return <button className={`${style.buttonBasic}`}>{children}</button>;
}
