import React from 'react';
import { Link } from 'react-router-dom';
import './PhotoUploadPage.css';

function PhotoUploadPage() {
  return (
    <div className="container">
      <header>
        <div className="logo-placeholder">로고</div>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">견종분석</Link></li>
            <li><Link to="/behavior-analysis">행동분석</Link></li>
            <li><Link to="/diary">다이어리</Link></li>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="photo-placeholder">사진 영역</div>
        <h2>우리 찡찡이님의 사진을 넣어주세요</h2>
        <Link to="/breed-result">
          <button className="action-button">견종 확인하기!</button>
        </Link>
      </main>
    </div>
  );
}

export default PhotoUploadPage;
