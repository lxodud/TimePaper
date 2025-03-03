import React, { useRef, useState } from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './PostItCreate.module.css';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';
import BottomButton from '../../components/BottomButton/BottomButton';

export default function PostItCreate() {
  const fileInputRef = useRef(null);
  const [staticImage, setStaticImage] = useState(staticImagePath.postitAfternoon);
  const [customImage, setCustomImage] = useState(null);

  const templates = [staticImagePath.postitAfternoon, staticImagePath.postitNight];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (src) => {
    setStaticImage(src);
    setCustomImage(null);
  };

  const handleImageSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveBtn = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className={styles.container}>
        <div className={styles.underBarInput}>
          <UnderBarInput placeholder="작성자 입력"></UnderBarInput>
        </div>
        <div className={styles.selectedImage}>
          <img
            src={customImage || staticImage}
            className="logo-image"
            alt="선택된 포스트잇 이미지"
          />
          <textarea className={styles.textarea}></textarea>
        </div>
        <section className={styles.imageContainer}>
          {templates.map((src, index) => (
            <img
              key={index}
              src={src}
              className={styles.templateThumbnail}
              onClick={() => handleTemplateSelect(src)}
              alt={`테마 ${index + 1}`}
            />
          ))}
          <img
            src={staticImagePath.imageSelectIcon}
            className={styles.templateThumbnail}
            onClick={handleImageSelectClick}
            alt="사용자가 선택한 이미지"
          />
          <input
            type="file"
            ref={fileInputRef}
            className={styles.fileInput}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </section>
        <BottomButton title="생성" onClick={handleSaveBtn}></BottomButton>
      </form>
    </>
  );
}
