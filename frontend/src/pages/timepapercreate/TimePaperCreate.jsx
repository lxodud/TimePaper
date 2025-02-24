import React, { useState } from 'react';
import Button from './CreateButton';
import CreateInput from './CreateInput';
import style from './timePaperCreate.module.css';

export default function TimePaperCreate() {
  return (
    <>
      <div className={`${style.inputParentContainer}`}>
        <CreateInput placeholder="제목을 입력해주세요," />
      </div>
      <div className={`${style.buttonParentContainer}`}>
        <Button>타임페이퍼 생성</Button>
      </div>
    </>
  );
}
