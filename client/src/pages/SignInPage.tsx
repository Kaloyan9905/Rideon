import authService from "@/api/services/auth-service";
import storageService from "@/api/services/storage-service";
import { AuthResponseData } from "@/api/types/auth";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { QUERY_KEYS } from "@/shared/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "*").email("Invalid email address!"),
  password: z.string().min(1, "*"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signIn(data: LoginSchemaType): Promise<AuthResponseData> {
    const response = await authService.makeSignInRequest(
      data.email,
      data.password
    );

    return response.data as unknown as AuthResponseData;
  }

  const signInMutation = useMutation({
    mutationFn: signIn,
    mutationKey: QUERY_KEYS.auth,
    onSuccess: (data) => {
      storageService.saveAccessToken(data.access);
      storageService.saveRefreshToken(data.refresh);
      storageService.saveTokenExpiresDate(data.access);

      toast.success("Sign in successful!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.auth,
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        const errorMessages = errorData
          ? Object.entries(errorData)
              .map(
                ([fields, messages]) =>
                  `${fields}: ${(messages as string[]).join("\n")}`
              )
              .join("\n")
          : "An error occurred during sign up!";

        toast.error(errorMessages);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchemaType) {
    signInMutation.mutate(data);
  }

  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center h-screen gap-7">
      <h1 className="text-3xl font-montserrat font-medium">Login Page</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 lg:w-[21em] w-[17em]"
      >
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-row justify-between">
              <label>Email:</label>
              {errors.email && (
                <span className="text-error pr-2">{errors.email.message}</span>
              )}
            </div>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border border-blue-700 rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
            />
          </div>

          <div>
            <div className="flex flex-row justify-between">
              <label>Password:</label>
              {errors.password && (
                <span className="text-error pr-2">
                  {errors.password.message}
                </span>
              )}
            </div>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border border-blue-700 rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
            />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <button type="submit" className="btn btn-primary flex-grow-[5]">
            Login
          </button>
          <button
            type="button"
            className="btn btn-accent flex-grow"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        <div className="flex flex-row justify-center gap-3">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="text-blue-400 underline">
            Sign up
          </Link>
        </div>
      </form>

      <ThemeSwitcher absolute />
    </MaxWidthWrapper>
  );
};

export default SignInPage;
