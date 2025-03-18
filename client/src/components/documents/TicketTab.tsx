import { useState, useEffect } from "react";
import passesService from "@/services/card-service";
import profileService from "@/services/profile-service";
import { TicketVM } from "@/types/pass";
import { ProfileVM } from "@/types/profile";
import { AxiosResponse } from "axios";
import { X } from "lucide-react";
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

const TicketTab: React.FC = () => {
  const [tickets, setTickets] = useState<TicketVM[]>([]);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketVM | null>(null);

  const getTickets = () => {
    try {
      (async () => {
        const profileResponse =
          (await profileService.makeGetProfileRequest()) as AxiosResponse<ProfileVM>;
        setTickets(profileResponse.data.tickets);
      })();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handleBuyTicket = () => {
    try {
      (async () => {
        await passesService.makeBuyTicketRequest();
        await getTickets();
      })();
    } catch (error) {
      console.log(error);
    }
  };

  const openQRCodeModal = (ticket: TicketVM) => {
    setSelectedTicket(ticket);
    setShowQRModal(true);
  };

  const validTickets = tickets.filter((ticket) => !ticket.is_used);

  return validTickets.length === 0 ? (
    <div className="w-full p-6 rounded-xl shadow-xl border border-gray-500/50 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-6">
        <p className="decoration-secondary">
          You have no purchased tickets. Get one now:
        </p>
        <button
          onClick={handleBuyTicket}
          className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-green-500/10 transition-all shadow-md"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-7 w-full px-11 items-center justify-center">
      <div className="carousel w-full overflow-hidden max-w-lg">
        {validTickets.map((ticket, idx) => {
          const prev = idx === 0 ? validTickets.length - 1 : idx - 1;
          const next = idx === validTickets.length - 1 ? 0 : idx + 1;
          return (
            <div
              key={idx}
              id={`slide${idx}`}
              className="carousel-item relative w-full flex justify-center"
            >
              <div className="flex flex-col gap-3 items-center">
                <div
                  className="flex-shrink-0 cursor-pointer w-full sm:w-auto relative group"
                  onClick={() => openQRCodeModal(ticket)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && openQRCodeModal(ticket)
                  }
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
                      src={ticket.qr_code}
                      alt="Ticket QR Code - Click to enlarge"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-base-content/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-base-100 font-montserrat font-medium px-3 py-2 rounded-lg bg-base-content/50">
                        Click to enlarge
                      </p>
                    </div>
                  </motion.div>
                </div>
                <label className="font-montserrat">
                  ({idx + 1}) Expires: {new Date(ticket.expires_at).toDateString()}
                </label>
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${prev}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${next}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleBuyTicket}
        className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-green-500/10 transition-all shadow-md"
      >
        Buy Another Ticket
      </button>
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => {
          setShowQRModal(false);
          setSelectedTicket(null);
        }}
        qrCodeUrl={selectedTicket ? selectedTicket.qr_code : ""}
      />
    </div>
  );
};

export default TicketTab;
