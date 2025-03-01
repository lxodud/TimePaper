import React, { useEffect, useRef, useState } from 'react';
import staticImagePath from '../../constant/staticImagePath';
import styles from './PostItCreate.module.css';
import UnderBarInput from '../../components/UnderBarInput/UnderBarInput';
import BottomButton from '../../components/BottomButton/BottomButton';
import { api } from '../../api/api';
import { useParams } from 'react-router-dom';

export default function PostItCreate() {
  const { timepaperId } = useParams();
  const fileInputRef = useRef(null); //파일 input 요소에 대한 참조
  const [isRegisterButtonEnable, setIsRegisterButtonEnable] = useState(true);
  const templates = [staticImagePath.postitAfternoon, staticImagePath.postitNight];

  const INITIAL_FORM_DATA = {
    timepaperId: timepaperId, //URL에서 가져온 값 저장
    authorName: '',
    content: '',
    imageUrl: staticImagePath.postitAfternoon, // static 경로만 보냄, upload라면 null
  };

  const [inputData, setInputData] = useState(INITIAL_FORM_DATA);

  const IMAGE_TYPES = {
    STATIC: 'static',
    UPLOAD: 'upload',
  };

  const INITIAL_IMAGE_STATE = {
    imageType: IMAGE_TYPES.STATIC,
    preview: staticImagePath.postitAfternoon, //미리보기URL (Base64)
    imageData: staticImagePath.postitAfternoon, // 이미지 경로 혹은 File객체
  };

  const [imageState, setImageState] = useState(INITIAL_IMAGE_STATE);

  //url에서 timepaperId가 변경될 때 inputData 업데이트
  useEffect(() => {
    setInputData((prev) => ({
      ...prev,
      timepaperId,
    }));
  }, [timepaperId]);

  //포스트잇 이미지를 템플릿으로 선택할 때 상태 관리 -> imageUrl에 경로 저장
  //정적이라면 -> imageUrl에 null 저장
  useEffect(() => {
    if (imageState.imageType === IMAGE_TYPES.STATIC) {
      setInputData((prev) => ({
        ...prev,
        imageUrl: imageState.imageData,
      }));
    } else {
      setInputData((prev) => ({
        ...prev,
        imageUrl: null,
      }));
    }
  }, [imageState.imageData]);

  //입력 필드 변경될 때 inputData 업데이트
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //파일 업로드 이벤트 처리
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0]; //선택된 첫 번째 파일 가져오기

    if (file) {
      //미리보기 업로드
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageState((prev) => ({
          ...prev,
          imageType: IMAGE_TYPES.UPLOAD,
          preview: event.target.result, //미리보기용URL
          imageData: file, //실제 파일 데이터
        }));
      };
      reader.readAsDataURL(file); //미리보기 출력
    }
  };

  //정적인 이미지를 선택하는 경우
  const handleStaticImage = (src) => () => {
    console.log(src);
    setImageState((prev) => ({
      ...prev,
      imageType: IMAGE_TYPES.STATIC,
      preview: src, //정적 이미지 경로
      imageData: null, //서버로 보낼 이미지 경로
    }));
  };

  const handleImageSelectClick = () => {
    fileInputRef.current.click();
  };

  //등록 (서버 호출)
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegisterButtonEnable(false); //중복 등록 방지

    const updatedInputData = {
      ...inputData,
      imageUrl: imageState.imageType === IMAGE_TYPES.STATIC ? imageState.imageData : null,
    };
    console.log(updatedInputData);

    const formData = new FormData(); //FormData 객체

    //json 데이터
    formData.append(
      'data',
      new Blob([JSON.stringify(updatedInputData)], { type: 'application/json' }),
    );
    console.log(updatedInputData);

    //사용자가 파일 업로드한 경우 추가
    console.log(imageState.imageType);
    console.log(imageState.imageData);
    if (imageState.imageType === IMAGE_TYPES.UPLOAD && imageState.imageData) {
      formData.append('image', imageState.imageData);
    }

    console.log('FormData 전송 데이터');

    (async () => {
      try {
        const response = await api.createPostit(timepaperId, formData);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsRegisterButtonEnable(true);
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
          ></UnderBarInput>
        </div>
        <div className={styles.selectedImage}>
          <img src={imageState.preview} className="logo-image" alt="선택된 포스트잇 이미지" />
          <textarea onChange={handleOnChange} name="content" className={styles.textarea}></textarea>
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
            onClick={handleImageSelectClick}
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
        <BottomButton
          title={'등록'}
          onClick={handleSubmit}
          isEnable={isRegisterButtonEnable}
        ></BottomButton>
      </form>
    </>
  );
}
