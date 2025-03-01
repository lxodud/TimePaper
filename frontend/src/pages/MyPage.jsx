import React, { useState, useEffect } from 'react';
// import { api } from '../api/api'; // 실제 API 호출 시 활성화
import './MyPage.module.css'; // 스타일 파일 경로에 맞게 수정하세요.

const MyPage = () => {
  // 초기 상태 설정
  const initState = {
    myInfo: {
      recipientEmail: "testuser@example.com",
    },
    myTimepapers: [
      { id: 1, title: "Project Plan" },
      { id: 2, title: "Weekly Goals" },
      { id: 3, title: "Team Meeting Notes" },
    ],
    myPostits: [
      { id: 1, content: "Buy groceries" },
      { id: 2, content: "Prepare presentation" },
      { id: 3, content: "Call the client" },
    ],
  };

  // 상태 관리
  const [myInfo, setMyInfo] = useState(initState.myInfo);
  const [myTimepapers, setMyTimepapers] = useState(initState.myTimepapers);
  const [myPostits, setMyPostits] = useState(initState.myPostits);
  const [error, setError] = useState(null);

  // 데이터 가져오기 (실제 API 호출 시 활성화)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 API 호출 코드 (주석 처리됨)
        // const info = await api.getMyInfo();
        // const timepapers = await api.getMyTimePapers();
        // const postits = await api.getMyPostits();

        // 상태 업데이트 (테스트용 가상 데이터 사용)
        // setMyInfo(info);
        // setMyTimepapers(timepapers);
        // setMyPostits(postits);
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
    <div>
      <h1>My Page</h1>

      {/* 내 정보 */}
      <section>
        <h2>내 정보</h2>
        <p>Email: {myInfo.recipientEmail}</p>
      </section>

      {/* 내가 작성한 롤링페이퍼 */}
      <section>
        <h2>내가 작성한 롤링페이퍼</h2>
        {myTimepapers && myTimepapers.length > 0 ? (
          <ul>
            {myTimepapers.map((timepaper) => (
              <li key={timepaper.id}>{timepaper.title}</li>
            ))}
          </ul>
        ) : (
          <p>작성한 롤링페이퍼가 없습니다.</p>
        )}
      </section>

      {/* 내가 작성한 포스트잇 */}
      <section>
        <h2>내가 작성한 포스트잇</h2>
        {myPostits && myPostits.length > 0 ? (
          <ul>
            {myPostits.map((postit) => (
              <li key={postit.id}>{postit.content}</li>
            ))}
          </ul>
        ) : (
          <p>작성한 포스트잇이 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default MyPage;
