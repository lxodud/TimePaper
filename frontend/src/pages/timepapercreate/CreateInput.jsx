import React from 'react';
import style from './timePaperCreate.module.css';

export default function CreateInput({ placeholder }) {
  return (
    <div>
      <input type="text" placeholder={placeholder} className={`${style.textInput}`} />
    </div>
  );
}
