import React from "react";
import { useNavigate } from "react-router";

type UserStatsProps = {
    activeCard: boolean;
    ticketsBought: number | undefined;
    balance: number;
};

const UserStats: React.FC<UserStatsProps> = ({ activeCard, ticketsBought, balance }) => {
    const navigate = useNavigate();

    const cardBg = activeCard ? "bg-green-500" : "bg-red-500";
    const balanceBg =
        balance < 10 ? "bg-red-500" : balance <= 30 ? "bg-yellow-500" : "bg-green-500";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`border rounded-lg shadow-lg p-6 ${cardBg} grid grid-cols-3 items-center `}>
                <div className="col-span-2">
                    <h1 className="text-xl font-bold text-black"> {!activeCard ? "No Active Card" : "Your card is active"} </h1>
                    {!activeCard && (
                        <button onClick={() => navigate("/passes")} className="mt-4 bg-white text-black px-4 py-2 rounded-lg shadow-md">
                            Buy Card
                        </button>
                    )}
                </div>
                <div className="flex space-x-2">
                    <img src="https://cdn-icons-png.freepik.com/256/16193/16193925.png?uid=R100586331&ga=GA1.1.328462767.1719580284&semt=ais_hybrid" alt="Card Image 1" className="w-20 h-20 object-cover" />
                </div>
            </div>
            <div className="border rounded-lg shadow-lg p-6 bg-blue-500 grid grid-cols-3 items-center">
                <div className="col-span-2">
                    <h1 className="text-xl font-bold text-black">Tickets Bought</h1>
                    <h2 className="text-2xl text-black">{ticketsBought}</h2>
                </div>
                <div>
                    <img src="https://cdn-icons-png.freepik.com/256/11785/11785738.png?uid=R100586331&ga=GA1.1.328462767.1719580284&semt=ais_hybrid" alt="Tickets" className="w-24 h-24 object-cover" />
                </div>
            </div>

            <div className={`border rounded-lg shadow-lg p-6 ${balanceBg} grid grid-cols-3 items-center`}>
                <div className="col-span-2">
                    <h1 className="text-xl font-bold text-black">Account Balance</h1>
                    <h2 className="text-2xl text-black">${balance.toFixed(2)}</h2>
                </div>
                <div>
                    <img src="https://cdn-icons-png.freepik.com/256/5976/5976019.png?uid=R100586331&ga=GA1.1.328462767.1719580284&semt=ais_hybrid" alt="Balance" className="w-24 h-24 object-cover" />
                </div>
            </div>
        </div>
    );
};

export default UserStats;
