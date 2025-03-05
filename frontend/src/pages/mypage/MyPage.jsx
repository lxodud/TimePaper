import React, { useState, useEffect } from 'react';
import styles from './MyPage.module.css';
import Dropdown from './Dropdown.jsx'; // 드롭다운 컴포넌트 import
import { useSelector } from 'react-redux';
import { api } from '../../api/api.js';

const MyPage = () => {
  // Redux 상태에서 email 가져오기
  const email = useSelector((state) => state.auth.email);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const [currentTab, setCurrentTab] = useState('timepapers'); // 현재 선택된 탭
  const [myTimepapers, setMyTimepapers] = useState([]); // timepapers 상태
  const [myPostits, setMyPostits] = useState([]); // postits 상태

  // API 호출로 timepapers 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchTimepapers = async () => {
        try {
          const response = await api.getMyTimePapers();
          console.log('Timepapers response', response);
          const data = response.data.data; // 응답 데이터
          // const titles = data.map((timepaper) => timepaper.title); // title만 추출
          const timepapersWithKeys = data.map((timepaper) => ({
            ...timepaper,
            key: timepaper.rollingPaperId.toString(),
          }));
          setMyTimepapers(timepapersWithKeys); // title만 상태로 설정
        } catch (error) {
          console.error('Error fetching timepapers:', error);
        }
      };
      fetchTimepapers();
    }
  }, [accessToken]); // accessToken이 변경될 때마다 API 호출

  // API 호출로 postits 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchPostits = async () => {
        try {
          const response = await api.getMyPostits();
          console.log('Postits response', response);
          const data = response.data.data; // 응답 데이터
          // const contents = data.map((postit) => postit.content); // content만 추출
          const postitsWithKeys = data.map((postit) => ({
            ...postit,
            key: postit.postitId.toString(),
          }));
          setMyPostits(postitsWithKeys); // content만 상태로 설정
        } catch (error) {
          console.error('Error fetching postits:', error);
        }
      };

      fetchPostits();
    }
  }, [accessToken]); // accessToken이 변경될 때마다 API 호출

  const handleActionClick = (path) => {
    //    console.log(`${path}로 이동`); // 경로 처리 로직 추가
    // 필요 시 navigate(path)로 경로 이동 구현 가능
  };

  return (
    <div className={styles.container}>
      {/* 이메일 정보 */}
      <div className={styles.email}>{email}</div>

      {/* 탭 버튼 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${currentTab === 'timepapers' ? styles.active : ''}`}
          onClick={() => setCurrentTab('timepapers')}
        >
          내가 작성한 롤링페이퍼
        </button>
        <button
          className={`${styles.tabButton} ${currentTab === 'postits' ? styles.active : ''}`}
          onClick={() => setCurrentTab('postits')}
        >
          내가 작성한 포스트잇
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className={styles.content}>
        {currentTab === 'timepapers' && (
          <ul>
            {myTimepapers.map((timepaper) => (
              <li key={timepaper.key} className={styles.listItem}>
                {timepaper.title}
              </li>
            ))}
          </ul>
        )}
        {currentTab === 'postits' && (
          <ul>
            {myPostits.map((postit) => (
              <li key={postit.key} className={styles.listItem}>
                {postit.content}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 드롭다운 메뉴 */}
      <Dropdown onActionClick={handleActionClick} />
    </div>
  );
};

export default MyPage;
