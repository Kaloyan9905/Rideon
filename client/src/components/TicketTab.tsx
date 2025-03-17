import { useState, useEffect } from "react";
// import ticketService from "@/api/services/ticket-service";

const TicketTab = () => {
  const [tickets, setTickets] = useState<any[]>([]); // Store purchased tickets
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTickets([]);
  }, []);
  // Fetch the user's profile and tickets
  const fetchUserProfileAndTickets = async () => {
    try {
      // const profileResponse = await ticketService.getUserProfile();
      // const userProfile = profileResponse.data;
      // Check if the user has tickets
      // if (userProfile.tickets && userProfile.tickets.length > 0) {
      //   setTickets(userProfile.tickets); // Set the tickets if they exist
      // } else {
      //   setTickets([]); // No tickets exist
      // }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfileAndTickets();
  }, []);

  // const handlePurchaseTicket = async () => {
  //   try {
  //     // Purchase a new ticket
  //     const res = await ticketService.purchaseTicket();

  //     // Add the new ticket to the existing tickets
  //     setTickets((prevTickets) => [...prevTickets, res.data]);

  //     setError(null);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("An unknown error occurred");
  //     }
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-6  rounded-xl shadow-xl border border-gray-500/50 backdrop-blur-md">
      <h1 className="text-3xl font-bold text-center decoration-secondary mb-6">
        {tickets.length > 0 ? "Your Purchased Tickets" : "Purchase Ticket"}
      </h1>

      {tickets.length > 0 ? (
        <div className="space-y-6">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="bg-white/10 p-5 rounded-lg shadow-lg border border-white/20 backdrop-blur-md"
            >
              <h2 className="text-lg font-semibold decoration-secondary mb-3">
                🎟️ Ticket #{index + 1}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-md shadow-sm border border-white/20 backdrop-blur-lg">
                  <p className="text-gray-300 font-medium">ID</p>
                  <p className="decoration-secondary">{ticket.pk}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-md shadow-sm border border-white/20 backdrop-blur-lg">
                  <p className="text-gray-300 font-medium">Serial Number</p>
                  <p className="decoration-secondary">{ticket.serial_number}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-md shadow-sm border border-white/20 backdrop-blur-lg">
                  <p className="text-gray-300 font-medium">Owner</p>
                  <p className="decoration-secondary">{ticket.owner}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-md shadow-sm border border-white/20 backdrop-blur-lg">
                  <p className="text-gray-300 font-medium">Expires At</p>
                  <p className="decoration-secondary">
                    {new Date(ticket.expires_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <p className="decoration-secondary">
            You have no purchased tickets. Get one now:
          </p>
          <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-green-500/10 transition-all shadow-md">
            Buy Ticket
          </button>
        </div>
      )}

      {tickets.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 border-2 border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transition-all shadow-md">
            Buy Another Ticket
          </button>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-400/50 text-red-300 rounded-lg">
          <h2 className="text-lg font-semibold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TicketTab;
