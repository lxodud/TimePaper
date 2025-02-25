import React from 'react';
import staticImagePath from '../../constant/staticImagePath';
import BottomButton from '../../components/BottomButton/BottomButton';
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <img src={staticImagePath.timepaperLogo} className='logo-image'/>
        <div className={styles.buttonContainer}>
          <BottomButton title={"롤링페이퍼 생성 하러가기"}></BottomButton>
        </div>
      </div>
    </>
  );
}
