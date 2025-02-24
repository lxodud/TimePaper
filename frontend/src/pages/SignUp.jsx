import React, { useState } from 'react';
import "../css/SignUp.css"

export default function SignUp() {
  const [isPwVisible, setIsPwVisible] = useState(false); // 비밀번호 조건 메시지의 가시성 상태
  const [isPwCheckVisible, setisPwCheckVisible] = useState(false); // 비밀번호 조건 메시지의 가시성 상태
  const [placeholdersVisible, setPlaceholdersVisible] = useState([true, true, true]); // 각 input의 placeholder 가시성 상태

  const handleFocus = (index) => {
    const newPlaceholdersVisible = [...placeholdersVisible];
    newPlaceholdersVisible[index] = false; // 해당 input의 placeholder 숨기기
    setPlaceholdersVisible(newPlaceholdersVisible);
  };

  const handleBlur = (index, value) => {
    const newPlaceholdersVisible = [...placeholdersVisible];
    if (value === '') {
      newPlaceholdersVisible[index] = true; // 내용이 없으면 해당 input의 placeholder 보이기
    }
    setPlaceholdersVisible(newPlaceholdersVisible);
  };
  
  return (
    <>
    <div className='signMainBox'>
    <div className='fieldsBox bigbox'>
      <div className='contentBox'>
        <div className='fields'>이메일*</div>
        <div className='emailCheckBox'>
          <input 
            className='fieldsInput border-radius' 
            type="text" 
            placeholder={placeholdersVisible[0] ? '이메일 작성' : ''} 
            onFocus={() => handleFocus(0)} 
            onBlur={(e) => handleBlur(0, e.target.value)} 
            style={{ textAlign: placeholdersVisible[0] ? 'center' : 'left' }} // placeholder가 보일 때 가운데 정렬
          />
          <button className='emailCheckBut border-radius'>인증</button>
        </div>

        <div className='fields'>비밀번호*</div>
        <input 
          className='fieldsInput border-radius' 
          type="text" 
          placeholder={placeholdersVisible[1] ? '비밀번호 작성' : ''} 
          onFocus={() => handleFocus(1)} 
          onBlur={(e) => handleBlur(1, e.target.value)} 
          style={{ textAlign: placeholdersVisible[1] ? 'center' : 'left' }} // placeholder가 보일 때 가운데 정렬
        />
         {isPwVisible && (
            <div className='pwfont pw'>비밀번호는 특수부호를 포함 8자이상 작성해주세요</div>
          )}

        <div className='fields'>비밀번호 확인*</div>
        <input 
          className='fieldsInput border-radius' 
          type="text" 
          placeholder={placeholdersVisible[2] ? '비밀번호 확인' : ''} 
          onFocus={() => handleFocus(2)} 
          onBlur={(e) => handleBlur(2, e.target.value)} 
          style={{ textAlign: placeholdersVisible[2] ? 'center' : 'left' }} // placeholder가 보일 때 가운데 정렬
          />
        {isPwCheckVisible && (
          <div className='pwfont pwcheck'>비밀번호가 일치하지 않습니다.</div>
        )}
      </div>
      </div>
      <div className='checkBoxDiv bigbox'>
      <div className='isPrivacyPolicyAccepted'>
          <div>개인 정보 활용에 대해 동의하시겠습니까?</div>
          <div className='checkboxText'><input type="checkbox" /> <label>자세히보기</label></div>
      </div>

      <div className='isTermsAccepted'>
        <div>이용 약관에 동의 하시겠습니까?</div>
          <div className='checkboxText'><input type="checkbox" /> <label>자세히보기</label></div>
      </div>
      </div>
        <button className='signUpBut bigbox'>가입하기</button>
      </div>
    </>
  )
}
