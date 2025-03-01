import React, { useState, useEffect } from 'react';
import { api } from '../api/apiInstance'; // API 호출 파일 경로에 맞게 수정하세요.
import './MyPage.module.css'; // 스타일 파일 경로에 맞게 수정하세요.

const MyPage = () => {
  const [myInfo, setMyInfo] = useState(null);
  const [myTimepapers, setMyTimepapers] = useState([]);
  const [myPostits, setMyPostits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await api.getMyInfo();
        const timepapers = await api.getMyTimePapers();
        const postits = await api.getMyPostits();

        setMyInfo(info);
        setMyTimepapers(timepapers);
        setMyPostits(postits);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!myInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="my-page">
      <header className="header">
        <h1>마이페이지</h1>
        <p>{myInfo.email}</p>
      </header>

      <div className="tabs">
        <button>내가 작성한 롤링페이퍼</button>
        <button>내가 작성한 포스트잇</button>
      </div>

      <section className="content">
        <h2>내가 작성한 롤링페이퍼</h2>
        {myTimepapers.length > 0 ? (
          <ul>
            {myTimepapers.map((timepaper) => (
              <li key={timepaper.id}>{timepaper.title}</li>
            ))}
          </ul>
        ) : (
          <p>작성한 롤링페이퍼가 없습니다.</p>
        )}

        <h2>내가 작성한 포스트잇</h2>
        {myPostits.length > 0 ? (
          <ul>
            {myPostits.map((postit) => (
              <li key={postit.id}>{postit.content}</li>
            ))}
          </ul>
        ) : (
          <p>작성한 포스트잇이 없습니다.</p>
        )}
      </section>

      <footer className="footer">
        <button onClick={() => api.logout()}>로그아웃</button>
        <button onClick={() => api.unsubscribe()}>회원탈퇴</button>
        <button>문의하기</button>
      </footer>
    </div>
  );
};

export default MyPage;
