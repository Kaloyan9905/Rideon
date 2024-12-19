export interface AuthResponseData {
  access: string;
  refresh: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  password2: string;
}
