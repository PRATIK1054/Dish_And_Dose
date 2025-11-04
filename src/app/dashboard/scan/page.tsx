"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMedications } from "@/hooks/use-medications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const router = useRouter();
  const { addMedication } = useMedications();
  const { toast } = useToast();

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      const scannedMed = "Ibuprofen";
      addMedication(scannedMed);
      setIsScanning(false);
      setScanComplete(true);

      toast({
        title: "Medication Added",
        description: `"${scannedMed}" has been added to your list.`,
      });

      setTimeout(() => {
        router.push(`/dashboard/interaction-check?drugName=${scannedMed}`);
      }, 1500);
    }, 2000);
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
          <div className="p-8 border-4 border-dashed rounded-lg border-muted">
            <QrCode className="w-24 h-24 text-muted-foreground" />
          </div>

          {!isScanning && !scanComplete && (
            <Button onClick={handleScan} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Scan
            </Button>
          )}

          {isScanning && (
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="animate-spin" />
              <span>Scanning for medication...</span>
            </div>
          )}

          {scanComplete && (
             <div className="flex items-center gap-2 text-primary">
              <CheckCircle />
              <span>Scan complete! Redirecting...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
