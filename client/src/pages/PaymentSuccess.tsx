import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const totalTime = 3000; 
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 100;   
    const step = 100 / (totalTime / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Payment Successful</h2>
        <p className="text-gray-600 mb-6">
          Your funds were added successfully. Redirecting to your dashboard...
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
