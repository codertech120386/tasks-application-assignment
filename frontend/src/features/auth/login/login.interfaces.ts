export interface LoginUserResponse {
  id: number;
  email: string;
  name: string;
  token?: string;
}

export interface LoginStateResponse {
  data: LoginUserResponse;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginState {
  isLoading: boolean;
  loginLoggedIn: boolean;
  userInformation: LoginUserResponse;
}

export interface LoginRejectedAction {
  response: {
    data: {
      message: string;
    };
  };
}
