import React, { useState } from 'react';
import Button from '../../components/createbutton/CreateButton';
import CreateInput from '../../components/createinput/CreateInput';
import style from './timePaperCreate.module.css';

export default function TimePaperCreate() {
  return (
    <>
      <div className={`${style.inputParentContainer}`}>
        <CreateInput placeholder="롤링페이퍼 제목을 입력해주세요," />
      </div>
      <div className={`${style.buttonParentContainer}`}>
        <Button>타임페이퍼 생성</Button>
      </div>
    </>
  );
}
