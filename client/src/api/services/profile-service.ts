import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../base";
import { WebApiService } from "./web-api-service";
import { ProfileUM, ProfileVM } from "../types/profile";

class ProfileService extends WebApiService {
  PROFILE_URL = `${BASE_URL}/api/profile`.replace(/\/+$/, "");

  public async makeGetProfileRequest(): Promise<AxiosResponse<ProfileVM, any>> {
    return await axios.get(`${this.PROFILE_URL}/`, this.generateHeader());
  }

  public async makeUpdateProfileRequest(
    ucn: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    phone_number: string,
    status: string
  ): Promise<AxiosResponse<void, any>> {
    const profileUM: ProfileUM = {
      ucn: ucn,
      first_name: first_name,
      last_name: last_name,
      date_of_birth: date_of_birth,
      phone_number: phone_number,
      status: status,
    };

    return await axios.put(
      `${this.PROFILE_URL}/`,
      profileUM,
      this.generateHeader()
    );
  }

  public async makeDeleteProfileRequest() {
    return await axios.delete(`${this.PROFILE_URL}/`, this.generateHeader());
  }
}

const profileService = new ProfileService();
export default profileService;
