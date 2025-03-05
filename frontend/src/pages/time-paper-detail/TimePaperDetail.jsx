import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';
import { api } from '../../api/api';
import styles from './TimePaperDetail.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';
import ConfirmModal from '../../components/confirmmodal/ConfirmModal';
import Modal from '../../components/Modal/Modal';
import { finishLoading, startLoading } from '../../store/slices/loadingSlice';
import Alert from '../../components/Alert/Alert';

export default function TimePaperDetail() {
  const { timepaperId } = useParams();
  const [timepaper, setTimepaper] = useState(null);
  const [postits, setPostits] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 모달 창 상태 관리
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPostit, setSelectedPostit] = useState(null); // 선택된 포스트잇 저장
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isScrollLoading, setIsScrollLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bottomRef = useRef();

  const { userId, isLoading } = useSelector((state) => {
    return {
      userId: state.auth.userId || '',
      isLoading: state.loading.isLoading,
    };
  });

  useEffect(() => {
    const fetchTimepaper = async () => {
      dispatch(startLoading());
      try {
        const timePaperResponse = await api.getTimepaper(timepaperId);
        if (timePaperResponse && timePaperResponse.data && timePaperResponse.data.data) {
          const timePaperData = timePaperResponse.data.data;
          if (timePaperData.locked) {
            navigate(`/timepaper/${timepaperId}/lock`, { replace: true});
            return;
          }

          setTimepaper(timePaperData);
          dispatch(setPageTitle('타임페이퍼'));
        }
      } catch (error) {
        setIsError(true);
        if (error.response && error.response.status === 404) {
          setErrorMessage('해당 타임페이퍼는 존재하지 않습니다.');
        } else {
          setErrorMessage('타임페이퍼 데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        dispatch(finishLoading());
      }
    };

    fetchTimepaper();
  }, [timepaperId, dispatch]);

  const getPostits = async (timepaperId) => {
    if (!hasNext) {
      return;
    }

    dispatch(startLoading());
    setIsScrollLoading(true)

    try {
      const response = await api.getPostits(timepaperId, currentPage);
      const postits = response.data.data.postits;
      const next = response.data.data.hasNext;
      setHasNext(next);
      setPostits((prev) => [...prev, ...postits]);
    } catch {
    } finally {
      dispatch(finishLoading());
      setIsScrollLoading(false)
    }
  };

  const handleCapsuleClick = () => {
    navigate(`/timepaper/${timepaperId}/capsule`, {
      state: { authorEmail: userId },
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
      setIsError(true);
      setErrorMessage('타임페이퍼를 삭제하는 데 실패했습니다.');
    }
    setShowConfirmModal(false); // 모달 닫기
  };
  // 포스트잇 삭제 업데이트 콜백
  const handleDeletePostit = (deletedPostitId) => {
    setPostits((prev) => prev.filter((postit) => postit.postitId !== deletedPostitId));
    // 모달 창도 닫기 처리
    setModalOpen(false);
    setSelectedPostit(null);
  };

  if (errorMessage) {
    return <div className={styles.error}>{errorMessage}</div>; // 에러 메시지 표시
  }

  const handleScroll = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && hasNext && !isFirstRender && !isScrollLoading) {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, isFirstRender, isScrollLoading, hasNext],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 1,
    });

    observer.observe(bottomRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleScroll]);

  useEffect(() => {
    getPostits(timepaperId, currentPage);
  }, [currentPage]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const handleAlertButtonClick = () => {
    setIsError(false);
  };

  return (
    <>
      {isError && (
        <Alert message={errorMessage} buttonTitle={'확인'} onClick={handleAlertButtonClick}></Alert>
      )}
      {timepaper && (
        <div className={styles.timepaperDetail}>
          <h2>{timepaper.title}</h2>
        </div>
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
          {/* 클릭한 포스트잇에 대한 정보를 이용해 모달 한 번만 렌더링 */}
          {isModalOpen && selectedPostit && (
            <Modal
              onClose={() => {
                setModalOpen(false);
                setSelectedPostit(null);
              }}
              onDelete={handleDeletePostit}
              imageUrl={selectedPostit.imageUrl}
              modalContent={selectedPostit.content}
              from={selectedPostit.author}
              postitId={selectedPostit.postitId}
              authorId={selectedPostit.authorId}
              userId={userId}
            />
          )}
          <div className={styles.floatButton}>
            {timepaper && timepaper.writerId === userId && (
              <div className={styles.buttonGroup}>
                <BottomButton
                  title="타임페이퍼 캡슐화"
                  onClick={handleCapsuleClick}
                  isEnable={true}
                />
                <BottomButton title="타임페이퍼 삭제" onClick={handleDeleteClick} isEnable={true} />

                {/* 확인 모달 */}
                {showConfirmModal && (
                  <ConfirmModal
                    message="정말로 이 타임페이퍼를 삭제하시겠습니까?"
                    onConfirm={handleDeleteTimepaper} // 확인 클릭 시 삭제 처리
                    onCancel={() => setShowConfirmModal(false)} // 취소 클릭 시 모달 닫기
                  />
                )}
              </div>
            )}
            <BottomButton
              title="포스트잇 작성"
              onClick={handlePostItCreateClick}
              isEnable={true}
              className={styles.postitCreate}
            />
          </div>
        </div>
      </div>
      <div ref={bottomRef}></div>
      {isScrollLoading && <div>로딩중......</div>}
    </>
  );
}
