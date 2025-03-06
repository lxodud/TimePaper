import React, { useEffect } from 'react';
import BottomButton from '../BottomButton/BottomButton';

export default function ShareLink({ timepaperId }) {
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const realUrl = `https://43.201.24.13.sslip.io/timepaper/${timepaperId}`;

  useEffect(() => {
    if (!window.Kakao) {
      console.error('Kakao SDK 로드 안됨');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY);
      console.log('Kakao 초기화:', window.Kakao.isInitialized());
    }
  }, []);

  const shareKakao = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK 로드 안됨');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '친구에게서 타임페이퍼가 왔어요💕',
        description: '',
        imageUrl: `https://43.201.24.13.sslip.io/assets/timepaperLogo-0WzOUFBd.png`,
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: '친구가 전달한 타임페이퍼로 🚀',
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
    });
  };
  return (
    <>
      <BottomButton onClick={shareKakao} title={`공유하기`} isEnable={true}></BottomButton>
    </>
  );
}
