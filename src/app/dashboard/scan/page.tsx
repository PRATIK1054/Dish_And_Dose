"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
import { useMedications } from "@/hooks/use-medications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const { addMedication } = useMedications();
  const { toast } = useToast();
  const streamRef = useRef<MediaStream | null>(null);

  const cleanupCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const handleScanSuccess = useCallback((data: string) => {
    if (scanComplete) return;

    setIsScanning(false);
    setScanComplete(true);
    cleanupCamera();

    const scannedMed = data;
    addMedication(scannedMed);

    toast({
      title: "Medication Added",
      description: `"${scannedMed}" has been added to your list.`,
    });

    setTimeout(() => {
      router.push(`/dashboard/interaction-check?drugName=${encodeURIComponent(scannedMed)}`);
    }, 1500);
  }, [scanComplete, cleanupCamera, addMedication, toast, router]);

  const tick = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        try {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code) {
            handleScanSuccess(code.data);
          }
        } catch (error) {
          console.error("jsQR error:", error);
        }
      }
    }
  }, [handleScanSuccess]);
  
  useEffect(() => {
    let animationFrameId: number;

    const continuousTick = () => {
      tick();
      animationFrameId = requestAnimationFrame(continuousTick);
    };

    if (isScanning) {
      animationFrameId = requestAnimationFrame(continuousTick);
    }

    return () => {
      if(animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isScanning, tick]);

  useEffect(() => {
    return () => cleanupCamera();
  }, [cleanupCamera]);


  const startScan = async () => {
    setScanComplete(false);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        streamRef.current = stream;
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Make sure video plays
          setIsScanning(true);
        }
      } else {
        setHasCameraPermission(false);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setHasCameraPermission(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Scan Prescription</h1>
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
          <CardDescription>Scan the QR code on your prescription to automatically add medications.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
          <div className="relative w-64 h-64 border-4 border-dashed rounded-lg border-muted flex items-center justify-center overflow-hidden">
             <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted hidden={!isScanning} />
            {!isScanning && (
              <QrCode className="w-24 h-24 text-muted-foreground" />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {!isScanning && !scanComplete && (
            <Button onClick={startScan} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Scan
            </Button>
          )}

          {isScanning && (
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="animate-spin" />
              <span>Scanning for QR code...</span>
            </div>
          )}

          {scanComplete && (
             <div className="flex items-center gap-2 text-primary">
              <CheckCircle />
              <span>Scan complete! Redirecting...</span>
            </div>
          )}

          {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>Camera Access Denied</AlertTitle>
              <AlertDescription>
                Please enable camera permissions in your browser settings to use this feature.
              </AlertDescription>
            </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
