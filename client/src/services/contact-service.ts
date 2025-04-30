import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./base";
import { WebApiService } from "./web-api-service";

class ContactService extends WebApiService {
    CONTACT_URL = `${BASE_URL}/contact`.replace(/\/+$/, "");

    public async makeUpdateProfileRequest(
        first_name?: string | undefined,
        last_name?: string | undefined,
        email?: string | undefined,
        content?: string | undefined,
    ): Promise<AxiosResponse<void, any>> {
        const formData = new FormData();

        if (first_name !== undefined) formData.append("first_name", first_name);
        if (last_name !== undefined) formData.append("last_name", last_name);
        if (email !== undefined) formData.append("email", email);
        if (content !== undefined) formData.append("content", content);

        return await axios.post(`${this.CONTACT_URL}/`, formData, this.generateHeader());
    }

}

const contactService = new ContactService();
export default contactService;
