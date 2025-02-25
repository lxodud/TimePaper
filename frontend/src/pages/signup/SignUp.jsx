import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './SignUp.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';

export default function SignUp() {
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isPwCheckVisible, setisPwCheckVisible] = useState(false);
  const [placeholdersVisible, setPlaceholdersVisible] = useState([true, true, true, true]);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeCheck, setverificationCodeCheck] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [passwordInput, setpasswordInput] = useState(false);
  const [passwordInputNum, setpasswordInputNum] = useState('');
  const [passwordCheckInput, setpasswordCheckInput] = useState(false);
  const form = useRef();

  // 6자리 랜덤 코드 생성
  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // 영어 + 숫자 조합 (6자리)
  };

  const emailCheck = (e) => {
    e.preventDefault();

    let email_format = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!email || !email_format.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    const code = generateVerificationCode();
    setVerificationCode(code);

    const templateParams = {
      to_name: email,
      message: code,
      from_name: 'timepaper',
    };

    emailjs.send('service_4n5mcry', 'template_j25i3xn', templateParams, 'E2uVL_UZRQC6xI7Nu').then(
      () => {
        console.log('인증 코드 전송 성공!');
        setIsCodeSent(true);
        alert('인증 코드가 이메일로 전송되었습니다.');
        setIsCodeSent(true);
        setTimeLeft(300);
      },
      (error) => {
        console.log('이메일 전송 실패...', error.text);
        alert('이메일 전송에 실패했습니다.');
      },
    );
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setverificationCodeCheck(false);
    }
  }, [timeLeft]);

  const handleFocus = (index) => {
    const newPlaceholdersVisible = [...placeholdersVisible];
    newPlaceholdersVisible[index] = false;
    setPlaceholdersVisible(newPlaceholdersVisible);
  };

  const handleBlur = (index, value) => {
    const newPlaceholdersVisible = [...placeholdersVisible];
    if (value === '') {
      newPlaceholdersVisible[index] = true;
    }
    setPlaceholdersVisible(newPlaceholdersVisible);
  };

  const ChengeverificationCode = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');
    setInputCode(value);
    if (value === verificationCode) {
      setverificationCodeCheck(true);
      console.log('성공');
    } else {
      setverificationCodeCheck(false);
    }
  };

  const ChengePassword = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');
    setpasswordInputNum(value);

    const check = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (check.test(value) && value.length >= 8) {
      setpasswordInput(true);
    } else {
      setpasswordInput(false);
    }
  };

  const ChengePasswordCheck = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');

    if (passwordInputNum === value) {
      setpasswordCheckInput(true);
    } else {
      setpasswordCheckInput(false);
    }
  };

  return (
    <>
      <div className={styles.signUpContainer}>
        <form className={styles.signUpForm}>
          <div>
            <label className={styles.fields}>이메일*</label>
            <input
              className={styles.fieldsInput}
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder={placeholdersVisible[0] ? '이메일 작성' : ''}
              onFocus={() => handleFocus(0)}
              onBlur={(e) => handleBlur(0, e.target.value)}
              style={{ textAlign: placeholdersVisible[0] ? 'center' : 'left' }}
            />
            <button className={styles.emailCheckBut} onClick={emailCheck}>
              인증
            </button>
          </div>

          {isCodeSent && (
            <div>
              <div className={styles.fields}>인증 코드 입력</div>
              <input
                className={styles.fieldsInput}
                type="text"
                placeholder={placeholdersVisible[1] ? '인증 번호 입력' : ''}
                maxlength="6"
                onFocus={() => handleFocus(1)}
                onBlur={(e) => handleBlur(1, e.target.value)}
                style={{ textAlign: placeholdersVisible[1] ? 'center' : 'left' }}
                // onChange={(e) => setInputCode(e.target.value)}
                onChange={ChengeverificationCode}
                value={inputCode}
              />
              <div className={styles.authentication}>
                {inputCode === verificationCode && timeLeft > 0
                  ? '인증되었습니다!'
                  : timeLeft > 0
                    ? `남은 시간: ${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`
                    : '인증 코드가 만료되었습니다.'}
              </div>
            </div>
          )}

          <div>
            <label className={styles.fields}>비밀번호*</label>
            <input
              className={styles.fieldsInput}
              type="password"
              name="password"
              placeholder={placeholdersVisible[2] ? '비밀번호 작성' : ''}
              onFocus={() => handleFocus(2)}
              onBlur={(e) => handleBlur(2, e.target.value)}
              style={{ textAlign: placeholdersVisible[2] ? 'center' : 'left' }}
              onChange={ChengePassword}
            />
            <div className={passwordInput ? styles.visibilityVisible : styles.visibilityHidden}>
              비밀번호는 특수부호를 포함 8자이상 작성해주세요
            </div>
          </div>

          <div>
            <label for="password" className={styles.fields}>
              비밀번호 확인*
            </label>
            <input
              className={styles.fieldsInput}
              type="password"
              name="passwordCheck"
              placeholder={placeholdersVisible[3] ? '비밀번호 확인' : ''}
              onFocus={() => handleFocus(3)}
              onBlur={(e) => handleBlur(3, e.target.value)}
              style={{ textAlign: placeholdersVisible[3] ? 'center' : 'left' }}
              onChange={ChengePasswordCheck}
            />
            <div
              className={passwordCheckInput ? styles.visibilityVisible : styles.visibilityHidden}
            >
              비밀번호가 일치하지 않습니다.
            </div>
          </div>
        </form>
      </div>

      <div className={styles.bottomBox}>
        <div className={styles.checkBoxDiv}>
          <div className={styles.isPrivacyPolicyAccepted}>
            <div>개인 정보 활용에 대해 동의하시겠습니까?</div>
            <div className={styles.checkboxText}>
              <input type="checkbox" />
              <label className={styles.checkboxlabel}>자세히보기</label>
            </div>
          </div>

          <div className={styles.isTermsAccepted}>
            <div>이용 약관에 동의 하시겠습니까?</div>
            <div className={styles.checkboxText}>
              <input type="checkbox" />
              <label className={styles.checkboxlabel}>자세히보기</label>
            </div>
          </div>
        </div>
        <BottomButton title={'가입하기'}></BottomButton>
      </div>
    </>
  );
}
