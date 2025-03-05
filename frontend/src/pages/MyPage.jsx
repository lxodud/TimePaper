import React, { useState } from 'react';
import styles from './MyPage.module.css';
import Dropdown from './Dropdown'; // 드롭다운 컴포넌트 import

const MyPage = () => {
  const initState = {
    myInfo: {
      email: 'test@nav.com',
    },
    myTimepapers: [
      { id: 1, title: 'Project Plan' },
      { id: 2, title: 'Weekly Goals' },
      { id: 3, title: 'Team Meeting Notes' },
    ],
    myPostits: [
      { id: 1, content: 'Buy groceries' },
      { id: 2, content: 'Prepare presentation' },
      { id: 3, content: 'Call the client' },
    ],
  };

  const [currentTab, setCurrentTab] = useState('timepapers'); // 현재 선택된 탭
  const [myInfo] = useState(initState.myInfo);
  const [myTimepapers] = useState(initState.myTimepapers);
  const [myPostits] = useState(initState.myPostits);
 
  // Access Token 검증 및 데이터 가져오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const accessToken = localStorage.getItem('accessToken'); // LocalStorage에서 토큰 가져오기

  //     if (!accessToken) {
  //       setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
  //       setTimeout(() => navigate('/login'), 9000); // 로그인 페이지로 리다이렉트
  //       return;
  //     }

//   try {
//     // 사용자 정보 가져오기
//     const userInfo = await api.getMyInfo();
//     setMyInfo(userInfo);

//     // 내가 작성한 롤링페이퍼 가져오기
//     const timepapers = await api.getMyTimePapers();
//     setMyTimepapers(timepapers);

//     // 내가 작성한 포스트잇 가져오기
//     const postits = await api.getMyPostits();
//     setMyPostits(postits);
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     setError('데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
//   } finally {
//     setIsLoading(false); // 로딩 상태 종료
//   }
// };

// fetchData();
// }, [navigate]);

// const handleTabClick = (path) => {
// dispatch(setCurrentPath(path)); // 현재 경로 업데이트
// navigate(path); // 경로 변경
// };

// if (error) {
// return <div className="error">{error}</div>;
// }

// if (isLoading) {
// return <div>로딩 중...</div>; // 로딩 중일 때 표시
// }

// if (!myInfo) {
// return <div>사용자 정보를 불러오지 못했습니다.</div>;
// }

  const handleActionClick = (path) => {
    console.log(`${path}로 이동`); // 경로 처리 로직 추가
    // 필요 시 navigate(path)로 경로 이동 구현 가능
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <button className={styles.backButton}>←</button>
        <h2 className={styles.title}>마이페이지</h2>
        <button className={styles.homeButton}>🏠</button>
      </header>

      {/* 이메일 정보 */}
      <div className={styles.email}>{myInfo.email}</div>

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
              <li key={timepaper.id} className={styles.listItem}>
                {timepaper.title}
              </li>
            ))}
          </ul>
        )}
        {currentTab === 'postits' && (
          <ul>
            {myPostits.map((postit) => (
              <li key={postit.id} className={styles.listItem}>
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
