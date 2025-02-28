import React from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './Login.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <img src={staticImagePath.timepaperLogo} className='logo-image' />
        <form action="" className={styles.formContainer}>
          <input type="text" placeholder="아이디(이메일)" className={styles.inputId} />
          <input type="text" placeholder="비밀번호" className={styles.inputPassword} />
          <div className={styles.buttonContainer}>
            <BottomButton title={'로그인'}></BottomButton>
            <button className={styles.signupButton}>회원가입</button>
          </div>
          
        </form>
      </div>
    </>
  );
}
