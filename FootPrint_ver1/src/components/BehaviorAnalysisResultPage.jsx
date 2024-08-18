import React from 'react';
import './BehaviorAnalysisResultPage.css';

function BehaviorAnalysisResultPage() {
  return (
    <div className="behavior-analysis-result-page">
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
        <div className="video-placeholder">영상</div>
        <h2>찡찡이님의 행동 분석 결과</h2>
        <div className="behavior-info">
          <p>감정: 매우 신남</p>
          <p>행동: 이동 및 점프</p>npm
          <p>솔루션: 해당 행동은 이상행동이 아니며, 집 안에서 사고칠 위험이 있기 때문에 1일 2회 이상의 산책을 추천드립니다.</p>
        </div>
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

export default BehaviorAnalysisResultPage;
