import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import Nav from "../components/Nav";
import "./CSS/PhotoUploadPage.css";

const PhotoUploadPage = () => {
  const [predictions, setPredictions] = useState([]);
  const imgRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadModelAndClassify = async (imgElement) => {
      const model = await mobilenet.load();

      const predictions = await model.classify(imgElement);
      setPredictions(predictions);
    };

    const imgElement = imgRef.current;
    if (imgElement) {
      imgElement.onload = () => loadModelAndClassify(imgElement);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h2>사진을 업로드 해주세요</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={inputRef}
        />
        <div className="image-des-box">
          <div className="image-preview">
            <img
              id="img"
              src="/por.jpg"
              alt="image to classify"
              ref={imgRef}
              width={380}
              height={380}
            />
          </div>
          <div className="predictions">
            <h3>분류 결과:</h3>
            {predictions.length > 0 ? (
              predictions.map((prediction, index) => (
                <div key={index} className="prediction-bar">
                  <p>{prediction.className}</p>
                  <div className="bar">
                    <div
                      className="bar-inner"
                      style={{ width: `${prediction.probability * 100}%` }}
                    ></div>
                  </div>
                  <p>{(prediction.probability * 100).toFixed(2)}%</p>
                </div>
              ))
            ) : (
              <p>예시입니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadPage;
