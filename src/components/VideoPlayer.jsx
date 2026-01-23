// VideoPlayer.jsx - Marline Design System Implementation
import { useState, useRef, useEffect } from 'react';
import { extractFrame, generateFrameName } from '../utils/frameExtractor';
import { useFpsDetection } from '../hooks/useFpsDetection';
import { formatTimecode, getFrameNumber, getScrubberStep, formatFpsDisplay } from '../utils/timecode';

function VideoPlayer({ videoFile, onBack }) {
  // --- STATE MANAGEMENT ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [frameCounter, setFrameCounter] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // --- FPS DETECTION ---
  const { fps, detectFps, isDetecting } = useFpsDetection();

  // --- REFS ---
  const videoRef = useRef(null);

  // --- VIDEO URL SETUP ---
  useEffect(() => {
    const url = URL.createObjectURL(videoFile);
    setVideoUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [videoFile]);

  // --- EVENT HANDLERS ---

  const handleLoadedMetadata = async () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);

      // Detect FPS by briefly playing the video (muted)
      const wasMuted = videoRef.current.muted;
      videoRef.current.muted = true;

      try {
        // Play briefly to get frame callbacks for FPS detection
        await videoRef.current.play();
        await detectFps(videoRef.current);
      } catch (error) {
        console.log('FPS detection skipped:', error.message);
      } finally {
        // Restore state
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.muted = wasMuted;
      }
    }
  };

  const handleInitialPlay = () => {
    // Hide overlay immediately
    setIsInitialized(true);

    // Then seek to first frame after a brief delay
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0.001;
        }
      }, 50);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      // If not initialized yet, initialize first
      if (!isInitialized) {
        setIsInitialized(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0.001;
            videoRef.current.play();
            setIsPlaying(true);
          }
        }, 50);
      } else {
        // Normal play/pause behavior
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleScrub = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleScrubStart = () => {
    setIsScrubbing(true);
  };

  const handleScrubEnd = () => {
    setIsScrubbing(false);
  };

  // Calculate current frame number using detected FPS
  const getCurrentFrame = () => {
    return getFrameNumber(currentTime, fps);
  };

  // Generate tick marks for timeline (every second = 30 frames)
  const generateTickMarks = () => {
    if (!duration) return [];
    const ticks = [];
    const tickInterval = 1; // One tick per second
    for (let i = 0; i <= duration; i += tickInterval) {
      const position = (i / duration) * 100;
      ticks.push({ time: i, position });
    }
    return ticks;
  };

  const handleExtractFrame = async () => {
    if (!videoRef.current) return;

    try {
      const fileName = generateFrameName(frameCounter);
      await extractFrame(videoRef.current, fileName);

      setFrameCounter(frameCounter + 1);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2500);

      console.log(`Frame extracted: ${fileName}`);
    } catch (error) {
      console.error('Error extracting frame:', error);
      alert('Failed to extract frame. Please try again.');
    }
  };

  const handleExtractFirstFrame = async () => {
    if (!videoRef.current) return;

    // Seek to first frame
    videoRef.current.currentTime = 0.001;
    setCurrentTime(0.001);

    // Small delay for seek to complete, then extract
    await new Promise(resolve => setTimeout(resolve, 100));
    handleExtractFrame();
  };

  const handleExtractLastFrame = async () => {
    if (!videoRef.current || !duration) return;

    // Seek to last frame (slightly before end to ensure we get the last frame)
    const lastFrameTime = duration - 0.001;
    videoRef.current.currentTime = lastFrameTime;
    setCurrentTime(lastFrameTime);

    // Small delay for seek to complete, then extract
    await new Promise(resolve => setTimeout(resolve, 100));
    handleExtractFrame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-2 md:py-12 animate-fadeIn overflow-hidden">
      {/* Video Display Area - Responsive and Constrained */}
      <div className="w-full max-w-2xl mb-2 md:mb-8 h-[55vh] md:h-[50vh] flex items-center justify-center relative">
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/60 ${!isInitialized ? 'pointer-events-none' : ''}`}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          />
        )}

        {/* Initial Play Overlay */}
        {!isInitialized && (
          <button
            onClick={handleInitialPlay}
            className="
              absolute inset-0 z-50
              flex items-center justify-center
              rounded-lg
              bg-white/[0.08]
              border border-white/20
              shadow-[0_0_40px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(255,255,255,0.05)]
              backdrop-blur-sm
              hover:bg-white/[0.12]
              hover:shadow-[0_0_50px_rgba(255,255,255,0.25),inset_0_0_20px_rgba(255,255,255,0.05)]
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all duration-500 ease-out
              animate-fadeIn
              cursor-pointer
            "
          >
            <span className="marline-label text-xs opacity-90">
              TAP PLAY TO BEGIN
            </span>
          </button>
        )}
      </div>

      {/* Horizon Line Separator */}
      <div className="horizon-line max-w-2xl w-full my-2 md:my-8"></div>

      {/* Controls Section - Marline Style */}
      <div className="w-full max-w-2xl space-y-3 md:space-y-10">
        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-3 md:gap-8">
          {/* Celestial Orb Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="
              celestial-orb
              w-12 h-12 md:w-16 md:h-16
              flex items-center justify-center
              transition-all duration-500 ease-out
              hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]
              hover:scale-105
              active:scale-95
            "
          >
            {isPlaying ? (
              // Pause Icon - Two vertical bars
              <svg className="w-3 h-4 md:w-4 md:h-5" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="5" height="20" fill="white" opacity="0.9"/>
                <rect x="11" y="0" width="5" height="20" fill="white" opacity="0.9"/>
              </svg>
            ) : (
              // Play Icon - Triangle pointing right
              <svg className="w-3 h-4 md:w-4 md:h-5" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L18 10L0 20V0Z" fill="white" opacity="0.9"/>
              </svg>
            )}
          </button>

          {/* Timeline with Marline Typography */}
          <div className="flex-1 space-y-1 md:space-y-2">
            {/* Marline Label - Time & Frame with FPS */}
            <div className="flex justify-between items-center">
              <span className="marline-label text-[10px] opacity-50">
                {isScrubbing ? `FRAME ${getCurrentFrame()}` : `${formatFpsDisplay(fps)} FPS`}
              </span>
              <span className="marline-data text-sm font-mono">
                {formatTimecode(currentTime, fps)} / {formatTimecode(duration, fps)}
              </span>
            </div>

            {/* Timeline Container with Tick Marks */}
            <div className="relative w-full">
              {/* Tick Marks */}
              <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                {generateTickMarks().map((tick, index) => (
                  <div
                    key={index}
                    className="w-[1px] h-2 bg-white/30"
                    style={{
                      position: 'absolute',
                      left: `${tick.position}%`,
                      transform: 'translateX(-50%)'
                    }}
                  />
                ))}
              </div>

              {/* Scrubber - Horizon Line Style */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleScrub}
                onMouseDown={handleScrubStart}
                onMouseUp={handleScrubEnd}
                onTouchStart={handleScrubStart}
                onTouchEnd={handleScrubEnd}
                step={getScrubberStep(fps)}
                className="
                  relative z-10
                  w-full h-[1px] bg-white/20
                  appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:scale-125
                "
              />
            </div>
          </div>
        </div>

        {/* Horizon Line Separator */}
        <div className="horizon-line"></div>

        {/* Success Message - Marline Style */}
        {showSuccess && (
          <div className="text-center animate-fadeIn">
            <p className="marline-label text-[10px] opacity-70 mb-2">FRAME SAVED</p>
            <p className="marline-data text-sm opacity-90">{generateFrameName(frameCounter - 1)}</p>
          </div>
        )}

        {/* Extract Frame Label & Action - Three Buttons */}
        <div className="text-center space-y-1.5 md:space-y-4">
          <p className="marline-label text-[10px] opacity-50">EXTRACT</p>
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {/* First Frame Button */}
            <button
              onClick={handleExtractFirstFrame}
              className="
                celestial-orb
                w-14 h-14 md:w-24 md:h-24
                flex items-center justify-center
                transition-all duration-500 ease-out
                hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]
                hover:scale-105
                active:scale-95
              "
            >
              <span className="marline-label text-[9px] md:text-xs opacity-90">
                FIRST
              </span>
            </button>

            {/* Current Frame Button */}
            <button
              onClick={handleExtractFrame}
              className="
                celestial-orb
                w-14 h-14 md:w-24 md:h-24
                flex items-center justify-center
                transition-all duration-500 ease-out
                hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]
                hover:scale-105
                active:scale-95
              "
            >
              <span className="marline-label text-[9px] md:text-xs opacity-90">
                FRAME
              </span>
            </button>

            {/* Last Frame Button */}
            <button
              onClick={handleExtractLastFrame}
              className="
                celestial-orb
                w-14 h-14 md:w-24 md:h-24
                flex items-center justify-center
                transition-all duration-500 ease-out
                hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]
                hover:scale-105
                active:scale-95
              "
            >
              <span className="marline-label text-[9px] md:text-xs opacity-90">
                LAST
              </span>
            </button>
          </div>
        </div>

        {/* Horizon Line Separator */}
        <div className="horizon-line"></div>

        {/* New Video Button - Celestial Style */}
        <button
          onClick={onBack}
          className="
            w-full py-3
            rounded-full
            bg-white/[0.08]
            border border-white/20
            shadow-[0_0_40px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(255,255,255,0.05)]
            marline-label text-[10px] opacity-70
            hover:opacity-90
            hover:shadow-[0_0_50px_rgba(255,255,255,0.25),inset_0_0_20px_rgba(255,255,255,0.05)]
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-500 ease-out
          "
        >
          ← NEW VIDEO
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
