import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import styles from './TimePaperSetLock.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';
import { finishLoading, startLoading } from '../../store/slices/loadingSlice';
import Alert from '../../components/Alert/Alert';

export default function TimePaperSetLock() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('제목을 입력해주세요.');
  const [releaseDate, setReleaseDate] = useState(null);
  const [isCapsuleButtonEnable, setIsCapsuleButtonEnable] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { timepaperId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const handleEmailChange = (e) => {
    let newValue = e.target.value;
    if (!regEmail.test(newValue)) {
      setError(true);
      setErrorMessage(' 올바른 이메일 형식을 입력해 주세요. ');
    } else {
      setError(false);
    }
    setEmail(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCapsuleButtonEnable(false);

    dispatch(startLoading());

    try {
      const response = await api.lockTimepaper(timepaperId, email, releaseDate);
      navigate(`/timepaper/${response.id}/lock`, { replace: true });
    } catch (err) {
      console.error(err);
      setIsShowAlert(true)
      setAlertMessage('타임페이퍼 캡슐화 중 오류가 발생했습니다.');
    } finally {
      dispatch(finishLoading());
      setIsCapsuleButtonEnable(true);
    }
  };

  useEffect(() => {
    if (!error && email.trim().length !== 0 && releaseDate !== null) {
      setIsCapsuleButtonEnable(true);
    } else {
      setIsCapsuleButtonEnable(false);
    }
  }, [email, releaseDate]);

  useEffect(() => {
    dispatch(setPageTitle('타임캡슐 생성'));
  }, []);

  const handleAlertButtonClick = () => {
    setIsShowAlert(false);
  };

  if (!location.state?.authorEmail) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {isShowAlert && <Alert message={alertMessage} buttonTitle={"확인"} onClick={handleAlertButtonClick}></Alert>}
      <form>
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
            <div className={styles.dateInputContainer}>
              <p className={styles.whenPtag}>언제 열어보시겠어요?</p>
              <DatePicker
                selected={releaseDate}
                onChange={(date) => setReleaseDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className={styles.dateInput}
                placeholderText="날짜를 선택하세요"
                value={releaseDate}
              />
            </div>
          </div>
          <BottomButton
            title={'타임페이퍼 캡슐화'}
            onClick={handleSubmit}
            isEnable={isCapsuleButtonEnable}
          />
        </div>
      </form>
    </>
  );
}
