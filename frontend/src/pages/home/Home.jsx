import React from 'react';
import staticImagePath from '../../constant/staticImagePath';
import BottomButton from '../../components/BottomButton/BottomButton';
import styles from './Home.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleToCreateButtonClick = () => {
    if (isLoggedIn) {
      navigate('/timepaper/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <img src={staticImagePath.timepaperLogo} className="logo-image" />
        <div className={styles.buttonContainer}>
          <BottomButton
            title={'롤링페이퍼 생성 하러가기'}
            onClick={handleToCreateButtonClick}
            isEnable={true}
          ></BottomButton>
        </div>
      </div>
    </>
  );
}
