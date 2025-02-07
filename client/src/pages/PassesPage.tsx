import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CardTab from "@/components/passes/CardTab";
import TicketTab from "@/components/passes/TicketTab";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";

const PassesPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <DashboardLayout>
      <MaxWidthWrapper className="h-screen">
        <div className="mockup-window bg-base-200 border my-32 mx-12">
          <div className="m-7">
            <div className="flex flex-row justify-between items-center font-montserrat">
              <p className="text-xl font-bold">My Documents:</p>

              <div
                role="tablist"
                className="tabs tabs-bordered flex flex-row justify-center font-montserrat font-bold"
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

            <div className="flex justify-center items-center mt-24">
              {activeTab === 1 && <CardTab />}
              {activeTab === 2 && <TicketTab />}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </DashboardLayout>
  );
};

export default PassesPage;
