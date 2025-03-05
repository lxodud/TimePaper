import React, { useEffect, useState } from 'react';
import styles from './BottomButton.module.css';

export default function BottomButton({ title, onClick, isEnable, pointer }) {
  const [buttonColor, setButtonColor] = useState({ enableColor: '', disableColor: '' });

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const enableColor = rootStyle.getPropertyValue('--orange-color');
    const disableColor = rootStyle.getPropertyValue('--disable-gray-color');

    setButtonColor({
      enableColor: enableColor,
      disableColor: disableColor,
    });
    console.log(pointer)
  }, []);

  return (
    <button
      onClick={onClick}
      className={styles.bottomButton}
      disabled={!isEnable}
      style={{
        backgroundColor: isEnable ? buttonColor.enableColor : buttonColor.disableColor,
        cursor: pointer,
      }}
    >
      {title}
    </button>
  );
}
