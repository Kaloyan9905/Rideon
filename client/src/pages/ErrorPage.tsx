import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useNavigate } from "react-router";

const ErrorPage = ({
  statusCode,
  message,
  authError,
}: {
  statusCode: number;
  message: string;
  authError: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2 text-2xl">
          <h3>{message}</h3>
          <p>
            (<span className="text-error">{statusCode}</span>)
          </p>
        </div>
        <div className="flex flex-row gap-3">
          {authError && (
            <button
              className="btn btn-primary flex-grow-[5]"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          )}
          <button
            className="btn btn-accent flex-grow"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ErrorPage;
