export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  data: {
    token: string;
    id: number;
    name: string;
    email: string;
    password: string;
    created: string;
    updated: string;
  };
}

export interface RegisterState {
  isLoading: boolean;
  token: string;
  userInformation: {
    created: string;
    email: string;
    name: string;
    id: number;
    password: string;
    updated: string;
  };
  registerLoggedIn: boolean;
}

export interface RegisterRejectedAction {
  response: {
    data: {
      message: string;
    };
  };
}
