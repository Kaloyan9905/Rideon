import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <MaxWidthWrapper
        className="pt-36 px-24 flex flex-col gap-3"
        maxWidth="w-screen"
      >
        <h1 className="text-center text-4xl font-montserrat font-extrabold underline underline-offset-4 decoration-secondary mb-11">
          Dashboard
        </h1>

        <div>
          <h1 className="text-2xl font-montserrat">Recent Activity:</h1>
        </div>

        <div>
          <h1 className="text-2xl font-montserrat">Notifications:</h1>
        </div>
      </MaxWidthWrapper>
    </DashboardLayout>
  );
};

export default DashboardPage;
