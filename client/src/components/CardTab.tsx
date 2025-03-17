import { useState, useEffect } from "react";
import passesService from "@/services/card-service";
import profileService from "@/services/profile-service";
import { CardVM } from "@/types/pass";
import { Trash2, CalendarSync, X } from "lucide-react";
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

  const handleUpdateCard = async (expires_at: string) => {
    await passesService.makeUpdateCardRequest(card!.pk, expires_at);
    await fetchCard();
  };

  const handleDeleteCard = async () => {
    await passesService.makeDeleteCardRequest(card!.pk);
    setCard(null);
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
    <div className="w-full">
      {card ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 sm:p-8 rounded-2xl shadow-xl w-full bg-base-300 border border-base-content/10 ${
              showQRModal ? "blur-sm" : ""
            }`}
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
                <div
                  className="flex-shrink-0 cursor-pointer w-full sm:w-auto relative group"
                  onClick={() => setShowQRModal(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setShowQRModal(true)}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    className="relative"
                  >
                    <motion.img
                      whileHover={{
                        rotate: [0, -1, 1, -1, 1, 0],
                        transition: {
                          rotate: {
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          },
                        },
                      }}
                      className="rounded-2xl w-36 h-36 sm:w-44 sm:h-44 object-contain mx-auto shadow-lg bg-base-200 p-3"
                      src="https://randomqr.com/assets/images/rickroll-qrcode.webp"
                      alt="QR Code - Click to enlarge"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-base-content/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-base-100 font-montserrat font-medium px-3 py-2 rounded-lg bg-base-content/50">
                        Click to enlarge
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col justify-between w-full space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-base-200 border border-base-content/10">
                      <p className="text-base-content text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <span className="font-montserrat font-bold text-primary uppercase tracking-wider text-xs sm:text-sm">
                          Serial Number
                        </span>
                        <span className="font-mono text-base sm:text-lg break-all">
                          {card.serial_number}
                        </span>
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-base-200 border border-base-content/10">
                      <h2 className="text-base-content text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <span className="font-montserrat font-bold text-primary uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 sm:w-5 sm:h-5 text-secondary"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96
                64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 
                10.7-24 24z"
                            />
                          </svg>
                          Expiration Date
                        </span>
                        <span className="font-medium text-base sm:text-lg">
                          {new Date(card.expires_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </h2>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        await handleUpdateCard(
                          new Date(Date.now()).toISOString()
                        );
                      }}
                      className="p-3 bg-info/10 hover:bg-info/20 rounded-xl transition-colors"
                      aria-label="Update card"
                    >
                      <CalendarSync
                        onClick={() => {}}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-info"
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        (
                          document.getElementById(
                            "delete-card-modal"
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                      className="p-3 bg-error/10 hover:bg-error/20 rounded-xl transition-colors"
                      aria-label="Delete card"
                    >
                      <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-error" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <dialog
            id="delete-card-modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box bg-base-200 border border-base-content/10">
              <p className="text-center text-lg sm:text-xl font-montserrat font-semibold text-base-content">
                Are you sure you want to delete this card?
              </p>
              <div className="modal-action">
                <form method="dialog" className="w-full flex flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-error flex-[1.7] font-montserrat"
                    onClick={handleDeleteCard}
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary flex-[0.7] font-montserrat"
                  >
                    Close
                  </motion.button>
                </form>
              </div>
            </div>
          </dialog>

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
          className="shadow-xl flex flex-col items-center gap-4 w-full  p-6 rounded-2xl bg-base-200/50 backdrop-blur-sm border border-gray-500/50 "
        >
          <h3 className="text-3xl font-bold text-center decoration-secondary mb-6">
            Create New Card
          </h3>
          <div className="flex flex-col gap-2 w-full font-montserrat">
            <label>Expiration Date:</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base bg-base-100 [&::-webkit-datetime-edit-text]:text-base-content/50 [&::-webkit-datetime-edit]:text-base-content/50 before:content-[attr(data-placeholder)] before:text-base-content/50 [&:focus]:before:content-none [&:not([value=''])]:before:content-none"
              aria-label="Expiration date"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary font-montserrat text-sm sm:text-md w-full"
            onClick={handleCreatePass}
            disabled={!expiresAt}
          >
            Create Card
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default CardTab;
