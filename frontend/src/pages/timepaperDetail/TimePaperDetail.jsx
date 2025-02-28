import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './timepaperdetail.module.css';

export default function TimePaperDetail() {
  const { timepaperId } = useParams();
  const [timepapers, setTimepapers] = useState([
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

  return (
    <div className={styles.container}>
      <h2>2022년도 졸업식</h2>

      <ul className={styles.timepaperList}>
        {timepapers.map((paper) => (
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
