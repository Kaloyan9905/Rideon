import React, { useState, useEffect } from "react";
import passService from "@/api/services/pass-service";

const CreatePassComponent = () => {
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
    <div className="basis-128 rounded-lg shadow-lg bg-gradient-to-bl from-slate-800 via-slate-600 via-40% to-zinc-400 ">
      {pass ? (
        <div className="p-8 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div className="flex gap-10 items-start">
              <div>
                <img className="rounded-2xl" src="https://randomqr.com/assets/images/rickroll-qrcode.webp" />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="p-4 rounded-lg">
                  <p className="text-white">
                    <span className="font-semibold">Serial Number:</span> {pass.serial_number}
                  </p>
                </div>
                <div className="p-4 rounded-lg">
                  <h2 className="text-slate-200 text-2xl flex items-center">
                    <span className="font-semibold me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                        <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96
             64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 
             10.7-24 24z" />
                      </svg>
                    </span> {new Date(pass.expires_at).toLocaleString()}
                  </h2>
                </div>
              </div>
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
            className="px-8 py-3 bg-bflue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
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