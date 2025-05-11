import { useState } from "react";
import fundsService from "@/services/funds-service";

const fundOptions = [10, 20, 30, 50];

export default function AddFunds() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFundSelection = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleProceedToStripe = async () => {
    if (!selectedAmount) return;

    setLoading(true);
    try {
      const { sessionUrl } = await fundsService.createFundSession(
        selectedAmount
      );
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Stripe session creation failed", error);
      alert("Failed to initiate Stripe session. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
          Add Funds
        </h2>
        <p className="text-lg text-gray-600">
          Select the amount you want to add to your account.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
        {fundOptions.map((amount) => (
          <div
            key={amount}
            onClick={() => handleFundSelection(amount)}
            className={`cursor-pointer rounded-xl border-2 shadow-md transition-all duration-200 flex flex-col items-center justify-center p-6 ${
              selectedAmount === amount
                ? "bg-green-500 border-green-700 text-white scale-105"
                : "bg-white border-gray-300 hover:shadow-lg"
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
              alt={`$${amount}`}
              className="w-12 h-12 mb-2"
            />
            <span className="text-lg font-semibold">${amount}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleProceedToStripe}
          disabled={!selectedAmount || loading}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {selectedAmount
            ? loading
              ? "Processing..."
              : `Proceed with $${selectedAmount || ""}`
            : "Please select an amount"}
        </button>

        <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
          Payments are processed securely via Stripe. Funds will be added to
          your balance immediately after completion.
        </p>
      </div>
    </div>
  );
}
