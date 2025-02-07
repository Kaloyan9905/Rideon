import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../base";
import { WebApiService } from "./web-api-service";
import { ProfileVM } from "../types/profile";

class ProfileService extends WebApiService {
  PROFILE_URL = `${BASE_URL}/api/profile`.replace(/\/+$/, "");

  public async makeGetProfileRequest(): Promise<AxiosResponse<ProfileVM, any>> {
    return await axios.get(`${this.PROFILE_URL}/`, this.generateHeader());
  }

  public async makeUpdateProfileRequest(
    ucn?: string | undefined,
    first_name?: string | undefined,
    last_name?: string | undefined,
    date_of_birth?: string | undefined,
    phone_number?: string | undefined,
    status?: string | undefined,
    selectedImage?: Blob | undefined,
  ): Promise<AxiosResponse<void, any>> {
    const formData = new FormData();

    if (ucn !== undefined) formData.append("ucn", ucn);
    if (first_name !== undefined) formData.append("first_name", first_name);
    if (last_name !== undefined) formData.append("last_name", last_name);
    if (date_of_birth !== undefined)
      formData.append("date_of_birth", date_of_birth);
    if (phone_number !== undefined)
      formData.append("phone_number", phone_number);
    if (status !== undefined) formData.append("status", status);

    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }

    return await axios.put(`${this.PROFILE_URL}/`, formData, this.generateHeader());
  }

  public async makeDeleteProfileRequest() {
    return await axios.delete(`${this.PROFILE_URL}/`, this.generateHeader());
  }
}

const profileService = new ProfileService();
export default profileService;
