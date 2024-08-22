import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoUploadPage from "./pages/PhotoUploadPage";
import BreedCheckResultPage from "./pages/BreedCheckResultPage";
import BehaviorAnalysisPage from "./pages/BehaviorAnalysisPage";
import BehaviorAnalysisResultPage from "./pages/BehaviorAnalysisResultPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Diary from "./pages/Diary";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo-upload" element={<PhotoUploadPage />} />
          <Route path="/breed-result" element={<BreedCheckResultPage />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/behavior-analysis" element={<BehaviorAnalysisPage />} />
          <Route
            path="/behavior-result"
            element={<BehaviorAnalysisResultPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
