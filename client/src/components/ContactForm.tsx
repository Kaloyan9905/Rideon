import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MaxWidthWrapper from "./MaxWidthWrapper";

const contactSchema = z.object({
  first_name: z.string().min(1, "*"),
  last_name: z.string().min(1, "*"),
  email: z.string().email("Invalid email address!").min(1, "*"),
  content: z.string().min(1, "*"),
});

type contactSchemaType = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactSchemaType>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: contactSchemaType) {
    console.log(data);
    toast.success("Successfully submitted!");
  }

  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center gap-7">
      <h1 className="text-3xl font-montserrat font-medium">Contact Us</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 lg:w-[25em] w-[17em]"
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
              type="text"
              {...register("email")}
              className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
            />
          </div>

          <div className="flex flex-row gap-5">
            <div>
              <div className="flex flex-row justify-between">
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
                className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
              />
            </div>

            <div>
              <div className="flex flex-row justify-between">
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
                className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-row justify-between">
              <label>Content:</label>
              {errors.content && (
                <span className="text-error pr-2">
                  {errors.content.message}
                </span>
              )}
            </div>
            <textarea
              rows={3}
              {...register("content")}
              className="w-full p-2 border border-primary rounded-md focus:outline-none focus:border-gray-800 transition duration-200 resize-none"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary flex-grow-[5]">
          Submit
        </button>
      </form>
    </MaxWidthWrapper>
  );
};

export default ContactForm;
