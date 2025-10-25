"use client";

import { useState, useRef, useEffect } from "react";

interface CameraComponentProps {
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

export default function CameraComponent({ onClose, onCapture }: CameraComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    
    // Cleanup on unmount
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    let timeoutId: NodeJS.Timeout | null = null;
    let isCancelled = false;
    
    try {
      setIsLoading(true);
      setError(null);

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Add timeout to prevent infinite loading
      timeoutId = setTimeout(() => {
        if (!isCancelled) {
          console.error('Camera loading timeout');
          setError('Camera is taking too long to load. Please try again.');
          setIsLoading(false);
        }
      }, 10000); // 10 second timeout

      // Request camera access - try user-facing first, fallback to any camera
      let stream: MediaStream | null = null;
      
      try {
        // Try to get user-facing camera first
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        console.log('Camera accessed successfully (user-facing)');
      } catch {
        console.log('Failed to get user-facing camera, trying any available camera...');
        // Fallback to any available camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        console.log('Camera accessed successfully (any camera)');
      }

      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Clear timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
          isCancelled = true;
        }
        
        // Force play immediately
        try {
          await videoRef.current.play();
          console.log('Video playing successfully');
          setIsLoading(false);
        } catch (playError) {
          console.error('Play error:', playError);
          // Wait for metadata and try again
          videoRef.current.onloadedmetadata = async () => {
            console.log('Video metadata loaded, attempting play...');
            try {
              if (videoRef.current) {
                await videoRef.current.play();
                console.log('Video playing successfully after metadata loaded');
                setIsLoading(false);
              }
            } catch (error) {
              console.error('Error playing video:', error);
              setIsLoading(false);
              setError('Camera loaded but failed to display. Please try again.');
            }
          };
        }
      } else {
        // No stream available
        if (timeoutId) clearTimeout(timeoutId);
        throw new Error('Failed to get camera stream');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      if (timeoutId) clearTimeout(timeoutId);
      isCancelled = true;
      setError('Unable to access camera. Please check permissions and ensure your device has a camera.');
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setCapturing(false);
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);

    // Convert to base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Call onCapture callback with image data
    onCapture(imageData);
    
    setCapturing(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-75">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 font-semibold"
        >
          ← Back
        </button>
        <h2 className="text-white font-semibold">Camera</h2>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Camera View */}
      <div className="flex-1 flex items-center justify-center bg-black">
        {isLoading && (
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading camera...</p>
          </div>
        )}

        {error && (
          <div className="text-white text-center p-6">
            <p className="mb-4">{error}</p>
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      {!isLoading && !error && (
        <div className="p-6 bg-black bg-opacity-75">
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={onClose}
              className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center text-white hover:bg-gray-700"
            >
              ✕
            </button>
            
            <button
              onClick={capturePhoto}
              disabled={capturing}
              className="w-20 h-20 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
            >
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-800"></div>
            </button>
            
            <button
              onClick={stopCamera}
              className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center text-white hover:bg-gray-700"
            >
              ⏹
            </button>
          </div>
          
          {capturing && (
            <p className="text-white text-center mt-4 animate-pulse">
              Capturing...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
