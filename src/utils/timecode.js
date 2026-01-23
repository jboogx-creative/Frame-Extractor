// timecode.js - Timecode calculation utilities for video frame display

/**
 * Formats time as MM:SS:FF (like Adobe Premiere)
 * @param {number} timeInSeconds - Current video time
 * @param {number} fps - Video frame rate
 * @returns {string} - Formatted timecode "MM:SS:FF"
 */
export function formatTimecode(timeInSeconds, fps) {
  if (!isFinite(timeInSeconds) || timeInSeconds < 0) {
    return '00:00:00';
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  // Frame number within the current second (0-indexed)
  // This is the key calculation: how many frames into this second are we?
  const framesIntoSecond = Math.floor((timeInSeconds % 1) * fps);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${framesIntoSecond.toString().padStart(2, '0')}`;
}

/**
 * Calculates the absolute frame number from time
 * @param {number} timeInSeconds - Current video time
 * @param {number} fps - Video frame rate
 * @returns {number} - Total frame number (1-indexed)
 */
export function getFrameNumber(timeInSeconds, fps) {
  return Math.floor(timeInSeconds * fps) + 1;
}

/**
 * Gets the scrubber step size for a given FPS
 * @param {number} fps - Video frame rate
 * @returns {number} - Step size in seconds
 */
export function getScrubberStep(fps) {
  return 1 / fps;
}

/**
 * Formats FPS for display (rounds nicely for common rates)
 * @param {number} fps - Frame rate
 * @returns {string} - Display-friendly FPS string
 */
export function formatFpsDisplay(fps) {
  // Handle common rates that display better as integers
  if (Math.abs(fps - 24) < 0.1) return '24';
  if (Math.abs(fps - 25) < 0.1) return '25';
  if (Math.abs(fps - 30) < 0.1) return '30';
  if (Math.abs(fps - 50) < 0.1) return '50';
  if (Math.abs(fps - 60) < 0.1) return '60';

  // For non-integer rates like 23.976, 29.97, 59.94
  if (Math.abs(fps - 23.976) < 0.01) return '23.98';
  if (Math.abs(fps - 29.97) < 0.01) return '29.97';
  if (Math.abs(fps - 59.94) < 0.01) return '59.94';

  return fps.toFixed(2);
}
