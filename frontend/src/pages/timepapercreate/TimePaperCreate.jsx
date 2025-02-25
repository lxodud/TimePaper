import React, { useState } from 'react';
import Button from './CreateButton';
import CreateInput from './CreateInput';
import styles from './timePaperCreate.module.css';

export default function TimePaperCreate() {
  return (
    <>
      <div className={styles.container}>
        <CreateInput placeholder="제목을 입력해주세요," />
        <Button>타임페이퍼 생성</Button>
      </div>
    </>
  );
}
