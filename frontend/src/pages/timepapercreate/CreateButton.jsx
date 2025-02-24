import React from 'react';
import style from './CreateButton.module.css';
export default function Button({ children }) {
  return <button className={`${style.buttonBasic}`}>{children}</button>;
}
