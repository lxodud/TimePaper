import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';
import { api } from '../../api/api';
import styles from './TimePaperDetail.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import ConfirmModal from '../../components/confirmmodal/ConfirmModal';
import Modal from '../../components/Modal/Modal';

export default function TimePaperDetail() {
  const { timepaperId } = useParams();
  const dispatch = useDispatch();
  const [timepaper, setTimepaper] = useState(null);
  const [postits, setPostits] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 모달 창 상태 관리
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPostit, setSelectedPostit] = useState(null); // 선택된 포스트잇 저장
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Redux에서 현재 로그인한 사용자의 이메일 가져오기
  const userEmail = useSelector((state) => state.auth.email || '');

  useEffect(() => {
    const fetchTimepaper = async () => {
      try {
        const response = await api.getTimepaper(timepaperId);
        if (response && response.data && response.data.data) {
          const timePaperData = response.data.data;
          setTimepaper(timePaperData);
          dispatch(setPageTitle(timePaperData.title));
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('해당 타임페이퍼는 존재하지 않습니다.');
        } else {
          console.log(error.response.status);
          console.error('타임페이퍼 조회 에러:', error);
          setErrorMessage('타임페이퍼 데이터를 불러오는 중 오류가 발생했습니다.');
        }
      }
    };
    fetchTimepaper();
  }, [timepaperId, dispatch]);

  // 포스트잇 데이터 가져오기
  useEffect(() => {
    if (!timepaper) return; // 타임페이퍼가 없으면 포스트잇 데이터를 가져오지 않음
    const fetchPostits = async () => {
      try {
        const response = await api.getPostits(timepaperId);
        if (response && response.data && response.data.data && response.data.data.postits) {
          setPostits(response.data.data.postits);
        } else {
          console.error('포스트잇 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('포스트잇 조회 에러:', error);
      }
    };

    fetchPostits();
  }, [timepaper, timepaperId]);

  const handleCapsuleClick = () => {
    navigate(`/timepaper/${timepaperId}/capsule`, {
      state: { authorEmail: userEmail },
    });
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };
  // 포스트잇 클릭 시 해당 포스트잇의 데이터를 상태로 저장 후 모달 열기
  const handlePostitClick = (postit) => {
    setSelectedPostit(postit);
    setModalOpen(true);
  };

  const handlePostItCreateClick = () => {
    navigate(`/timepaper/${timepaperId}/postit/create`);
  };

  const handleDeleteTimepaper = async () => {
    try {
      await api.deleteTimepaper(timepaperId); // 삭제 API 호출
      alert('타임페이퍼가 성공적으로 삭제되었습니다.');
      navigate('/'); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error('타임페이퍼 삭제 실패:', error);
      alert('타임페이퍼를 삭제하는 데 실패했습니다.');
    }
    setShowConfirmModal(false); // 모달 닫기
  };

  if (errorMessage) {
    return <div className={styles.error}>{errorMessage}</div>; // 에러 메시지 표시
  }

  return (
    <>
      {timepaper ? (
        <div className={styles.timepaperDetail}>
          <h2>{timepaper.title}</h2>
        </div>
      ) : (
        <div>타임페이퍼 데이터를 불러오는 중...</div>
      )}
      <div className={styles.container}>
        <div className={styles.postitsSection}>
          {postits && postits.length > 0 ? (
            <ul className={styles.timepaperList}>
              {postits.map((postit) => (
                <li
                  key={postit.postitId}
                  className={styles.timepaperItem}
                  onClick={() => handlePostitClick(postit)}
                >
                  <div
                    className={styles.postitBackground}
                    style={{ backgroundImage: `url(${encodeURI(postit.imageUrl)})` }}
                  >
                    <div className={styles.overlay}>
                      <p className={styles.postitContent}>{postit.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>포스트잇이 없습니다.</div>
          )}
          {timepaper &&
            timepaper.writerEmail.trim().toLowerCase() === userEmail.trim().toLowerCase() && (
              <div className={styles.buttonGroup}>
                <BottomButton
                  title="타임페이퍼 캡슐화"
                  onClick={handleCapsuleClick}
                  isEnable={true}
                />
                <BottomButton title="타임페이퍼 삭제" onClick={handleDeleteClick} isEnable={true} />
                <BottomButton
                  title="포스트잇 작성"
                  onClick={handlePostItCreateClick}
                  isEnable={true}
                />

                {/* 확인 모달 */}
                {showConfirmModal && (
                  <ConfirmModal
                    message="정말로 이 타임페이퍼를 삭제하시겠습니까?"
                    onConfirm={handleDeleteTimepaper} // 확인 클릭 시 삭제 처리
                    onCancel={() => setShowConfirmModal(false)} // 취소 클릭 시 모달 닫기
                  />
                )}
                {/* 클릭한 포스트잇에 대한 정보를 이용해 모달 한 번만 렌더링 */}
                {isModalOpen && selectedPostit && (
                  <Modal
                    onClose={() => {
                      setModalOpen(false);
                      setSelectedPostit(null);
                    }}
                    imageUrl={selectedPostit.imageUrl}
                    modalContent={selectedPostit.content}
                    from={selectedPostit.author}
                  />
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
}
