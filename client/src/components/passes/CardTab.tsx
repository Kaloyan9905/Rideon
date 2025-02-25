import React, { useState, useEffect } from "react";
import passService from "@/api/services/pass-service";

const CreatePassComponent: React.FC = () => {
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [pass, setPass] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfileAndPass = async () => {
      try {
      
        const profileResponse = await passService.getUserProfile();
        const userProfile = profileResponse.data;

       
        if (userProfile.card) {
          setPass(userProfile.card); 
        } else {
          setPass(null); 
        }
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

    fetchUserProfileAndPass();
  }, []);

  const handleCreatePass = async () => {
    try {
      const res = await passService.createPass(expiresAt);
      setPass(res.data); 
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ); 
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {pass ? "Your Card" : "Create Card"}
      </h1>

      {pass ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Card Details:</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                <span className="font-semibold">ID:</span> {pass.pk}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                <span className="font-semibold">Serial Number:</span> {pass.serial_number}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                <span className="font-semibold">Owner:</span> {pass.owner}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                <span className="font-semibold">Expires At:</span> {new Date(pass.expires_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleCreatePass}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Create Card
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

export default CreatePassComponent;