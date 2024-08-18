import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoUploadPage from './components/PhotoUploadPage';
import BreedCheckResultPage from './components/BreedCheckResultPage';
import BehaviorAnalysisPage from './components/BehaviorAnalysisPage';
import BehaviorAnalysisResultPage from './components/BehaviorAnalysisResultPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PhotoUploadPage />} />
          <Route path="/breed-result" element={<BreedCheckResultPage />} />
          <Route path="/behavior-analysis" element={<BehaviorAnalysisPage />} />
          <Route path="/behavior-result" element={<BehaviorAnalysisResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
