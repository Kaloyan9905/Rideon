import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2, Undo2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const editProfileSchema = z.object({
  first_name: z.string().min(1, "*"),
  last_name: z.string().min(1, "*"),
  email: z.string().min(1, "*").email("Invalid email address!"),
  username: z.string().min(1, "*"),
  gender: z
    .string()
    .refine((val) => ["male", "female"].includes(val.toLowerCase()), {
      message: "Invalid!",
    }),
});

type EditProfileSchemaType = z.infer<typeof editProfileSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();

  const [, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

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
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      first_name: "Ivaylo",
      last_name: "Abadzhiev",
      email: "ivaylo@abv.bg",
      username: "ivaylo",
    },
  });

  async function onSubmit(data: EditProfileSchemaType) {
    console.log(data);
  }

  // async function handleDeleteProfile() {}

  return (
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
                  previewImage
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
                Ivaylo Abadzhiev - <span className="text-error">( </span>
                <span className="text-accent">ivvo_abadzhiev</span>
                <span className="text-error"> )</span>
              </p>
              <p>ivvo_abadzhiev@gmail.com</p>
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
                <form method="dialog" className="w-full flex flex-row gap-3">
                  <button className="btn btn-error flex-[1.7]">Delete</button>
                  <button className="btn btn-primary flex-[0.7]">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <div className="flex flex-row justify-between text-sm lg:text-base">
              <label>Email:</label>
              {errors.email && (
                <span className="text-error pr-2">{errors.email.message}</span>
              )}
            </div>
            <input
              type="text"
              {...register("email")}
              className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
            />
          </div>

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
                <label>Username:</label>
                {errors.username && (
                  <span className="text-error pr-2">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <input
                type="text"
                {...register("username")}
                className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-row justify-between text-sm lg:text-base">
                <label>Gender:</label>
                {errors.gender && (
                  <span className="text-error pr-2">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <select
                {...register("gender")}
                defaultValue="male"
                className="text-sm lg:text-base w-full lg:p-2 p-1 border border-primary rounded-md focus:outline-none focus:border-blue-700 transition duration-200"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
  );
};

export default ProfilePage;
