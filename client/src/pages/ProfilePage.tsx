import profileService from "@/services/profile-service";
import storageService from "@/services/storage-service";
import { ProfileVM } from "@/types/profile";
import Footer from "@/components/Footer";
import { LoadingSpinner } from "@/components/LoadingComponents";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { Save, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const editProfileSchema = z.object({
  ucn: z.string().min(10, "*").max(10, "Too long!"),
  first_name: z.string().min(1, "*"),
  last_name: z.string().min(1, "*"),
  date_of_birth: z.string(),
  phone_number: z.string().min(1, "*"),
  status: z
    .string()
    .refine(
      (val) =>
        ["student", "disabilities", "worker", "retiree"].includes(
          val.toLowerCase()
        ),
      {
        message: "Invalid!",
      }
    ),
});

type EditProfileSchemaType = z.infer<typeof editProfileSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

  const [profile, setProfile] = useState<ProfileVM | null>(null);

  useEffect(() => {
    try {
      (async () => {
        const profileResponse =
          (await profileService.makeGetProfileRequest()) as AxiosResponse<ProfileVM>;

        setProfile(profileResponse.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      first_name: "N/A",
      last_name: "N/A",
      date_of_birth: undefined,
      ucn: "N/A",
      phone_number: "N/A",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name || "N/A",
        last_name: profile.last_name || "N/A",
        date_of_birth: profile.date_of_birth || undefined,
        ucn: profile.ucn || "N/A",
        phone_number: profile.phone_number || "N/A",
        status: profile.status || "worker",
      });
    }
  }, [profile, reset]);

  async function onSubmit(data: EditProfileSchemaType) {
    await profileService
      .makeUpdateProfileRequest(
        data.ucn,
        data.first_name,
        data.last_name,
        new Date(data.date_of_birth).toLocaleDateString("en-CA"),
        data.phone_number,
        data.status,
        selectedImage
      )
      .then(() => {
        profile!.ucn = data.ucn;
        profile!.first_name = data.first_name;
        profile!.last_name = data.last_name;
        profile!.date_of_birth = new Date(
          data.date_of_birth
        ).toLocaleDateString("en-CA");
        profile!.phone_number = data.phone_number;
        profile!.status = data.status;

        toast.success("Successfully saved changes!");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data;

          if (errorData?.detail) {
            toast.error(errorData.detail);
          } else if (typeof errorData === "object" && errorData !== null) {
            const errorMessages = Object.entries(errorData)
              .map(([field, messages]) => {
                if (Array.isArray(messages)) {
                  return `${field}: ${messages.join(", ")}`;
                }
                return `${field}: ${messages}`;
              })
              .join("\n");

            toast.error(errorMessages);
          } else {
            toast.error("An error occurred!");
          }
        }
      });
  }

  async function handleDeleteProfile() {
    await profileService
      .makeDeleteProfileRequest()
      .then(async () => {
        await storageService.deleteUserData();
        navigate("/");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data;

          if (errorData?.detail) {
            toast.error(errorData.detail);
          } else if (typeof errorData === "object" && errorData !== null) {
            const errorMessages = Object.entries(errorData)
              .map(([field, messages]) => {
                if (Array.isArray(messages)) {
                  return `${field}: ${messages.join(", ")}`;
                }
                return `${field}: ${messages}`;
              })
              .join("\n");

            toast.error(errorMessages);
          } else {
            toast.error("An error occurred!");
          }
        }
      });
  }

  return (
    <>
      {profile !== null ? (
        <div className="h-screen">
          <div className="absolute top-5 flex flex-row justify-between items-center w-full px-5 py-1">
            <Undo2
              className="scale-150 cursor-pointer hover:opacity-85 transition-all ease-in-out duration-200"
              onClick={() => navigate(-1)}
            />
            <p className="text-secondary lg:text-2xl text-lg font-montserrat font-bold underline decoration-wavy decoration-primary underline-offset-4">
              Profile Settings
            </p>
            <ThemeSwitcher />
          </div>
          <MaxWidthWrapper className="flex flex-col justify-center lg:gap-14 gap-7 items-center h-full p-7">
            <div className="flex flex-row gap-5 items-center opacity-80 shadow-lg p-4 rounded-lg">
              <div className="flex md:flex-row flex-col gap-5 items-center">
                <label htmlFor="profile-picture-input">
                  <img
                    src={
                      profile.profile_image
                        ? profile.profile_image
                        : previewImage
                        ? previewImage
                        : "https://www.shutterstock.com/image-illustration/leather-background-jpeg-version-260nw-101031550.jpg"
                    }
                    alt="Profile Picture"
                    className="lg:w-20 lg:h-20 w-12 h-12 mask mask-squircle cursor-pointer hover:opacity-75 transition-all ease-in-out duration-300"
                  />
                </label>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <div className="flex flex-col">
                  <p className="font-montserrat font-bold lg:text-md text-sm">
                    {profile?.first_name ? profile.first_name : "ex. John"}{" "}
                    {profile?.last_name ? profile.last_name : "Doe Fourth"}
                  </p>
                </div>
              </div>

              <button
                className="btn btn-error lg:ml-7 ml-10 lg:px-4 px-1"
                onClick={() =>
                  (
                    document.getElementById(
                      "delete-profile-modal"
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                <Trash2 />
              </button>
              <dialog
                id="delete-profile-modal"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <p className="text-center lg:text-xl text-sm font-montserrat font-semibold">
                    Are you sure that you want to delete?
                  </p>
                  <div className="modal-action">
                    <form
                      method="dialog"
                      className="w-full flex flex-row gap-3"
                    >
                      <button
                        className="btn btn-error flex-[1.7]"
                        onClick={handleDeleteProfile}
                      >
                        Delete
                      </button>
                      <button className="btn btn-primary flex-[0.7]">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-row gap-5">
                <div>
                  <div className="flex flex-row justify-between text-sm lg:text-base">
                    <label>First Name:</label>
                    {errors.first_name && (
                      <span className="text-error pr-2">
                        {errors.first_name.message}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...register("first_name")}
                    className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
                  />
                </div>
                <div>
                  <div className="flex flex-row justify-between text-sm lg:text-base">
                    <label>Last Name:</label>
                    {errors.last_name && (
                      <span className="text-error pr-2">
                        {errors.last_name.message}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...register("last_name")}
                    className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex-[2]">
                  <div className="flex flex-row justify-between text-sm lg:text-base">
                    <label>EGN:</label>
                    {errors.ucn && (
                      <span className="text-error pr-2">
                        {errors.ucn.message}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...register("ucn")}
                    className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-row justify-between text-sm lg:text-base">
                    <label>Status:</label>
                    {errors.status && (
                      <span className="text-error pr-2">
                        {errors.status.message}
                      </span>
                    )}
                  </div>
                  <select
                    {...register("status")}
                    defaultValue="worker"
                    className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
                  >
                    <option value="student">Student</option>
                    <option value="disabilities">With Disabilities</option>
                    <option value="worker">Worker</option>
                    <option value="retiree">Retiree</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row gap-5">
                <div className="flex-1">
                  <div className="flex flex-row justify-between text-sm lg:text-base">
                    <label>Date of birth:</label>
                    {errors.date_of_birth && (
                      <span className="text-error pr-2">
                        {errors.date_of_birth.message}
                      </span>
                    )}
                  </div>
                  <input
                    type="date"
                    {...register("date_of_birth")}
                    className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
                  />
                </div>

                <div className="flex-[2]">
                  <div className="flex flex-row justify-between text-sm lg:text-base">
                    <label>Phone Number:</label>
                    {errors.phone_number && (
                      <span className="text-error pr-2">
                        {errors.phone_number.message}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    {...register("phone_number")}
                    className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
                  />
                </div>
              </div>

              <button
                className="btn btn-primary font-montserrat font-semibold mt-3"
                type="submit"
              >
                Save Changes <Save />
              </button>
            </form>
          </MaxWidthWrapper>
          <div className="absolute bottom-0 left-0">
            <Footer />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default ProfilePage;
