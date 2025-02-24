import React from 'react';
import style from './CreateInput.module.css'; // CSS 파일 가져오기

export default function CreateInput({ placeholder }) {
  return (
    <div>
      <input type="text" placeholder={placeholder} className={`${style.textInput}`} />
    </div>
  );
}
