import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DashboardLayout from "@/layouts/DashboardLayout";
import PaymentCard from "@/components/dashboard/PaymentCard";
import UserStats from "@/components/dashboard/UserStats";
const DashboardPage = () => {
  const purchases: { type: "Ticket" | "Card"; date: string }[] = [
    { type: "Ticket", date: "2025-03-17" },
    { type: "Card", date: "2025-03-16" },
    { type: "Ticket", date: "2025-03-15" },
  ];
  const userStatsData = {
    activeCard: Math.random() > 0.5,
    ticketsBought: Math.floor(Math.random() * 20),
    balance: parseFloat((Math.random() * 50).toFixed(2)),
  };

  return (
    <DashboardLayout>
      <MaxWidthWrapper
        className="pt-36 px-24 flex flex-col gap-3"
        maxWidth="w-screen"
      >
        <h1 className="text-center text-4xl font-montserrat font-extrabold underline underline-offset-4 decoration-secondary mb-11">
          Dashboard
        </h1>

        <div className="mb-5">
          <h1 className="text-2xl font-montserrat">User stats:</h1>
        </div>
        <UserStats
          activeCard={userStatsData.activeCard}
          ticketsBought={userStatsData.ticketsBought}
          balance={userStatsData.balance}
        />
        <div className="my-5">
          <h1 className="text-2xl font-montserrat">Recent Activity:</h1>
        </div>
        <PaymentCard purchases={purchases} />
      </MaxWidthWrapper>
    </DashboardLayout>
  );
};

export default DashboardPage;
