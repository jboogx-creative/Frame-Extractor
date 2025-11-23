// frameExtractor.js - Utility functions for extracting frames from video

/**
 * Extracts the current frame from a video element as a PNG image
 * Downloads the frame directly to the device
 * @param {HTMLVideoElement} videoElement - The video element to extract from
 * @param {string} fileName - The name for the downloaded file
 * @returns {Promise<void>}
 */
export async function extractFrame(videoElement, fileName) {
  // Create a canvas element (this is like a "screenshot surface")
  const canvas = document.createElement('canvas');

  // Set canvas size to match the video's natural dimensions
  // This ensures we get the full quality of the video
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  // Get the 2D drawing context (the "paintbrush" for the canvas)
  const ctx = canvas.getContext('2d');

  // Draw the current video frame onto the canvas
  // Think of this as taking a snapshot of the video at this exact moment
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Convert the canvas to a Blob (binary data) in PNG format
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        resolve();
      },
      'image/png',  // Output format
      1.0           // Quality (1.0 = maximum quality)
    );
  });
}

/**
 * Generates a sequential file name for frames
 * @param {number} frameNumber - The frame number (1, 2, 3, etc.)
 * @returns {string} - Formatted filename like "frame_001.png"
 */
export function generateFrameName(frameNumber) {
  // Pad the number with zeros (1 → "001", 42 → "042", 999 → "999")
  const paddedNumber = String(frameNumber).padStart(3, '0');
  return `frame_${paddedNumber}.png`;
}
