import axios from "axios";
import { BASE_URL } from "../base";
import { WebApiService } from "./web-api-service";

class TicketService extends WebApiService {
  TICKET_URL = `${BASE_URL}/pass`.replace(/\/+$/, "");
  PROFILE_URL = `${BASE_URL}/api/profile`.replace(/\/+$/, "");

  public async purchaseTicket() {
    return await axios.post(`${this.TICKET_URL}/purchase-ticket/`, {}, this.generateHeader());
  }

  public async getUserProfile() {
    return await axios.get(`${this.PROFILE_URL}/`, this.generateHeader());
  }
}

const ticketService = new TicketService();
export default ticketService;