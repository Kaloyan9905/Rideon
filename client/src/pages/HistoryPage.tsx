import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DashboardLayout from "@/layouts/DashboardLayout";
import profileService from "@/services/profile-service";
import { TicketVM } from "@/types/pass";
import { AxiosResponse } from "axios";
import { FC, ReactNode, useEffect, useState } from "react";

interface CustomBadgeProps {
  children: ReactNode;
  status: "Used" | "Unused";
}

const CustomBadge: FC<CustomBadgeProps> = ({ children, status }) => {
  const color = status === "Used" ? "bg-green-500" : "bg-red-500";
  return (
    <span className={`${color} text-white px-3 py-1 rounded-full text-sm`}>
      {children}
    </span>
  );
};

interface CustomTableProps {
  data: TicketVM[];
}

const CustomTable: FC<CustomTableProps> = ({ data }) => (
  <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
    <table className="w-full text-left border-primary border">
      <thead className="bg-primary text-white">
        <tr>
          <th className="px-6 py-3">Date</th>
          <th className="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-t border-primary">
            <td className="px-6 py-4">
              {new Date(item.expires_at).toDateString()}
            </td>
            <td className="px-6 py-4">
              <CustomBadge status={item.is_used ? "Used" : "Unused"}>
                {item.is_used ? "Used" : "Unused"}
              </CustomBadge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface ProfileVM {
  tickets: TicketVM[];
}

const HistoryPage: FC = () => {
  const [tickets, setTickets] = useState<TicketVM[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

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

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedTickets = tickets.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <DashboardLayout>
      <MaxWidthWrapper
        className="pt-36 xl:px-24 flex flex-col gap-6"
        maxWidth="w-screen"
      >
        <h1 className="text-center text-4xl font-montserrat font-extrabold underline underline-offset-4 decoration-secondary mb-8">
          Purchase History
        </h1>
        <div className="mb-5 lg:my-5 bg-primary w-fit px-3 py-1 rounded-3xl">
          <h1 className="text-2xl font-montserrat text-white">
            Recent Purchases
          </h1>
        </div>
        <CustomTable data={paginatedTickets} />
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </MaxWidthWrapper>
    </DashboardLayout>
  );
};

export default HistoryPage;
