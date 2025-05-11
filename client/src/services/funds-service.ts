import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./base";
import { WebApiService } from "./web-api-service";

class FundsService extends WebApiService {
  CONTACT_URL = `${BASE_URL}/funds`.replace(/\/+$/, "");

  async createFundSession(amount: number): Promise<{ sessionUrl: string }> {
    const res: AxiosResponse = await axios.post(`${this.CONTACT_URL}/stripe-webhook/`, {
      amount,
    }, this.generateHeader());
    return res.data;
  }
}

const fundsService = new FundsService();
export default fundsService;
