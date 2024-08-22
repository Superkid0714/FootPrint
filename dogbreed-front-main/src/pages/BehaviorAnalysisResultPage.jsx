import React from "react";
import "./CSS/BehaviorAnalysisResultPage.css";
import Nav from "../components/Nav";

function BehaviorAnalysisResultPage() {
  return (
    <div className="behavior-analysis-result-page">
      <Nav />
      <main>
        <div className="video-placeholder">영상</div>
        <h2>찡찡이님의 행동 분석 결과</h2>
        <div className="behavior-info">
          <p>감정: 매우 신남</p>
          <p>행동: 이동 및 점프</p>npm
          <p>
            솔루션: 해당 행동은 이상행동이 아니며, 집 안에서 사고칠 위험이 있기
            때문에 1일 2회 이상의 산책을 추천드립니다.
          </p>
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
