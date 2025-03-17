import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const ValidatorBody = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "valid" | "invalid" | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scanner = new Html5QrcodeScanner(
        "qr-scanner",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (decodedText) => {
          if (!scanResult) {
            setScanResult(decodedText);
            setStatus(decodedText.includes("VALID") ? "valid" : "invalid");
          }
        },
        (error) => console.warn(error)
      );
      return () => {
        scanner
          .clear()
          .catch((err) => console.warn("Scanner clear error:", err));
      };
    }
  }, [scanResult]);

  return (
    <div className="mt-44 flex flex-col gap-7 items-center">
      <h1 className="xl:text-4xl lg:text-3xl sm:text-3xl text-lg pb-5 font-montserrat">
        Validate your ticket
      </h1>

      <div className="p-5 w-full max-w-md flex flex-col items-center border border-gray-300 rounded-lg">
        <div id="qr-scanner" className="w-full"></div>
      </div>

      {scanResult && (
        <div className="p-5 w-full max-w-md flex flex-col items-center border border-gray-300 rounded-lg">
          <p className="text-lg font-semibold">
            Scanned Code: <span className="text-primary">{scanResult}</span>
          </p>
          {status === "valid" ? (
            <p className="text-green-500 text-xl font-bold mt-3">
              ✔ Valid Ticket
            </p>
          ) : (
            <p className="text-red-500 text-xl font-bold mt-3">
              ✘ Invalid Ticket
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidatorBody;
