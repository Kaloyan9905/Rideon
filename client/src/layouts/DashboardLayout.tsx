import Navbar from "@/components/dashboard-layout/Navbar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
