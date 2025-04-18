import axios from "axios";
import { BASE_URL } from "./base";
import { WebApiService } from "./web-api-service";

class PassesService extends WebApiService {
  PASSES_URL = `${BASE_URL}/pass`.replace(/\/+$/, "");

  public async makeCreateCardRequest(expiresAt: string) {
    return await axios.post(
      `${this.PASSES_URL}/create-card/`,
      { expires_at: expiresAt },
      this.generateHeader()
    );
  }

  public async makeBuyTicketRequest() {
    console.log(this.generateHeader());
    return await axios.post(
      `${this.PASSES_URL}/purchase-ticket/`,
      {},
      this.generateHeader()
    );
  }

  public async makeUpdateCardRequest(id: number, expires_at: string) {
    return await axios.put(
      `${this.PASSES_URL}/${id}/update-card/`,
      { expires_at: expires_at },
      this.generateHeader()
    );
  }

  public async makeDeleteCardRequest(id: number) {
    return await axios.delete(
      `${this.PASSES_URL}/${id}/delete-card/`,
      this.generateHeader()
    );
  }

  public async makeGetCardDetailsRequest(id: number) {
    return await axios.get(
      `${this.PASSES_URL}/${id}/details-card/`,
      this.generateHeader()
    );
  }
}

const passesService = new PassesService();
export default passesService;
