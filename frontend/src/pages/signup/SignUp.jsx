import React, { useState, useRef, useEffect } from 'react';
import styles from './SignUp.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import { api } from '../../api/api';

export default function SignUp() {
  const [placeholdersVisible, setPlaceholdersVisible] = useState([true, true, true, true]); // input
  const [email, setEmail] = useState(''); // 이메일 입력값 저장
  const [authenticationCode, setauthenticationCode] = useState(''); //인증번호 input창 데이터 저장
  const [isCodeSent, setIsCodeSent] = useState(true); // 인증번호 입력창 노출을 위한 useState
  const [timeLeft, setTimeLeft] = useState(0); // 인증시간 관련 useState
  const [password, setPassword] = useState(''); // 비밀번호input의 값을 넣을 useState
  const [passwordCheck, setPasswordCheck] = useState(false); //비밀번호확인 input의 값을 넣을 useState

  const [verification, setVerification] = useState({
    passwordConstraints: false, // 비밀번호 제약조건 성립여부
    passwordCheckConstraints: false, // 비밀번호확인 제약조건 성립여부
    verificationCodeCheck: false, // 인증코드 인증여부 true/false
    isPrivacyPolicyAccepted: false, // 개인정보 약관 동의 true/false
    isTermsAccepted: false, // 이용 약관 동의 true/false
  });

  const email_format = /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[cC][oO][mM]$/;

  const emailCertification = async (e) => {
    e.preventDefault();

    if (!email || !email_format.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    } else {
      try {
        const response = await api.requestEmailVerificationCode(email);
        alert('인증 메일이 전송되었습니다.');
        setIsCodeSent(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const emailverificationCodeCheck = async () => {
    setVerification((prev) => ({ ...prev, verificationCodeCheck: true }));
    try {
      await api.checkEmailVerificationCode(email, authenticationCode);
      alert('인증되었습니다.');
      setVerification((prev) => ({ ...prev, verificationCodeCheck: true }));
    } catch (error) {
      setVerification((prev) => ({ ...prev, verificationCodeCheck: false }));
      console.error('인증 확인 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (isCodeSent) {
      setTimeLeft(300);
    }
  }, [isCodeSent]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
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

  const ChengePassword = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');
    setPassword(value);

    const check = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (check.test(value) && value.length >= 8) {
      setVerification((prev) => ({
        ...prev,
        passwordConstraints: true,
      }));
    } else {
      setVerification((prev) => ({
        ...prev,
        passwordConstraints: false,
      }));
    }
  };

  const ChengePasswordCheck = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');
    setPasswordCheck(value);

    if (password === value) {
      setVerification((prev) => ({ ...prev, passwordCheckConstraints: true }));
    } else {
      setVerification((prev) => ({ ...prev, passwordCheckConstraints: false }));
    }
  };

  const handleSignUp = async () => {
    await api.signup(
      email,
      password,
      verification.isPrivacyPolicyAccepted,
      verification.isTermsAccepted,
    );
  };

  const handleAlertSignUp = () => {
    alert('잘못 입력된 내용이 있습니다.');
  };

  return (
    <>
      <div className={styles.signUpContainer}>
        <div className={styles.signUpForm}>
          <div className={styles.emailBox}>
            <label className={styles.fields}>이메일*</label>
            <input
              className={`${verification.verificationCodeCheck ? styles.fieldsInputLock : styles.fieldsInput}`}
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder={placeholdersVisible[0] ? '이메일 작성' : ''}
              onFocus={() => handleFocus(0)}
              onBlur={(e) => handleBlur(0, e.target.value)}
              style={{ textAlign: placeholdersVisible[0] ? 'center' : 'left' }}
            />
            <button
              className={
                verification.verificationCodeCheck
                  ? styles.butLock
                  : email_format.test(email)
                    ? styles.emailCheckBut
                    : styles.butLock
              }
              onClick={emailCertification}
            >
              인증
            </button>
          </div>

          {isCodeSent && (
            <div>
              <div className={styles.fields}>인증 코드 입력</div>
              <input
                className={`${verification.verificationCodeCheck ? styles.fieldsInputLock : styles.fieldsInput}`}
                type="text"
                placeholder={placeholdersVisible[1] ? '인증 번호 입력' : ''}
                maxLength="6"
                onFocus={() => handleFocus(1)}
                onBlur={(e) => handleBlur(1, e.target.value)}
                style={{ textAlign: placeholdersVisible[1] ? 'center' : 'left' }}
                onChange={(e) => setauthenticationCode(e.target.value)}
                value={authenticationCode}
              />
              <button
                className={
                  verification.verificationCodeCheck
                    ? styles.butLock // 인증 성공하면 버튼 비활성화
                    : authenticationCode.length === 6
                      ? styles.emailCheckBut // 6자리 인증번호 입력되면 활성화
                      : styles.butLock // 그렇지 않으면 비활성화
                }
                onClick={emailverificationCodeCheck}
              >
                번호확인
              </button>

              <div className={styles.authentication}>
                {verification.verificationCodeCheck && timeLeft > 0 ? (
                  '인증되었습니다!'
                ) : timeLeft > 0 ? (
                  `남은 시간: ${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`
                ) : (
                  <span className={styles.expired}>인증 코드가 만료되었습니다.</span>
                )}
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
            <div
              className={
                !password || verification.passwordConstraints
                  ? styles.visibilityVisible
                  : styles.visibilityHidden
              }
            >
              비밀번호는 특수부호를 포함 8자이상 작성해주세요
            </div>
          </div>

          <div>
            <label htmlFor="password" className={styles.fields}>
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
              className={
                !passwordCheck || verification.passwordCheckConstraints
                  ? styles.visibilityVisible
                  : styles.visibilityHidden
              }
            >
              비밀번호가 일치하지 않습니다.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBox}>
        <div className={styles.checkBoxDiv}>
          <div className={styles.isPrivacyPolicyAccepted}>
            <div>개인 정보 활용에 대해 동의하시겠습니까?</div>
            <div className={styles.checkboxText}>
              <input
                type="checkbox"
                checked={verification.isPrivacyPolicyAccepted}
                onChange={(e) =>
                  setVerification((prev) => ({
                    ...prev,
                    isPrivacyPolicyAccepted: e.target.checked,
                  }))
                }
              />
              <label className={styles.checkboxlabel}>자세히보기</label>
            </div>
          </div>

          <div className={styles.isTermsAccepted}>
            <div>이용 약관에 동의 하시겠습니까?</div>
            <div className={styles.checkboxText}>
              <input
                type="checkbox"
                checked={verification.isTermsAccepted}
                onChange={(e) =>
                  setVerification((prev) => ({
                    ...prev,
                    isTermsAccepted: e.target.checked,
                  }))
                }
              />
              <label className={styles.checkboxlabel}>자세히보기</label>
            </div>
          </div>
        </div>
        <BottomButton title={'가입하기'} onClick={handleSignUp} isEnable={true} />
      </div>
    </>
  );
}
