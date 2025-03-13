import axios from "axios";
import { BASE_URL } from "../base";
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

  public async makeCreateTicketRequest() {}

  public async makeUpdateCardRequest() {}

  public async makeDeleteCardRequest() {}

  public async makeGetCardDetailsRequest(id: number) {
    return await axios.get(
      `${this.PASSES_URL}/${id}/details-card/`,
      this.generateHeader()
    );
  }
}

const passesService = new PassesService();
export default passesService;
