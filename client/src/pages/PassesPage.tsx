import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CardTab from "@/components/CardTab";
import TicketTab from "@/components/TicketTab";
import FaqTab from "@/components/FaqTab";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";

const PassesPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <DashboardLayout>
      <MaxWidthWrapper>
        <div className="mockup-window bg-base-200 border mt-32 lg:mx-12 x-2">
          <div className="m-7">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center font-montserrat">
              <p className="text-xl font-bold mb-5 lg:mb-0">My Documents:</p>

              <div
                role="tablist"
                className="tabs tabs-bordered flex flex-row lg:justify-center font-montserrat font-bold"
              >
                <a
                  role="tab"
                  className={`text-xl tab ${
                    activeTab === 1
                      ? "tab-active text-secondary transition-all ease-in-out duration-300"
                      : ""
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Cards
                </a>

                <a
                  role="tab"
                  className={`text-xl tab ${
                    activeTab === 2
                      ? "tab-active text-primary transition-all ease-in-out duration-300"
                      : ""
                  }`}
                  onClick={() => setActiveTab(2)}
                >
                  Tickets
                </a>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-16 mb-8">
              <div className="flex-1 w-full flex justify-center">
                {activeTab === 1 && <CardTab />}
                {activeTab === 2 && <TicketTab />}
              </div>
              <div className="flex-1 flex justify-center">
                <FaqTab />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </DashboardLayout>
  );
};

export default PassesPage;
