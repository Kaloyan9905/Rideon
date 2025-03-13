import { useState, useEffect } from "react";
// import ticketService from "@/api/services/ticket-service";

const TicketTab = () => {
  const [tickets, setTickets] = useState<any[]>([]); // Store purchased tickets
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    ); // Show a loading spinner while fetching data
  }

  return (
    <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {tickets.length > 0 ? "Your Purchased Tickets" : "Purchase Ticket"}
      </h1>

      {tickets.length > 0 ? (
        <div className="space-y-6">
          {tickets.map((ticket, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ticket #{index + 1}</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">ID:</span> {ticket.pk}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Serial Number:</span> {ticket.serial_number}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Owner:</span> {ticket.owner}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Expires At:</span> {new Date(ticket.expires_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <p className="text-gray-600">You have no purchased tickets. Purchase a new ticket:</p>
          <button
            // onClick={handlePurchaseTicket}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Purchase Ticket
          </button>
        </div>
      )}

      {/* Show the "Purchase Ticket" button even if the user has tickets */}
      {tickets.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            // onClick={handlePurchaseTicket}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Purchase Another Ticket
          </button>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-700">Error:</h2>
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TicketTab;