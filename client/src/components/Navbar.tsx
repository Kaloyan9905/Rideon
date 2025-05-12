import {
  IdCard,
  LayoutDashboard,
  Menu,
  History,
  Cog,
  LogOut,
  BadgeCheck,
  HandCoins,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import ThemeSwitcher from "./theme/ThemeSwitcher";
import { useEffect, useState } from "react";
import storageService from "@/services/storage-service";
import { ProfileVM } from "@/types/profile";
import { AxiosResponse } from "axios";
import profileService from "@/services/profile-service";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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

            <ul className="font-montserrat flex flex-col gap-3 justify-center flex-grow text-xl">
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
              <li
                className={
                  isActive("/passes")
                    ? "bg-gray-600 bg-opacity-35 rounded-md"
                    : ""
                }
              >
                <Link to="/passes">
                  <span className="text-accent">
                    <IdCard />
                  </span>{" "}
                  Tickets & Cards
                </Link>
              </li>
              <li
                className={
                  isActive("/history")
                    ? "bg-gray-600 bg-opacity-35 rounded-md"
                    : ""
                }
              >
                <Link to="/history">
                  <span className="text-primary">
                    <History />
                  </span>
                  History
                </Link>
              </li>
            </ul>
            <button
              className="btn bg-yellow-300 hover:bg-yellow-700 mb-2 font-montserrat font-bold"
              onClick={() => navigate("/add-funds")}
            >
              <HandCoins /> Add credits
            </button>
            {profile?.is_superuser && (
              <button
                className="btn bg-green-500 hover:bg-green-600 text-black mb-2 font-montserrat font-bold"
                onClick={() => navigate("/validator")}
              >
                <BadgeCheck /> Validator
              </button>
            )}
            <button
              className="btn btn-secondary font-montserrat font-bold"
              onClick={() => navigate("/profile")}
            >
              <Cog /> Settings
            </button>
            <button
              className="btn bg-red-700 hover:bg-red-800 mt-2 font-montserrat font-bold"
              onClick={() => {
                storageService.deleteUserData();
                navigate("/");
              }}
            >
              <LogOut /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-7 items-center">
        <div className="avatar">
          <div className="rounded-full w-12 h-12 ring-secondary ring">
            <img
              src={
                profile?.profile_image
                  ? profile!.profile_image
                  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              }
              alt="Profile Picture"
              className="cursor-pointer"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
