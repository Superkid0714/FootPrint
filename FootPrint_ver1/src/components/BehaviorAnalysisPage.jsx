import React from 'react';
import './BehaviorAnalysisPage.css';

function BehaviorAnalysisPage() {
  return (
    <div className="behavior-analysis-page">
      <header>
        <div className="logo-placeholder">로고</div>
        <nav className="nav-menu">
          <ul>
            <li><a href="/">견종분석</a></li>
            <li><a href="/behavior-analysis">행동분석</a></li>
            <li><a href="/diary">다이어리</a></li>
            <li><a href="/login">로그인</a></li>
            <li><a href="/signup">회원가입</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="video-placeholder">영상 업로드</div>
        <h2>우리 찡찡이님의 영상을 넣어주세요 (10초 ~ 1분이만)</h2>
        <a href="/behavior-result">
          <button className="action-button">행동 분석하기!</button>
        </a>
      </main>

      <footer>
        <div className="icon-placeholder">아이콘 1</div>
        <div className="icon-placeholder">아이콘 2</div>
        <div className="icon-placeholder">아이콘 3</div>
        <div className="icon-placeholder">아이콘 4</div>
        <div className="icon-placeholder">아이콘 5</div>
      </footer>
    </div>
  );
}

export default BehaviorAnalysisPage;
