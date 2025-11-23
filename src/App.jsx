// App.jsx - Main application component
import { useState } from 'react';
import UploadScreen from './components/UploadScreen';
import VideoPlayer from './components/VideoPlayer';

function App() {
  // State to store the selected video file
  const [videoFile, setVideoFile] = useState(null);

  // Function to handle when user selects a video
  const handleVideoSelect = (file) => {
    setVideoFile(file);
    console.log('Video selected:', file.name);
  };

  // Function to reset and go back to upload screen
  const handleReset = () => {
    setVideoFile(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* If no video is selected, show the Upload Screen */}
      {!videoFile && <UploadScreen onVideoSelect={handleVideoSelect} />}

      {/* If a video is selected, show the Video Player */}
      {videoFile && (
        <VideoPlayer
          videoFile={videoFile}
          onBack={handleReset}
        />
      )}
    </div>
  );
}

export default App;
