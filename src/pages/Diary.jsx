import React from "react";
import Nav from "../components/Nav";
import "./CSS/Diary.css";

const Diary = () => {
  const images = [
    "/gold/1.png",
    "/gold/2.png",
    "/gold/3.png",
    "/gold/4.png",
    "/gold/5.png",
    "/gold/6.png",
    "/gold/7.png",
    "/gold/8.png",
    "/gold/9.png",
  ];

  return (
    <div className="container">
      <Nav />
      <div className="intro">
        <img src="/gold/1.png" alt="gold" />
        <p>인절미</p>
      </div>
      <div className="diary-grid">
        {images.map((src, index) => (
          <div key={index} className="diary-item">
            <img src={src} alt={`diary-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;
