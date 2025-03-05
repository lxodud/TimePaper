import React, { useEffect, useState, useRef, useMemo } from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './PostItCreate.module.css';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';
import BottomButton from '../../components/BottomButton/BottomButton';
import { api } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ssrModuleExportsKey } from 'vite/module-runner';

export default function PostItCreate() {
  const { timepaperId } = useParams();
  const fileInputRef = useRef(null);
  const [isSubmitable, setIsSubmitable] = useState(false);
  const templates = [staticImagePath.postitAfternoon, staticImagePath.postitNight];
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({ content: false, authorName: false });
  const navigate = useNavigate();

  const INITIAL_FORM_DATA = {
    authorName: '',
    content: '',
    imageUrl: staticImagePath.postitAfternoon,
  };

  const [inputData, setInputData] = useState(INITIAL_FORM_DATA);

  const IMAGE_TYPES = {
    STATIC: 'static',
    UPLOAD: 'upload',
  };

  const INITIAL_IMAGE_STATE = {
    imageType: IMAGE_TYPES.STATIC,
    preview: staticImagePath.postitAfternoon,
    imageData: staticImagePath.postitAfternoon,
  };

  const [imageState, setImageState] = useState(INITIAL_IMAGE_STATE);

  useEffect(() => {
    setInputData((prev) => ({
      ...prev,
      imageUrl: imageState.imageType === IMAGE_TYPES.STATIC ? imageState.imageData : null,
    }));
  }, [imageState.imageType, imageState.imageData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrors(validateInput(inputData));
  }, [inputData]);

  const handleStaticImage = (src) => () => {
    setImageState((prev) => ({
      ...prev,
      imageType: IMAGE_TYPES.STATIC,
      preview: src,
      imageData: src,
    }));
  };

  const handleOnClick = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({ ...prev, [name]: true }));
    const a = validateInput(inputData);
    setErrors(a);
  };

  const handleUploadImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageState((prev) => ({
        ...prev,
        imageType: IMAGE_TYPES.UPLOAD,
        preview: event.target.result,
        imageData: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateInput = (data) => {
    const errors = {};
    let isValid = true;

    if (!data.content.trim()) {
      errors.content = '포스트잇 내용을 입력해주세요.';
      isValid = false;
    } else if (data.content.length > 155) {
      errors.content = '최대 155자까지 입력할 수 있습니다.';
      isValid = false;
    }

    if (!data.authorName.trim()) {
      errors.authorName = '작성자 이름을 입력해주세요.';
      isValid = false;
    } else if (data.authorName.length > 20) {
      errors.authorName = '최대 20자까지 입력할 수 있습니다.';
      isValid = false;
    }

    if (imageState.imageType === IMAGE_TYPES.UPLOAD && !imageState.imageData) {
      errors.image = '이미지를 업로드해주세요.';
      isValid = false;
    }

    setIsSubmitable(isValid);

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedInputData = {
      ...inputData,
      imageUrl: imageState.imageType === IMAGE_TYPES.STATIC ? imageState.imageData : null,
    };

    const validationErros = validateInput(updatedInputData);

    if (Object.keys(validationErros).length > 0) {
      setErrors(validationErros);

      Object.values(validationErros).forEach((errorMessage) => {
        alert(errorMessage);
      });

      return;
    }

    const formData = new FormData();

    formData.append(
      'data',
      new Blob([JSON.stringify(updatedInputData)], { type: 'application/json' }),
    );

    if (imageState.imageType === IMAGE_TYPES.UPLOAD && imageState.imageData) {
      formData.append('image', imageState.imageData);
    }

    setIsSubmitable(false);
    (async () => {
      try {
        const response = await api.createPostit(timepaperId, formData);
        if (response.status === 201) {
          navigate(`/timepaper/${timepaperId}`, { replace: true });
        }
      } catch (error) {
        alert('등록에 실패했습니다.');
        setIsSubmitable(true);
      }
    })();
  };

  return (
    <>
      <form action="" className={styles.container}>
        <div className={styles.underBarInput}>
          <UnderBarInput
            onChange={handleOnChange}
            name="authorName"
            placeholder="작성자 입력"
            onClick={handleOnClick}
          ></UnderBarInput>
          {isTouched.authorName && errors.authorName && (
            <p className={styles.error}>{errors.authorName}</p>
          )}
        </div>
        <div className={styles.selectedImage}>
          <img src={imageState.preview} className="logo-image" alt="선택된 포스트잇 이미지" />
          <div className={styles.textareaContainer}>
            <textarea
              onChange={handleOnChange}
              name="content"
              className={styles.textarea}
              onClick={handleOnClick}
            ></textarea>
            {isTouched.content && errors.content && (
              <p className={styles.textareaError}>{errors.content}</p>
            )}
          </div>
        </div>
        <section className={styles.imageContainer}>
          {templates.map((src, index) => (
            <img
              key={index}
              src={src}
              className={styles.templateThumbnail}
              onClick={handleStaticImage(src)}
              alt={`테마 ${index + 1}`}
            />
          ))}
          <img
            src={staticImagePath.imageSelectIcon}
            className={styles.templateThumbnail}
            onClick={handleUploadImageClick}
            alt="사용자가 선택한 이미지"
          />
          <input
            type="file"
            name="file"
            id="file"
            ref={fileInputRef}
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImageFileUpload}
          />
        </section>
        <BottomButton title={'등록'} onClick={handleSubmit} isEnable={isSubmitable}></BottomButton>
      </form>
    </>
  );
}
