import React, { useEffect, useState } from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './Login.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import { api } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { finishLoading, startLoading } from '../../store/slices/loadingSlice';
import Alert from '../../components/Alert/Alert';

export default function Login() {
  const [inputData, setIntputData] = useState({ email: '', password: '' });
  const [isLoginButtonEnable, setIsLoginButtonEnable] = useState(false);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLoginButtonClick = (event) => {
    setIsLoginButtonEnable(false);
    event.preventDefault();
    (async () => {
      dispatch(startLoading());
      try {
        const response = await api.login(inputData.email, inputData.password);
        dispatch(login(response.headers.authorization));
        const next = location.state?.next ?? -1;
        navigate(next, { replace: true });
      } catch (error) {
        setIsAlertShow(true);
        setIsLoginButtonEnable(true);
      } finally {
        dispatch(finishLoading());
      }
    })();
  };

  const handleInputChange = (event) => {
    setIntputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUpButtonClick = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const handleAlertButtonClick = () => {
    setIsAlertShow(false);
  };

  useEffect(() => {
    if (inputData.email.trim().length !== 0 && inputData.password.trim().length !== 0) {
      setIsLoginButtonEnable(true);
    } else {
      setIsLoginButtonEnable(false);
    }
  }, [inputData]);

  useEffect(() => {
    if (isLoggedIn) {
      const next = location.state?.next ?? '/';
      navigate(next, { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className={styles.container}>
        {isAlertShow && (
          <div className={styles.alertContainer}>
            <Alert
              buttonTitle={'확인'}
              message={'로그인 실패했습니다.'}
              onClick={handleAlertButtonClick}
            ></Alert>
          </div>
        )}
        <img src={staticImagePath.timepaperLogo} className="logo-image" />
        <form action="" className={styles.formContainer}>
          <input
            type="text"
            name="email"
            placeholder="아이디(이메일)"
            className={styles.inputId}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className={styles.inputPassword}
            onChange={handleInputChange}
          />
          <div className={styles.buttonContainer}>
            <BottomButton
              title={'로그인'}
              onClick={handleLoginButtonClick}
              isEnable={isLoginButtonEnable}
              pointer={isLoginButtonEnable ? 'pointer' : 'not-allowed'}
            ></BottomButton>
            <button className={styles.signupButton} onClick={handleSignUpButtonClick}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
