import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DashboardLayout from "@/layouts/DashboardLayout";
import PaymentCard from "@/components/dashboard/PaymentCard";
import UserStats from "@/components/dashboard/UserStats";
import { useEffect, useState } from "react";
import { ProfileVM } from "@/types/profile";
import profileService from "@/services/profile-service";
import { AxiosResponse } from "axios";

interface userStatsDataProps {
  activeCard: boolean;
  ticketsBought: number;
  balance: number;
}

const DashboardPage = () => {
  const [profile, setProfile] = useState<ProfileVM | undefined>(undefined);

  const purchases: { type: "Ticket" | "Card"; date: string }[] = [
    { type: "Ticket", date: "2025-03-17" },
    { type: "Card", date: "2025-03-16" },
    { type: "Ticket", date: "2025-03-15" },
  ];
  const userStatsData: userStatsDataProps = {
    activeCard: profile?.card ? true : false,
    ticketsBought: Math.floor(Math.random() * 20),
    balance: parseFloat((Math.random() * 50).toFixed(2)),
  };

  useEffect(() => {
    try {
      (async () => {
        const profileResponse =
          (await profileService.makeGetProfileRequest()) as AxiosResponse<ProfileVM>;

        setProfile(profileResponse.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <DashboardLayout>
      <MaxWidthWrapper
        className="pt-36 xl:px-24 flex flex-col gap-3"
        maxWidth="w-screen"
      >
        <h1 className="text-center text-4xl font-montserrat font-extrabold underline underline-offset-4 decoration-secondary mb-11">
          Dashboard
        </h1>
        <div className="mb-5 lg:my-5 bg-green-800 w-fit px-3 py-1 rounded-3xl">
          <h1 className="text-2xl font-montserrat text-white">User stats:</h1>
        </div>

        <UserStats
          activeCard={userStatsData.activeCard}
          ticketsBought={userStatsData.ticketsBought}
          balance={userStatsData.balance}
        />
        <div className="mt-16 mb-5 lg:my-5 bg-red-800 w-fit px-3 py-1 rounded-3xl">
          <h1 className="text-2xl font-montserrat text-white">
            Recent Activity:
          </h1>
        </div>
        <PaymentCard purchases={purchases} />
      </MaxWidthWrapper>
    </DashboardLayout>
  );
};

export default DashboardPage;
