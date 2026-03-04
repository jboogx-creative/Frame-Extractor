// UploadScreen.jsx - Marline Design System Implementation

import { useState, useRef } from 'react';

function UploadScreen({ onVideoSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  // Counter tracks nested dragenter/dragleave from child elements
  const dragCounter = useRef(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type.startsWith('video/')) {
        onVideoSelect(file);
      } else {
        alert('Please select a video file');
      }
    }
  };

  // Drag-and-drop handlers for desktop convenience
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        onVideoSelect(file);
      } else {
        alert('Please select a video file');
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-8 animate-fadeIn transition-all duration-500 ease-out ${
        isDragging ? 'border-2 border-dashed border-white/30' : ''
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Generous top spacing - breathing room */}
      <div className="flex-1"></div>

      {/* Central Content - Vertically Aligned */}
      <div className="text-center">
        {/* App Title - Marline Label Style */}
        <h1 className="marline-label text-sm mb-3 opacity-70">
          FRAME EXTRACTOR
        </h1>

        {/* Credit Line */}
        <p className="marline-label text-[10px] mb-12 opacity-30">
          BY JBOOGXCREATIVE, FOR THE COMMUNITY
        </p>

        {/* Upload Area */}
        <div className="w-full max-w-xs">
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Celestial Orb Button */}
          <label
            htmlFor="video-upload"
            className={`
              celestial-orb
              w-40 h-40 mx-auto
              flex items-center justify-center
              cursor-pointer
              transition-all duration-500 ease-out
              hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
              hover:scale-105
              active:scale-95
              block
              ${isDragging ? 'shadow-[0_0_60px_rgba(255,255,255,0.25)] scale-105' : ''}
            `}
          >
            <span className="marline-label text-xs opacity-90">
              {isDragging ? <>DROP<br/>VIDEO</> : <>CHOOSE<br/>VIDEO</>}
            </span>
          </label>

          {/* Instruction Text - Minimal */}
          <p className="marline-label text-[10px] mt-12 opacity-40">
            {isDragging ? 'RELEASE TO LOAD' : 'MP4, MOV, OR ANY FORMAT'}
          </p>
        </div>
      </div>

      {/* Bottom spacing - breathing room */}
      <div className="flex-1"></div>
    </div>
  );
}

export default UploadScreen;
