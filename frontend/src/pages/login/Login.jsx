import React from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './Login.module.css'

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <img src={staticImagePath.timepaperLogo} className={styles.logoImage} />
        <form action="" className={styles.formContainer}>
          <input type="text" placeholder="아이디(이메일)" className={styles.inputId} />
          <input type="text" placeholder="비밀번호" className={styles.inputPassword} />
          <button className={styles.loginButton}>로그인</button>
          <button className={styles.signupButton}>회원가입</button>
        </form>
      </div>
    </>
  );
}
