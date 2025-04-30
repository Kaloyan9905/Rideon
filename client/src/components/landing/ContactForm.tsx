import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MaxWidthWrapper from "../MaxWidthWrapper";
import contactService from "@/services/contact-service";
import { Mail, User, MessageSquareText } from "lucide-react";

const contactSchema = z.object({
  first_name: z.string().min(1, "* First name is required"),
  last_name: z.string().min(1, "* Last name is required"),
  email: z.string().min(1, "* Email is required").email("Invalid email address"),
  content: z.string().min(1, "* Message is required"),
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

  const onSubmit = async (data: contactSchemaType) => {
    try {
      await contactService.makeUpdateProfileRequest(
        data.first_name,
        data.last_name,
        data.email,
        data.content
      );
      toast.success("Successfully submitted!");
    } catch (error: any) {
      toast.error("Submission failed. Please try again.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute top-0 left-0 w-full rotate-180 overflow-hidden z-0">
        <svg
          className="w-full h-[100vh]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9fafb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f9fafb" stopOpacity="1" />
            </linearGradient>
          </defs>

          <path
            d="M0,64L80,96C160,128,320,192,480,202.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
          />

          <path
            fill="url(#waveGradient)"
            d="M0,64L80,96C160,128,320,192,480,202.7C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64V320H0Z"
          />
        </svg>
      </div>

      <MaxWidthWrapper className="relative z-1 flex flex-col items-center gap-12">
      

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl  border border-gray-200 backdrop-blur-sm dark:border-neutral-700 shadow-xl rounded-2xl p-10 flex flex-col gap-8 transition-all duration-300"
        >
          <h2 className="text-4xl font-bold font-montserrat text-center mt-10">
            Contact Us
          </h2>
          <div className="flex flex-col">
            <label className="font-semibold  mb-1 flex items-center gap-2">
              <Mail className="w-5 h-5" /> Email
            </label>
            <input
              type="text"
              {...register("email")}
              placeholder="example@domain.com"
              className={`p-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-neutral-600"
                }  focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:outline-none transition`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "first_name", label: "First Name", icon: <User className="w-5 h-5" /> },
              { name: "last_name", label: "Last Name", icon: <User className="w-5 h-5" /> },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="font-semibold  mb-1 flex items-center gap-2">
                  {field.icon} {field.label}
                </label>
                <input
                  type="text"
                  {...register(field.name as keyof contactSchemaType)}
                  className={`p-3 rounded-lg border ${errors[field.name as keyof contactSchemaType]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-neutral-600"
                    }   focus:ring-2 focus:outline-none transition`}
                  placeholder={field.label}
                />
                {errors[field.name as keyof contactSchemaType] && (
                  <p className="text-sm text-red-500 mt-1">
                    {
                      errors[field.name as keyof contactSchemaType]
                        ?.message as string
                    }
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold  mb-1 flex items-center gap-2">
              <MessageSquareText className="w-5 h-5" /> Message
            </label>
            <textarea
              rows={5}
              {...register("content")}
              placeholder="Your message..."
              className={`p-3 rounded-lg border resize-none ${errors.content ? "border-red-500" : "border-gray-300 dark:border-neutral-600"
                }   focus:ring-2 focus:outline-none transition`}
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </MaxWidthWrapper>
    </section>
  );
};

export default ContactForm;
