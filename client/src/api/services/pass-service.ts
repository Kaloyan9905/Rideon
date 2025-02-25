import axios from "axios";
import { BASE_URL } from "../base";
import { WebApiService } from "./web-api-service";

class PassService extends WebApiService {
  PASS_URL = `${BASE_URL}/pass`.replace(/\/+$/, "");
  PROFILE_URL = `${BASE_URL}/api/profile`.replace(/\/+$/, "");

  public async getPassDetails(id: number) {
    return await axios.get(`${this.PASS_URL}/${id}/details-card/`, this.generateHeader());
  }

  public async createPass(expiresAt: string) {
    return await axios.post(
      `${this.PASS_URL}/create-card/`,
      { expires_at: expiresAt },
      this.generateHeader()
    );
  }

  public async usePass() {
    return await axios.post(`${this.PASS_URL}/use/`, {}, this.generateHeader());
  }

  public async getUserPass() {
    return await axios.get(`${this.PASS_URL}/user-pass/`, this.generateHeader());
  }

  public async getUserProfile() {
    return await axios.get(`${this.PROFILE_URL}/`, this.generateHeader());
  }
}

const passService = new PassService();
export default passService;