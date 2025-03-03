import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';
import { api } from '../../api/api';
import styles from './TimePaperDetail.module.css';
import BottomButton from '../../components/BottomButton/BottomButton';

export default function TimePaperDetail() {
  const { timepaperId } = useParams();
  const dispatch = useDispatch();
  const [timepaper, setTimepaper] = useState(null);
  const [postits, setPostits] = useState([]);

  useEffect(() => {
    const fetchTimepaper = async () => {
      try {
        const response = await api.getTimepaper(timepaperId);
        if (response && response.data && response.data.data) {
          const timePaperData = response.data.data;
          setTimepaper(timePaperData);
          dispatch(setPageTitle(timePaperData.title));
        } else {
          console.error('타임페이퍼 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('타임페이퍼 조회 에러:', error);
      }
    };

    fetchTimepaper();
  }, [timepaperId, dispatch]);

  useEffect(() => {
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
  }, [timepaperId]);
  // console.log('타임페이퍼 생성자 이메일', timepaper?.writerEmail);
  // console.log('유저 이메일', userEmail);
  return (
    <div className={styles.container}>
      {timepaper ? (
        <div className={styles.timepaperDetail}>
          <h2>{timepaper.title}</h2>
        </div>
      ) : (
        <div>타임페이퍼 데이터를 불러오는 중...</div>
      )}

      <div className={styles.postitsSection}>
        {postits && postits.length > 0 ? (
          <ul className={styles.timepaperList}>
            {postits.map((postit) => (
              <li key={postit.postitId} className={styles.timepaperItem}>
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
        <BottomButton title="타임페이퍼 캡슐화"></BottomButton>
        {/* {timepaper &&
          timepaper.writerEmail.trim().toLowerCase() === userEmail.trim().toLowerCase() && (
            <BottomButton title="타임페이퍼 캡슐화" />
          )} */}
      </div>
    </div>
  );
}
