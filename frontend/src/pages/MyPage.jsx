import React, { useState, useEffect } from 'react';
import styles from './MyPage.module.css';
import { api } from '../api/api'; // api 파일 경로에 맞게 수정
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPath } from '../store/slices/pathSlice'; // pathSlice 파일 경로에 맞게 수정
import { useNavigate } from 'react-router-dom';

const MyPage = () => {

 const initState = {
  myInfo: {
    email: 'testuser@example.com', // Ensure email is included in myInfo
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

  const [myInfo, setMyInfo] = useState(null);
  const [myTimepapers, setMyTimepapers] = useState([]); // 초기 상태를 빈 배열로 설정
  const [myPostits, setMyPostits] = useState([]); // 초기 상태를 빈 배열로 설정
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useSelector((state) => state.path.currentPath); // 현재 경로 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보 가져오기
        const userInfo = await api.getMyInfo();
        setMyInfo(userInfo);

        // 내가 작성한 롤링페이퍼 가져오기
        const timepapers = await api.getMyTimePapers();
        setMyTimepapers(timepapers);

        // 내가 작성한 포스트잇 가져오기
        const postits = await api.getMyPostits();
        setMyPostits(postits);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (path) => {
    dispatch(setCurrentPath(path)); // 현재 경로 업데이트
    navigate(path); // 경로 변경
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }

  if (!myInfo) {
    return <div>사용자 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {/* 이메일 정보는 항상 표시 */}
      <section className={styles.emailSection}>
        <h2>내 정보</h2>
        <p>Email: {myInfo.email}</p> {/* API로 가져온 이메일 정보 표시 */}
      </section>

      {/* 탭 버튼 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${currentPath === '/my/timepapers' ? styles.active : ''}`}
          onClick={() => handleTabClick('/my/timepapers')}
        >
          내가 작성한 롤링페이퍼
        </button>
        <button
          className={`${styles.tabButton} ${currentPath === '/my/postits' ? styles.active : ''}`}
          onClick={() => handleTabClick('/my/postits')}
        >
          내가 작성한 포스트잇
        </button>
      </div>

      {/* 탭 내용 */}
      <div className={styles.content}>
        {currentPath === '/my/timepapers' && (
          <section>
            <h2>내가 작성한 롤링페이퍼</h2>
            {myTimepapers.length > 0 ? (
              <ul>
                {myTimepapers.map((timepaper) => (
                  <li key={timepaper.id} className={styles.listItem}>
                    {timepaper.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>작성한 롤링페이퍼가 없습니다.</p>
            )}
          </section>
        )}

        {currentPath === '/my/postits' && (
          <section>
            <h2>내가 작성한 포스트잇</h2>
            {myPostits.length > 0 ? (
              <ul>
                {myPostits.map((postit) => (
                  <li key={postit.id} className={styles.listItem}>
                    {postit.content}
                  </li>
                ))}
              </ul>
            ) : (
              <p>작성한 포스트잇이 없습니다.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyPage;