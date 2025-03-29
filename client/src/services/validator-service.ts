import axios from "axios";
import { BASE_URL } from "./base";
import { WebApiService } from "./web-api-service";

class ValidatorService extends WebApiService {
  async validate(serial_number: string): Promise<{ is_valid: boolean; reason: string }> {
    try {
      const response = await axios.post(`${BASE_URL}/validator/validate/`, {
        serial_number,
      }, this.generateHeader());


      return response.data;
    } catch (error: any) {
      return {
        is_valid: false,
        reason: error.response?.data?.reason || "Validation failed",
      };
    }
  }
}

const validatorService = new ValidatorService();
export default validatorService;
