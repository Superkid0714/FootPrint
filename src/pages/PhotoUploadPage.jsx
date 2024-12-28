import React, { useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import "./CSS/PhotoUploadPage.css";

const PhotoUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://34.121.234.235:5000/api/photo-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("File uploaded successfully");
      } else {
        setUploadStatus("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file");
    }
  };

  return (
    <div className="container">
      <Nav />
      <h1>Photo Upload Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" width="200" />}
        <button type="submit">Upload Photo</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default PhotoUploadPage;
