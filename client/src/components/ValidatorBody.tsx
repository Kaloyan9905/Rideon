import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

const ValidatorBody = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "valid" | "invalid" | null>("pending");
  const [message, setMessage] = useState("Initializing scanner...");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let scanning = true;

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setMessage("Waiting for QR code...");
      } catch (error) {
        setMessage("Camera access denied. Please enable permissions.");
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    const scanQRCode = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx || !videoRef.current.videoWidth) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && scanning) {
        scanning = false;
        setScanResult(code.data);
        const isValid = code.data.includes("VALID");
        setStatus(isValid ? "valid" : "invalid");
        setMessage(isValid ? "✔ Ticket is valid" : "✘ Ticket is invalid");
      } else {
        requestAnimationFrame(scanQRCode);
      }
    };

    requestAnimationFrame(scanQRCode);
  }, [scanResult]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Ticket Validator</h1>
      <p className="text-lg text-gray-600 mb-4">{message}</p>
      <div className="relative rounded-2xl p-6 w-full max-w-lg flex flex-col items-center">
        <video ref={videoRef} className="w-96 h-96 border-4 border-primary rounded-lg" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      {scanResult && (
        <div className={`mt-6  shadow-lg rounded-2xl p-6 w-full max-w-xl flex flex-col items-center text-center border-l-8 ${status === "valid" ? "border-green-500" : "border-red-500"}`}>
          <p className="text-lg font-semibold text-gray-700">
            Scanned Code: <span className="text-indigo-600 font-bold">{scanResult}</span>
          </p>
          {status === "valid" ? (
            <p className="text-green-600 text-xl font-bold mt-3">✔ Valid Ticket</p>
          ) : (
            <p className="text-red-600 text-xl font-bold mt-3">✘ Invalid Ticket</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidatorBody;
