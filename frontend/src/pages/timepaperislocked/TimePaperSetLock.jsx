import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './timePaperSetLock.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';

const tempTimePaperSetLock = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 'dummyId' });
    }, 1000);
  });
};

export default function TimePaperSetLock() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('제목을 입력해주세요.');

  const navigate = useNavigate();
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const handleEmailChange = (e) => {
    let newValue = e.target.value;
    if (!regEmail.newValue) {
      setError(true);
      setErrorMessage(' 올바른 이메일 형식을 입력해 주세요. ');
    } else {
      setError(false);
    }
    setEmail(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(true);
      setErrorMessage('수신 받을 Email을 입력해주세요.');
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const response = await tempPostTimePaper({ email });
      navigate(`/timepaper/${response.id}`);
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMessage('타임페이퍼 캡슐화화 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <p>알림 받을 수신자 이메일</p>
            <UnderBarInput
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
            />
            <div
              className={styles.errContainer}
              style={{ visibility: error ? 'visible' : 'hidden' }}
            >
              {errorMessage}
            </div>
            <div>
              <p>언제 열어보시겠어요?</p>
              <input type="date" />
            </div>
          </div>
          <BottomButton
            title={loading ? '시간 자물쇠 거는 중...' : '타임페이퍼 캡슐화'}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </>
  );
}
