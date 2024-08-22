import React from "react";
import "./CSS/BreedCheckResultPage.css";
import Nav from "../components/Nav";

function BreedCheckResultPage() {
  return (
    <div className="breed-result-page">
      <Nav />

      <main>
        <div className="photo-placeholder">사진</div>
        <h2>우리 찡찡이님은 시바이누입니다.</h2>
        <div className="breed-info">
          <div>시바이누: 98.72%</div>
          <div>말티즈: 24.5%</div>
          <div>비글: 11.44%</div>
        </div>
        <p>시바이누는 외모와 달리 대담하고 볼 같은 성격의 소유견이에요...</p>
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

export default BreedCheckResultPage;
