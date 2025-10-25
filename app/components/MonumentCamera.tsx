"use client";

import { useState, useRef } from "react";
import { Button, Card, Icon } from "./DemoComponents";
import { type Monument } from "../lib/types";

export function MonumentCamera() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [detectedMonument, setDetectedMonument] = useState<Monument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Send for recognition
      setIsProcessing(true);
      try {
        const response = await fetch('/api/recognize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData })
        });

        const data = await response.json();
        if (data.success && data.monument) {
          setDetectedMonument(data.monument);
          // Award points
          awardPoints(25);
        }
      } catch (error) {
        console.error("Recognition error:", error);
        alert("Failed to recognize monument. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const awardPoints = (points: number) => {
    const rewards = JSON.parse(localStorage.getItem('userRewards') || '{"totalPoints":0,"discoveries":0}');
    rewards.totalPoints += points;
    rewards.discoveries += 1;
    rewards.level = Math.floor(rewards.totalPoints / 100);
    rewards.lastUpdated = new Date().toISOString();
    localStorage.setItem('userRewards', JSON.stringify(rewards));
  };

  const resetDetection = () => {
    setDetectedMonument(null);
  };

  if (detectedMonument) {
    return (
      <Card title="Monument Discovered!" className="post-shadow-long">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="star" className="text-[var(--app-accent)]" size="lg" />
            <div>
              <h3 className="text-2xl font-bold text-[var(--app-foreground)]">
                {detectedMonument.name}
              </h3>
              <p className="text-[var(--app-foreground-muted)] text-sm">
                {detectedMonument.location} • {Math.abs(detectedMonument.year)} {detectedMonument.year > 0 ? 'AD' : 'BC'}
              </p>
            </div>
          </div>

          <p className="text-[var(--app-foreground-muted)] leading-relaxed">
            {detectedMonument.description}
          </p>

          <div className="pt-4 border-t border-[var(--app-card-border)]">
            <h4 className="font-semibold text-[var(--app-foreground)] mb-3">
              Fun Facts
            </h4>
            <ul className="space-y-2">
              {detectedMonument.funFacts.map((fact, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[var(--app-accent)] mr-2">•</span>
                  <span className="text-[var(--app-foreground-muted)]">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              variant="primary" 
              onClick={() => {
                resetDetection();
                startCamera();
              }}
              className="flex-1"
            >
              <Icon name="check" size="sm" className="mr-2" />
              Discover Another
            </Button>
            <Button 
              variant="outline" 
              onClick={resetDetection}
              className="flex-1"
            >
              Done
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Discover Historical Monuments" className="post-shadow">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)]">
          Point your camera at a historical monument to learn about its history and earn rewards!
        </p>

        {!isCameraOpen ? (
          <Button 
            variant="primary" 
            size="lg" 
            onClick={startCamera}
            className="w-full"
          >
            <Icon name="camera" size="sm" className="mr-2" />
            Open Camera
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-[var(--app-gray)] rounded-lg overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="primary" 
                onClick={capturePhoto}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Icon name="check" size="sm" className="mr-2" />
                    Recognize Monument
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={stopCamera}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
