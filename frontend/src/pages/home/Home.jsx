import React from 'react';
import staticImagePath from '../../constant/staticImagePath';
import BottomButton from '../../components/BottomButton/BottomButton';

export default function Home() {
  return (
    <>
      <div>
        <img src={staticImagePath.timepaperLogo} />
        <BottomButton></BottomButton>
      </div>
    </>
  );
}
