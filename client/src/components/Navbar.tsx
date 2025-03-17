import { IdCard, LayoutDashboard, Menu, History, Cog } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import ThemeSwitcher from "./theme/ThemeSwitcher";
import { useEffect, useRef, useState } from "react";
import storageService from "@/services/storage-service";
import { ProfileVM } from "@/types/profile";
import { AxiosResponse } from "axios";
import profileService from "@/services/profile-service";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsPopoverOpen((prev) => !prev);

  const isActive = (path: string) => location.pathname === path;

  function handleClickOutside(event: MouseEvent) {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  }

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

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className="p-4 flex flex-row justify-between">
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <Menu />
          </label>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 text-base-content h-screen lg:w-[20%] w-[70%] p-4 flex flex-col">
            <div
              className="flex flex-row text-3xl font-montserrat font-semibold justify-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-accent">
                R<span className="text-primary">i</span>de
              </span>
              <span className="text-primary">on</span>
            </div>

            <ul className="font-montserrat flex flex-col gap-3 justify-center flex-grow ml-auto mr-auto text-xl">
              <li
                className={
                  isActive("/dashboard")
                    ? "bg-gray-600 bg-opacity-35 rounded-md"
                    : ""
                }
              >
                <Link to="/dashboard">
                  <span className="text-secondary">
                    <LayoutDashboard />
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/passes">
                  <span className="text-accent">
                    <IdCard />
                  </span>{" "}
                  Tickets & Cards
                </Link>
              </li>
              <li>
                <Link to="/history">
                  <span className="text-primary">
                    <History />
                  </span>
                  History
                </Link>
              </li>
            </ul>

            <button
              className="btn btn-secondary font-montserrat font-bold"
              onClick={() => navigate("/settings")}
            >
              <Cog /> Settings
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-7 items-center">
        <p className="text-lg">${profile?.balance ?? 215}</p>

        <div className="avatar">
          <div className="rounded-full w-12 h-12 ring-secondary ring">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              alt="Profile Picture"
              className="cursor-pointer"
              onClick={togglePopover}
            />
          </div>
        </div>

        {isPopoverOpen && (
          <div
            ref={popoverRef}
            className="absolute font-montserrat font-semibold right-16 top-20 bg-base-100 p-3 shadow-xl rounded-lg z-50 flex flex-col gap-3"
          >
            <button
              className="px-7 py-2 bg-primary rounded-lg text-black"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              className="px-7 py-2 bg-error rounded-lg text-black"
              onClick={() => {
                storageService.deleteUserData();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        )}

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
