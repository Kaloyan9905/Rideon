import { useState, useRef } from "react";
import jsQR from "jsqr";
import validatorService from "@/services/validator-service";

const ValidatorBody = () => {
  const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
  const [message, setMessage] = useState("Click to start scanning");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanning = useRef(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      streamRef.current = stream;
      scanning.current = true;
      setIsCameraOn(true);
      setMessage("Waiting for QR code...");
      requestAnimationFrame(scanQRCode);
    } catch (err) {
      setMessage("Camera access denied. Please enable permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    scanning.current = false;
    setIsCameraOn(false);
    setMessage("Camera stopped");
  };

  const toggleCamera = () => {
    isCameraOn ? stopCamera() : startCamera();
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !scanning.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx || !videoRef.current.videoWidth) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height) as { data: string } | null;

    if (code && code.data) {
      try {
        const parsed = JSON.parse(code.data);
        if (parsed.serial_number) {
          scanning.current = false;
          validateTicket(parsed.serial_number);
        }
      } catch (err) {
        console.error("Invalid JSON from QR code:", err);
      }
    } else {
      requestAnimationFrame(scanQRCode);
    }
      };

  const validateTicket = async (serial: string) => {
    setMessage("Validating pass...");
    try {
      const result = await validatorService.validate(serial);
      setStatus(result.is_valid ? "valid" : "invalid");
      setMessage(result.is_valid ? "✔ Valid Ticket" : "✘ Invalid Ticket");
      setTimeout(() => {
        setStatus(null);
        setMessage("Waiting for QR code...");
        scanning.current = true;
        requestAnimationFrame(scanQRCode);
      }, 1000);
    } catch (err) {
      setStatus("invalid");
      setMessage("✘ Validation failed");
      setTimeout(() => {
        setStatus(null);
        setMessage("Waiting for QR code...");
        scanning.current = true;
        requestAnimationFrame(scanQRCode);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Ticket Validator</h1>
      <p className="text-lg text-gray-600 mb-4">{message}</p>

      <button
        onClick={toggleCamera}
        className="mb-4 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition"
      >
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      <div className="relative rounded-2xl p-6 w-full max-w-lg flex flex-col items-center">
        <video ref={videoRef} className="w-96 h-96 border-4 border-primary rounded-lg" playsInline muted />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      {status && (
        <div className={`fixed inset-0  ${
              status === "valid" ? "bg-green-600/80" : "bg-red-600/80"
            } z-50 flex items-center justify-center`}>
          <div
            className={`text-white text-4xl font-bold px-12 h-100 w-100 py-6`}
          >
            {status === "valid" ? "✔ Valid Ticket" : "✘ Invalid Ticket"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidatorBody;
