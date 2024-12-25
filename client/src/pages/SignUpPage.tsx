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

const registerSchema = z
  .object({
    email: z.string().min(1, "*").email("Invalid email address!"),
    password: z.string().min(1, "*").min(8, "At 8 characters long!"),
    confirmPassword: z.string().min(1, "*"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  async function signUp(data: RegisterSchemaType): Promise<AuthResponseData> {
    await authService.makeSignUpRequest(
      data.email,
      data.password,
      data.confirmPassword
    );
    const response = await authService.makeSignInRequest(
      data.email,
      data.password
    );

    return response.data as unknown as AuthResponseData;
  }

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      storageService.saveAccessToken(data.access);
      storageService.saveRefreshToken(data.refresh);
      storageService.saveTokenExpiresDate(data.access);

      toast.success("Sign up successful!");
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

  function onSubmit(data: RegisterSchemaType) {
    signUpMutation.mutate(data);
  }

  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center h-screen gap-7">
      <h1 className="text-3xl font-montserrat font-medium">Sign Up Page</h1>
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
              className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
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
              className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
            />
          </div>

          <div>
            <div className="flex flex-row justify-between">
              <label>Confirm Password:</label>
              {errors.confirmPassword && (
                <span className="text-error pr-2">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
            />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <button type="submit" className="btn btn-primary flex-grow-[5]">
            Sign Up
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
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-blue-400 underline">
            Sign in
          </Link>
        </div>
      </form>

      <ThemeSwitcher absolute />
    </MaxWidthWrapper>
  );
};

export default SignUpPage;
