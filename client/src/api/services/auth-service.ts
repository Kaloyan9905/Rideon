import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../base";
import { WebApiService } from "./web-api-service";
import { SignUpRequest } from "../types/auth";

class AuthService extends WebApiService {
  AUTH_URL = `${BASE_URL}/authenticate`.replace(/\/+$/, "");

  public async makeSignUpRequest(
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<AxiosResponse<void, any>> {
    const signUpReq: SignUpRequest = {
      email: email,
      password: password,
      password2: confirmPassword,
    };

    return await axios.post(`${this.AUTH_URL}/sign-up/`, signUpReq);
  }
}

const authService = new AuthService();
export default authService;
