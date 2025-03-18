import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
