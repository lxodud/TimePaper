import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import { api } from '../../api/api';
import { finishLoading, startLoading } from '../../store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAuthCodeSendButtonEnable, setIsAuthCodeSendButtonEnable] = useState(false);
  const [isEmailInputEnable, setIsEmailInputEnable] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isAuthCodeInputEnable, setIsAuthCodeInputEnable] = useState(true);
  const [isConfirmAuthCodeButtonEnable, setIsConfirmAuthCodeButtonEnable] = useState(false);
  const [confirmAuthMessage, setIsConfirmAuthMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [isEnable, setIsEnable] = useState(false);

  const [verification, setVerification] = useState({
    passwordConstraints: false,
    passwordCheckConstraints: false,
    authCodeCheck: false,
    isPrivacyPolicyAccepted: false,
    isTermsAccepted: false,
  });

  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      isLoading: state.loading.isLoading,
    };
  });

  const emailFormat = /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[cC][oO][mM]$/;

  const handleEmailInputChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);

    const isEmailValid = emailFormat.test(e.target.value);

    setIsAuthCodeSendButtonEnable(isEmailValid);
    setIsEmailValid(isEmailValid && e.target.value.trim());
  };

  const handleAuthCodeSendButtonClick = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    setIsAuthCodeSendButtonEnable(false);
    setIsEmailInputEnable(false);

    try {
      await api.requestEmailVerificationCode(email);
      alert('인증 메일이 전송되었습니다.');
      setIsCodeSent(true);
      setTimeLeft(300);
    } catch (error) {
      setIsError(true);
      setIsAuthCodeSendButtonEnable(true);
      setIsEmailInputEnable(true);
    } finally {
      dispatch(finishLoading());
    }
  };

  const handleAuthCodeInputChange = (e) => {
    e.preventDefault();

    setAuthCode(e.target.value);
    setIsConfirmAuthCodeButtonEnable(e.target.value.length === 6);
  };

  const emailVerificationCodeCheck = async () => {
    setIsConfirmAuthCodeButtonEnable(false);
    setIsAuthCodeInputEnable(false);
    setIsEmailInputEnable(false);

    try {
      await api.checkEmailVerificationCode(email, authCode);
      alert('인증되었습니다.');
      setVerification((prev) => ({ ...prev, authCodeCheck: true }));
      setIsConfirmAuthMessage('인증되었습니다.');
    } catch (error) {
      setIsError(true);
      setIsConfirmAuthCodeButtonEnable(true);
      setIsAuthCodeInputEnable(true);
    }
  };

  useEffect(() => {
    if (verification.authCodeCheck) {
      return;
    }

    setIsConfirmAuthMessage(
      `남은 시간: ${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`,
    );

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && isCodeSent) {
      setIsConfirmAuthMessage('인증 코드가 만료되었습니다.');
      setIsEmailInputEnable(true);
      setIsAuthCodeSendButtonEnable(true);
      setIsAuthCodeInputEnable(true);
    }
  }, [timeLeft]);

  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');
    setPassword(value);

    const check = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    console.log(check.test(value) && value.length >= 8);

    setVerification((prev) => ({
      ...prev,
      passwordConstraints: check.test(value) && value.length >= 8,
    }));
  };

  const handlePasswordCheck = (e) => {
    const value = e.target.value.replace(/(\s*)/g, '');
    setPasswordCheck(value);
    setVerification((prev) => ({ ...prev, passwordCheckConstraints: password === value }));
  };

  useEffect(() => {
    const allTrue = Object.values(verification).every(Boolean);
    setIsEnable(allTrue);
  }, [verification]);

  const handleSignUp = async () => {
    setIsEnable(false);
    dispatch(startLoading());
    try {
      await api.signup(
        email,
        password,
        verification.isPrivacyPolicyAccepted,
        verification.isTermsAccepted,
      );
      navigate('/login', {
        replace: true,
      });
    } catch {
      setIsError(true);
      setIsEnable(true);
    } finally {
      dispatch(finishLoading());
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', replace);
    }
  }, [isLoggedIn]);

  const handleErrorAlertButtonClick = () => {
    setIsError(false);
  };

  const resolveInvalidMessageStyle = (isValid, inputValue) => {
    return isValid || inputValue.length === 0
      ? styles.invalidMessageHidden
      : styles.invalidMessageVisible;
  };

  return (
    <>
      <div className={styles.signUpContainer}>
        {isError && (
          <ErrorAlert
            buttonTitle="확인"
            message="네트워크 오류 발생"
            onClick={handleErrorAlertButtonClick}
          ></ErrorAlert>
        )}
        <div className={styles.signUpForm}>
          <div>
            <label className={styles.fields}>이메일*</label>
            <input
              className={isEmailInputEnable ? styles.fieldsInput : styles.fieldsInputLock}
              type="email"
              name="email"
              onChange={handleEmailInputChange}
              placeholder={'이메일 작성'}
            />
            <button
              className={isAuthCodeSendButtonEnable ? styles.emailCheckBut : styles.butLock}
              onClick={handleAuthCodeSendButtonClick}
            >
              인증
            </button>
            <br />
            {!isCodeSent && (
              <span className={resolveInvalidMessageStyle(isEmailValid, email)}>
                이메일 형식이 올바르지 않습니다.
              </span>
            )}
          </div>

          {isCodeSent && (
            <div className={styles.marginBox}>
              <label className={styles.fields}>인증 코드 입력</label>
              <input
                className={isAuthCodeInputEnable ? styles.fieldsInput : styles.fieldsInputLock}
                type="text"
                placeholder={'인증 번호 입력'}
                maxLength="6"
                onChange={handleAuthCodeInputChange}
              />
              <button
                className={isConfirmAuthCodeButtonEnable ? styles.emailCheckBut : styles.butLock}
                onClick={emailVerificationCodeCheck}
              >
                확인
              </button>

              <br />
              <span className={styles.authentication}>{confirmAuthMessage}</span>
            </div>
          )}

          <div>
            <label className={styles.fields}>비밀번호*</label>
            <input
              className={styles.fieldsInput}
              type="password"
              name="password"
              placeholder={'비밀번호 작성'}
              onChange={handlePasswordChange}
            />
            <br />
            <span
              className={resolveInvalidMessageStyle(verification.passwordConstraints, password)}
            >
              비밀번호는 특수부호를 포함 8자이상 작성해주세요
            </span>
          </div>

          <div>
            <label htmlFor="password" className={styles.fields}>
              비밀번호 확인*
            </label>
            <input
              className={styles.fieldsInput}
              type="password"
              name="passwordCheck"
              placeholder={'비밀번호 확인'}
              onChange={handlePasswordCheck}
            />
            <br />
            <span
              className={resolveInvalidMessageStyle(
                verification.passwordCheckConstraints,
                passwordCheck,
              )}
            >
              비밀번호가 일치하지 않습니다.
            </span>
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
        <BottomButton
          title={'가입하기'}
          onClick={handleSignUp}
          isEnable={isEnable}
          cursor={isEnable ? 'pointer' : 'not-allowed'}
        />
      </div>
    </>
  );
}
