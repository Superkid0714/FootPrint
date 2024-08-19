import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './PhotoUploadPage.css';

// 헤더 컴포넌트
function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="logo-placeholder">
          <a href="/"> 
            {/* 로고 이미지 추가 */}
          </a>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><NavLink to="/" activeClassName="active">견종분석</NavLink></li> 
            <li><NavLink to="/behavior-analysis" activeClassName="active">행동분석</NavLink></li> 
            <li><NavLink to="/diary" activeClassName="active">다이어리</NavLink></li> 
            <li><NavLink to="/login" activeClassName="active">로그인</NavLink></li> 
            <li><NavLink to="/signup" activeClassName="active">회원가입</NavLink></li> 
          </ul>
        </nav>
      </div>
    </header>
  );
}

// 이미지 업로드 컴포넌트
function ImageUpload({ onImageChange, previewUrl }) {
  return (
    <div className="photo-placeholder">
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        style={{ display: 'none' }}
        id="upload-photo"
        aria-label="이미지 업로드" 
      />
      <label htmlFor="upload-photo" className="upload-label">
        {previewUrl ? (
          <img src={previewUrl} alt="미리 보기" className="preview-image" /> 
        ) : (
          "사진 영역"
        )}
      </label>
    </div>
  );
}

// 설명 및 버튼 컴포넌트
function CallToAction({ selectedImage }) {
  return (
    <div className="text-area">
      <h2>우리 찡찡이님의 사진을 넣어주세요</h2>
      <Link to="/breed-result">
        <button className="action-button" disabled={!selectedImage}>
          견종 확인하기!
        </button>
      </Link>
    </div>
  );
}

function PhotoUploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="container">
      <Header />
      <div className="separator"></div>
      <main className="main-content">
        <ImageUpload onImageChange={handleImageChange} previewUrl={previewUrl} />
        <CallToAction selectedImage={selectedImage} />
      </main>
    </div>
  );
}

export default PhotoUploadPage;