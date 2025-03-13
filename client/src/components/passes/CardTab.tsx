import { useState, useEffect } from "react";
import passesService from "@/api/services/card-service";
import profileService from "@/api/services/profile-service";
import { CardVM } from "@/api/types/pass";
import { Trash2, RefreshCw, X } from "lucide-react";
import { motion } from "framer-motion";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  qrCodeUrl,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-4 sm:p-8 rounded-2xl relative max-w-[90vw] w-full sm:w-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <img
          className="w-full max-w-[280px] h-auto object-contain mx-auto"
          src={qrCodeUrl}
          alt="QR Code"
        />
      </motion.div>
    </motion.div>
  );
};

const CardTab: React.FC = () => {
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [card, setCard] = useState<CardVM | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  const fetchCard = async () => {
    try {
      setError(null);
      const profileResponse = await profileService.makeGetProfileRequest();
      const userProfile = profileResponse.data;

      if (userProfile.card) {
        setCard(userProfile.card);
      }
    } catch (error) {
      setError("Failed to load card information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const handleCreatePass = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await passesService.makeCreateCardRequest(expiresAt);
      setCard(res.data);
    } catch (error) {
      setError("Failed to create card");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCard = async () => {
    // TODO: Implement card update logic
    console.log("Update card clicked");
  };

  const handleDeleteCard = async () => {
    // TODO: Implement card deletion logic
    console.log("Delete card clicked");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <p className="text-error text-center">{error}</p>
        <button onClick={fetchCard} className="btn btn-primary font-montserrat">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {card ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 sm:p-8 rounded-lg shadow-lg w-full bg-gradient-to-bl from-slate-800 via-slate-600 via-40% to-zinc-400 ${
              showQRModal ? "blur-sm" : ""
            }`}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-center">
                <div
                  className="flex-shrink-0 cursor-pointer w-full sm:w-auto"
                  onClick={() => setShowQRModal(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setShowQRModal(true)}
                >
                  <motion.img
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -1, 1, -1, 1, 0],
                      transition: {
                        rotate: {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      },
                    }}
                    className="rounded-2xl w-40 h-40 sm:w-36 sm:h-36 object-contain mx-auto"
                    src="https://randomqr.com/assets/images/rickroll-qrcode.webp"
                    alt="QR Code - Click to enlarge"
                  />
                </div>
                <div className="flex flex-col justify-between w-full space-y-3 sm:space-y-4">
                  <div className="p-2 sm:p-4 rounded-lg bg-slate-700/30">
                    <p className="text-white text-sm sm:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-montserrat font-bold whitespace-nowrap">
                        Serial Number:
                      </span>
                      <span className="break-all text-sm sm:text-base">
                        {card.serial_number}
                      </span>
                    </p>
                  </div>
                  <div className="p-2 sm:p-4 rounded-lg bg-slate-700/30">
                    <h2 className="text-slate-200 text-sm sm:text-xl flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 sm:w-6 sm:h-6"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            className="text-secondary"
                            d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96
              64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 
              10.7-24 24z"
                          />
                        </svg>
                        <span>Expires:</span>
                      </span>
                      <span className="text-sm sm:text-base">
                        {new Date(card.expires_at).toDateString()}
                      </span>
                    </h2>
                  </div>
                  <div className="flex justify-end gap-3 sm:gap-4 mt-2 sm:mt-4">
                    <button
                      onClick={handleUpdateCard}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      aria-label="Update card"
                    >
                      <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-info" />
                    </button>
                    <button
                      onClick={handleDeleteCard}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      aria-label="Delete card"
                    >
                      <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-error" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <QRCodeModal
            isOpen={showQRModal}
            onClose={() => setShowQRModal(false)}
            qrCodeUrl="https://randomqr.com/assets/images/rickroll-qrcode.webp"
          />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 w-full max-w-md mx-auto p-4"
        >
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            aria-label="Expiration date"
          />
          <button
            className="btn btn-primary font-montserrat text-sm sm:text-md w-full"
            onClick={handleCreatePass}
            disabled={!expiresAt}
          >
            Create Card
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CardTab;
