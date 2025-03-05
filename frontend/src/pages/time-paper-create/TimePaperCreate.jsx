import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TimePaperCreate.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';
import { api } from '../../api/api';
import { useSelector } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';
import { useDispatch } from 'react-redux';
import Alert from '../../components/Alert/Alert';
import { finishLoading, startLoading } from '../../store/slices/loadingSlice';

export default function TimePaperCreate() {
  const [title, setTitle] = useState('');
  const [isInValidTitle, setIsInValidTitle] = useState(false);
  const [invalidTitleMessage, setInvalidTitleMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('제목을 입력해주세요.');
  const [isLoginButtonEnable, setIsLoginButtonEnable] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);

    if (newValue === '') {
      setIsInValidTitle(false);
      return;
    }
    if (newValue && newValue.trim().length === 0) {
      setIsInValidTitle(true);
      setInvalidTitleMessage('공백만으로 이루어진 제목은 사용할 수 없습니다.');
      return;
    }
    if (newValue.length > 30) {
      const trimmedValue = newValue.slice(0, 30);
      setTitle(trimmedValue);
      setIsInValidTitle(true);
      setInvalidTitleMessage('제목의 최대 글자 수는 30자 입니다.');
      return;
    }
    setInvalidTitleMessage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setIsError(true);
      setErrorMessage('제목을 입력해주세요.');
      return;
    }

    try {
      dispatch(startLoading());
      const response = await api.createTimepaper(title);
      console.log(response);
      navigate(`/timepaper/${response.data.data.timePaperId}`);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setErrorMessage('타임페이퍼 생성 중 오류가 발생했습니다.');
    } finally {
      dispatch(finishLoading());
    }
  };

  useEffect(() => {
    if (title.trim().length !== 0) {
      setIsLoginButtonEnable(true);
    } else {
      setIsLoginButtonEnable(false);
    }
  }, [title]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: {
          next: '/timepaper/create',
        },
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(setPageTitle('타임페이퍼 생성'));
  }, []);

  const handleAlertButtonClick = () => {
    setIsError(false);
  };

  return (
    <>
      <form>
        <div className={styles.container}>
          {isError && (
            <div className={styles.alertContainer}>
              <Alert
                buttonTitle={'확인'}
                message={errorMessage}
                onClick={handleAlertButtonClick}
              ></Alert>
            </div>
          )}
          <div className={styles.inputContainer}>
            <UnderBarInput
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={handleTitleChange}
            />
            <div
              className={styles.errContainer}
              style={{ visibility: isInValidTitle ? 'visible' : 'hidden' }}
            >
              {invalidTitleMessage}
            </div>
          </div>
          <BottomButton
            title={'타임페이퍼 생성'}
            onClick={handleSubmit}
            isEnable={isLoginButtonEnable}
          />
        </div>
      </form>
    </>
  );
}
