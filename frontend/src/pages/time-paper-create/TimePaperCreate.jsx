import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TimePaperCreate.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';
import { api } from '../../api/api';
import { useSelector } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';
import { useDispatch } from 'react-redux';

export default function TimePaperCreate() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('제목을 입력해주세요.');
  const [isLoginButtonEnable, setIsLoginButtonEnable] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    let newValue = e.target.value;
    if (newValue.length > 30) {
      newValue = newValue.slice(0, 30);
      setError(true);
      setErrorMessage('제목의 최대 글자 수는 30자 입니다.');
    } else {
      setError(false);
    }
    setTitle(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(true);
      setErrorMessage('제목을 입력해주세요.');
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const response = await api.createTimepaper(title);
      console.log(response);
      navigate(`/timepaper/${response.data.data.timePaperId}`);
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMessage('타임페이퍼 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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

  return (
    <>
      <form>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <UnderBarInput
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={handleTitleChange}
            />
            <div
              className={styles.errContainer}
              style={{ visibility: error ? 'visible' : 'hidden' }}
            >
              {errorMessage}
            </div>
          </div>
          <BottomButton
            title={loading ? '추억거리 생성 중...' : '타임페이퍼 생성'}
            onClick={handleSubmit}
            isEnable={isLoginButtonEnable}
          />
        </div>
      </form>
    </>
  );
}
