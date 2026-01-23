// useFpsDetection.js - Custom hook for detecting video frame rate
import { useState, useCallback, useRef } from 'react';

// Standard frame rates to snap to (helps with floating-point imprecision)
const STANDARD_FPS = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60];

// Default FPS if detection fails
const DEFAULT_FPS = 30;

// Number of frames to sample for detection
const SAMPLE_FRAMES = 10;

/**
 * Snaps a detected FPS to the nearest standard frame rate
 * @param {number} detectedFps - Raw detected FPS value
 * @returns {number} - Nearest standard FPS (or original if not close to any standard)
 */
function snapToStandardFps(detectedFps) {
  let closest = STANDARD_FPS[0];
  let minDiff = Math.abs(detectedFps - closest);

  for (const standardFps of STANDARD_FPS) {
    const diff = Math.abs(detectedFps - standardFps);
    if (diff < minDiff) {
      minDiff = diff;
      closest = standardFps;
    }
  }

  // Only snap if within 5% tolerance
  const tolerance = closest * 0.05;
  return minDiff <= tolerance ? closest : Math.round(detectedFps * 100) / 100;
}

/**
 * Custom hook for detecting video FPS using requestVideoFrameCallback
 * @returns {Object} - { fps, isDetecting, detectFps, isSupported }
 */
export function useFpsDetection() {
  const [fps, setFps] = useState(DEFAULT_FPS);
  const [isDetecting, setIsDetecting] = useState(false);
  const frameTimestampsRef = useRef([]);
  const callbackIdRef = useRef(null);

  // Check if requestVideoFrameCallback is supported
  const isSupported = typeof HTMLVideoElement !== 'undefined' &&
    'requestVideoFrameCallback' in HTMLVideoElement.prototype;

  /**
   * Detects FPS by sampling frames during brief playback
   * @param {HTMLVideoElement} videoElement - The video element to analyze
   * @returns {Promise<number>} - Detected FPS value
   */
  const detectFps = useCallback(async (videoElement) => {
    if (!videoElement) {
      console.warn('No video element provided for FPS detection');
      return DEFAULT_FPS;
    }

    // If API not supported, return default
    if (!isSupported) {
      console.log('requestVideoFrameCallback not supported, using default FPS');
      return DEFAULT_FPS;
    }

    setIsDetecting(true);
    frameTimestampsRef.current = [];

    return new Promise((resolve) => {
      let frameCount = 0;

      const frameCallback = (now, metadata) => {
        // Store frame timing data
        frameTimestampsRef.current.push({
          now,
          mediaTime: metadata.mediaTime,
          presentedFrames: metadata.presentedFrames
        });

        frameCount++;

        // Collect enough frames to calculate FPS accurately
        if (frameCount < SAMPLE_FRAMES) {
          callbackIdRef.current = videoElement.requestVideoFrameCallback(frameCallback);
        } else {
          // Calculate FPS from collected data
          const timestamps = frameTimestampsRef.current;

          if (timestamps.length >= 2) {
            // Use mediaTime delta to calculate FPS
            const firstFrame = timestamps[0];
            const lastFrame = timestamps[timestamps.length - 1];
            const timeDelta = lastFrame.mediaTime - firstFrame.mediaTime;
            const frameDelta = timestamps.length - 1;

            if (timeDelta > 0) {
              const rawFps = frameDelta / timeDelta;
              const detectedFps = snapToStandardFps(rawFps);

              console.log(`FPS Detection: raw=${rawFps.toFixed(3)}, snapped=${detectedFps}`);
              setFps(detectedFps);
              setIsDetecting(false);
              resolve(detectedFps);
              return;
            }
          }

          // Fallback if calculation fails
          console.log('FPS detection inconclusive, using default');
          setFps(DEFAULT_FPS);
          setIsDetecting(false);
          resolve(DEFAULT_FPS);
        }
      };

      // Start frame collection
      callbackIdRef.current = videoElement.requestVideoFrameCallback(frameCallback);

      // Timeout safety: resolve with default if detection takes too long
      setTimeout(() => {
        if (callbackIdRef.current && videoElement.cancelVideoFrameCallback) {
          videoElement.cancelVideoFrameCallback(callbackIdRef.current);
        }
        if (isDetecting) {
          setIsDetecting(false);
          resolve(fps || DEFAULT_FPS);
        }
      }, 2000); // 2 second timeout
    });
  }, [isSupported, fps]);

  return {
    fps,
    setFps, // Allow manual override if needed
    isDetecting,
    detectFps,
    isSupported,
    DEFAULT_FPS
  };
}

export default useFpsDetection;
