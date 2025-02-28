import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './timepaperdetail.module.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/headerSlice';

const tempPostTimePaper = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: '2022년도 졸업식' });
    }, 1000);
  });
};
export default function TimePaperDetail() {
  const { timepaperId } = useParams();
  const [postIt, setPostIt] = useState([
    {
      id: 1,
      title: '감사합니다.',
      post: '/images/createPostit.png',
    },
    {
      id: 2,
      title: '고맙습니다',
      post: '/images/postitD.png',
    },
    {
      id: 3,
      title: '날씨가 춥습니다',
      post: '/images/postitN.png',
    },
    {
      id: 4,
      title: '벌써 새해가 밝았습니다.',
      post: '/images/postitD.png',
    },
    {
      id: 5,
      title: '지난해에는 ....',
      post: '/images/postitN.png',
    },
    {
      id: 6,
      title: '어쩌다 마주친....',
      post: '/images/postitD.png',
    },
    {
      id: 7,
      title: '사랑스러운 센세이....',
      post: '/images/postitN.png',
    },
    {
      id: 8,
      title: '영원한 이별은 없습니다.다시...',
      post: '/images/postitD.png',
    },
    {
      id: 9,
      title: '이별의 슬품은....',
      post: '/images/postitN.png',
    },
    {
      id: 10,
      title: '너와 내가 이제는...',
      post: '/images/postitD.png',
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateHeaderTitle = async () => {
      try {
        // 필요시 timepaperId 등 data를 전달합니다.
        const data = await tempPostTimePaper({ timepaperId });
        dispatch(setPageTitle(data.title)); // 전역 상태에 타이틀 업데이트
      } catch (error) {
        console.error('Error fetching timepaper data:', error);
      }
    };
    updateHeaderTitle();
  }, [timepaperId, dispatch]);
  return (
    <div className={styles.container}>
      <h2>2022년도 졸업식</h2>

      <ul className={styles.timepaperList}>
        {postIt.map((paper) => (
          <li key={paper.id} className={styles.timepaperItem}>
            <h3>{paper.title}</h3>
            {/* 이미지 경로를 src 속성에 전달 */}
            <img src={paper.post} alt={paper.title} />
          </li>
        ))}
      </ul>
      <button className={styles.addButton}>롤링페이퍼 잠굼</button>
    </div>
  );
}
