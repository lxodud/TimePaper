import React from 'react';
import images from '../constant/staticImagePath';
import { Link } from 'react-router-dom';
import '../css/index.css';

export default function NotFound() {
  return (
    <>
      <div className="image-container">
        <img src={images.notFound} alt="404 이미지" />
      </div>
      <div className="home-link">
        <Link to="/">홈으로 이동</Link>
      </div>
    </>
  );
}
