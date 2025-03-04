import React, { useEffect, useState } from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './Login.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import { api } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const [inputData, setIntputData] = useState({ email: '', password: '' });
  const [isLoginButtonEnable, setIsLoginButtonEnable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLoginButtonClick = (event) => {
    setIsLoginButtonEnable(false);
    event.preventDefault();
    (async () => {
      try {
        const response = await api.login(inputData.email, inputData.password);

        dispatch(login(response.headers.authorization));
        const next = location.state?.next ?? -1;
        navigate(next, { replace: true });
      } catch (error) {
        setIsLoginButtonEnable(true);
      }
    })();
  };

  const handleInputChange = (event) => {
    setIntputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
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
            ></BottomButton>
            <button className={styles.signupButton}>회원가입</button>
          </div>
        </form>
      </div>
    </>
  );
}
