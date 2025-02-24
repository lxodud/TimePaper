import React from 'react';
import staticImagePath from '../../constant/staticImagePath';

export default function Login() {
  return (
    <>
      <div>
        <img src={staticImagePath.timepaperLogo} />
        <form action="">
          <input type="text" placeholder="아이디(이메일)" />
          <br />
          <input type="text" placeholder="비밀번호" />
          <br />
          <button>로그인</button>
          <br />
          <button>회원가입</button>
        </form>
      </div>
    </>
  );
}
