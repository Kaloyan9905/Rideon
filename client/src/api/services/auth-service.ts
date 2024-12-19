import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../base";
import { WebApiService } from "./web-api-service";
import {
  RenewTokensRequest,
  SignInRequest,
  SignUpRequest,
} from "../types/auth";

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

  public async makeSignInRequest(
    email: string,
    password: string
  ): Promise<AxiosResponse<void, any>> {
    const signInReq: SignInRequest = {
      email: email,
      password: password,
    };

    return await axios.post(`${this.AUTH_URL}/token/`, signInReq);
  }

  public async makeRenewTokensRequest(
    refreshToken: string
  ): Promise<AxiosResponse<void, any>> {
    const renewTokensReq: RenewTokensRequest = {
      refresh: refreshToken,
    };

    return await axios.post(`${this.AUTH_URL}/token/refresh/`, renewTokensReq);
  }
}

const authService = new AuthService();
export default authService;
