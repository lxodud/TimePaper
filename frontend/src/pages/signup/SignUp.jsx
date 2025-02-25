import React, { useState } from 'react';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isPwCheckVisible, setisPwCheckVisible] = useState(false);
  const [placeholdersVisible, setPlaceholdersVisible] = useState([true, true, true]);

  const handleFocus = (index) => {
    const newPlaceholdersVisible = [...placeholdersVisible];
    newPlaceholdersVisible[index] = false;
    setPlaceholdersVisible(newPlaceholdersVisible);
  };

  const handleBlur = (index, value) => {
    const newPlaceholdersVisible = [...placeholdersVisible];
    if (value === '') {
      newPlaceholdersVisible[index] = true;
    }
    setPlaceholdersVisible(newPlaceholdersVisible);
  };

  return (
    <>
      <div className={styles.signMainBox}>
        <div className={`${styles.fieldsBox} ${styles.bigbox}`}>
          <div className={styles.contentBox}>
            <div className={styles.fields}>이메일*</div>
            <div className={styles.emailCheckBox}>
              <input
                className={`${styles.fieldsInput} ${styles.borderRadius}`}
                type="text"
                placeholder={placeholdersVisible[0] ? '이메일 작성' : ''}
                onFocus={() => handleFocus(0)}
                onBlur={(e) => handleBlur(0, e.target.value)}
                style={{ textAlign: placeholdersVisible[0] ? 'center' : 'left' }}
              />
              <button className={`${styles.emailCheckBut} ${styles.borderRadius}`}>인증</button>
            </div>
            <div className={styles.fields}>비밀번호*</div>
            <input
              className={`${styles.fieldsInput} ${styles.borderRadius}`}
              type="text"
              placeholder={placeholdersVisible[1] ? '비밀번호 작성' : ''}
              onFocus={() => handleFocus(1)}
              onBlur={(e) => handleBlur(1, e.target.value)}
              style={{ textAlign: placeholdersVisible[1] ? 'center' : 'left' }}
            />
            {isPwVisible && (
              <div className={`${styles.pwfont} ${styles.pw}`}>
                비밀번호는 특수부호를 포함 8자이상 작성해주세요
              </div>
            )}

            <div className={styles.fields}>비밀번호 확인*</div>
            <input
              className={`${styles.fieldsInput} ${styles.borderRadius}`}
              type="text"
              placeholder={placeholdersVisible[2] ? '비밀번호 확인' : ''}
              onFocus={() => handleFocus(2)}
              onBlur={(e) => handleBlur(2, e.target.value)}
              style={{ textAlign: placeholdersVisible[2] ? 'center' : 'left' }}
            />
            {isPwCheckVisible && (
              <div className={`${styles.pwfont} ${styles.pwcheck}`}>
                비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.checkBoxDiv} ${styles.bigbox}`}>
          <div className={styles.isPrivacyPolicyAccepted}>
            <div className={styles.isPrivacyPolicyAcceptedText}>
              개인 정보 활용에 대해 동의하시겠습니까?
            </div>
            <div className={styles.checkboxText}>
              <input type="checkbox" />
              <label className={styles.checkboxlabel}>자세히보기</label>
            </div>
          </div>

          <div className={styles.isTermsAccepted}>
            <div className={styles.isTermsAccepted}>이용 약관에 동의 하시겠습니까?</div>
            <div className={styles.checkboxText}>
              <input type="checkbox" />
              <label className={styles.checkboxlabel}>자세히보기</label>
            </div>
          </div>
        </div>
        <button className={`${styles.signUpBut} ${styles.bigbox}`}>가입하기</button>
      </div>
    </>
  );
}
