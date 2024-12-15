import BackToTopBtn from "@/components/BackToTopBtn";
import { ReactNode } from "react";

const SharedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <main>{children}</main>
      <BackToTopBtn />
    </div>
  );
};

export default SharedLayout;
