// UploadScreen.jsx - Marline Design System Implementation

function UploadScreen({ onVideoSelect }) {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 animate-fadeIn">
      {/* Generous top spacing - breathing room */}
      <div className="flex-1"></div>

      {/* Central Content - Vertically Aligned */}
      <div className="text-center">
        {/* App Title - Marline Label Style */}
        <h1 className="marline-label text-sm mb-16 opacity-70">
          FRAME EXTRACTOR
        </h1>

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
            className="
              celestial-orb
              w-40 h-40 mx-auto
              flex items-center justify-center
              cursor-pointer
              transition-all duration-500 ease-out
              hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
              hover:scale-105
              active:scale-95
              block
            "
          >
            <span className="marline-label text-xs opacity-90">
              CHOOSE<br/>VIDEO
            </span>
          </label>

          {/* Instruction Text - Minimal */}
          <p className="marline-label text-[10px] mt-12 opacity-40">
            MP4, MOV, OR ANY FORMAT
          </p>
        </div>
      </div>

      {/* Bottom spacing - breathing room */}
      <div className="flex-1"></div>
    </div>
  );
}

export default UploadScreen;
