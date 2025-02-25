import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './timePaperCreate.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';

// 가짜 Api 함수
const tempPostTimePaper = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 'dummyId' });
    }, 1000);
  });
};

export default function TimePaperCreate() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length > 30) {
      setError('제목의 최대 글자 수는 30자 입니다.');
      return;
    } else {
      setError(null);
    }
    setTitle(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await tempPostTimePaper({ title });
      navigate(`/timepaper/${response.id}`);
    } catch (err) {
      console.error(err);
      setError('타임페이퍼 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <UnderBarInput
              placeholder="제목을 입력해주세요"
              value={title} 
              onChange={handleTitleChange}
            />
            {error && <div className={styles.errContainer}>{error}</div>}
          </div>
          <BottomButton
            title={loading ? '추억거리 생성 중...' : '타임페이퍼 생성'}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </>
  );
}
