import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DashboardLayout from "@/layouts/DashboardLayout";
import { FC, ReactNode } from "react";

interface CustomButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="px-6 py-3 text-lg rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-all"
    >
        {children}
    </button>
);

interface CustomBadgeProps {
    children: ReactNode;
    status: "Used" | "Unused";
}

const CustomBadge: FC<CustomBadgeProps> = ({ children, status }) => {
    const color = status === "Used" ? "bg-green-500" : "bg-red-500";
    return <span className={`${color} text-white px-3 py-1 rounded-full text-sm`}>{children}</span>;
};

interface PurchaseItem {
    date: string;
    item: string;
    price: string;
    status: "Used" | "Unused";
}

interface CustomTableProps {
    data: PurchaseItem[];
}

const CustomTable: FC<CustomTableProps> = ({ data }) => (
    <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
        <table className="w-full text-left border-primary border">
            <thead className="bg-primary text-white">
                <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Item</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-t border-primary">
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4">{item.item}</td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4">
                            <CustomBadge status={item.status}>{item.status}</CustomBadge>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const HistoryPage: FC = () => {
    const purchaseData: PurchaseItem[] = [
        { date: "2025-03-10", item: "Event Ticket", price: "$50", status: "Used" },
        { date: "2025-03-05", item: "VIP Pass", price: "$100", status: "Unused" },
        { date: "2025-03-05", item: "VIP Pass", price: "$100", status: "Used" },
        { date: "2025-03-05", item: "VIP Pass", price: "$100", status: "Unused" },
        { date: "2025-03-05", item: "VIP Pass", price: "$100", status: "Used" },
    ];

    return (
        <DashboardLayout>
            <MaxWidthWrapper className="pt-36 xl:px-24 flex flex-col gap-6" maxWidth="w-screen">
                <h1 className="text-center text-4xl font-montserrat font-extrabold underline underline-offset-4 decoration-secondary mb-8">
                    Purchase History
                </h1>
                <div className="mb-5 lg:my-5 bg-primary w-fit px-3 py-1 rounded-3xl">
                    <h1 className="text-2xl font-montserrat text-white">Recent Purchases</h1>
                </div>
                <CustomTable data={purchaseData} />
            </MaxWidthWrapper>
        </DashboardLayout>
    );
};

export default HistoryPage;