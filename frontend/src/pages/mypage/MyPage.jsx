import React, { useState, useEffect } from 'react';
import styles from './MyPage.module.css';
import Dropdown from './Dropdown.jsx';
import { useSelector } from 'react-redux';
import { api } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal.jsx';

const MyPage = () => {
  const navigate = useNavigate();

  // Redux 상태에서 email 가져오기
  const email = useSelector((state) => state.auth.email);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [currentTab, setCurrentTab] = useState('timepapers'); // 현재 선택된 탭
  const [myTimepapers, setMyTimepapers] = useState([]); // timepapers 상태
  const [timepaper, setTimepaper] = useState(null);

  const [myPostits, setMyPostits] = useState([]); // postits 상태

  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedPostit, setSelectedPostit] = useState(null); // 선택된 포스트잇 정보

  // API 호출로 timepapers 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchTimepapers = async () => {
        try {
          const response = await api.getMyTimePapers();
          const data = response.data.data;
          console.log(data);
          const timepapersWithKeys = data.map((timepaper) => ({
            ...timepaper,
            key: timepaper.rollingPaperId.toString(),
          }));
          setMyTimepapers(timepapersWithKeys);
        } catch (error) {
          console.error('Error fetching timepapers:', error);
        }
      };
      fetchTimepapers();
    }
  }, [accessToken]);

  // API 호출로 postits 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchPostits = async () => {
        try {
          const response = await api.getMyPostits();
          const data = response.data.data;
          const postitsWithKeys = data.map((postit) => ({
            ...postit,
            key: postit.postitId.toString(),
          }));
          setMyPostits(postitsWithKeys);
        } catch (error) {
          console.error('Error fetching postits:', error);
        }
      };

      fetchPostits();
    }
  }, [accessToken]);

  
  // 롤링페이퍼 클릭 시 상세 페이지로 이동
  const handleTimePaperClick = (timepaperId) => {
    navigate(`/timepaper/${timepaperId}`);
  };

  // 포스트잇 클릭 시 모달 열기
  const handlePostitClick = (postit) => {
    setSelectedPostit(postit); // 선택된 포스트잇 정보 저장
    setModalOpen(true); // 모달 열기
  };

  // 포스트잇 삭제 핸들러
  const handleDeletePostit = (deletedPostitId) => {
    setMyPostits((prev) => prev.filter((postit) => postit.postitId !== deletedPostitId));
    setModalOpen(false); // 모달 닫기
    setSelectedPostit(null); // 선택된 포스트잇 초기화
  };

  const handleActionClick = (path) => {
    console.log(`${path}로 이동`);
  };
  console.log(selectedPostit);
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
              <li
                key={timepaper.key}
                className={styles.listItem}
                onClick={() => handleTimePaperClick(timepaper.rollingPaperId)}
              >
                {timepaper.title}
              </li>
            ))}
          </ul>
        )}
        {currentTab === 'postits' && (
          <ul>
            {myPostits.map((postit) => (
              <li
                key={postit.key}
                className={styles.listItem}
                onClick={() => handlePostitClick(postit)}
              >
                {postit.content}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 드롭다운 메뉴 */}
      <Dropdown onActionClick={handleActionClick} />

      {/* 포스트잇 모달 */}
      {isModalOpen && selectedPostit && (
        <Modal
          onClose={() => {
            setModalOpen(false);
            setSelectedPostit(null);
          }}
          onDelete={handleDeletePostit}
          imageUrl={selectedPostit.imageUrl}
          modalContent={selectedPostit.content}
          from={selectedPostit.creator}
          postitId={selectedPostit.postitId}
        />
      )}
    </div>
  );
};

export default MyPage;
