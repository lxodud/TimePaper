import React, { useState } from 'react';
import styles from './timePaperCreate.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';

export default function TimePaperCreate() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <UnderBarInput placeholder={'제목을 입력해주세요'}></UnderBarInput>
        </div>
        <BottomButton title={'타임페이퍼 생성'}></BottomButton>
      </div>
    </>
  );
}
