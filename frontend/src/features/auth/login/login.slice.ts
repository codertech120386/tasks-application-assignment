import { createSlice } from '@reduxjs/toolkit';
import {
  getItemFromLocalStorage,
  setItemOnLocalStorage,
  errorNotification,
} from '../../../utils/components';
import { LoginRejectedAction, LoginState } from './login.interfaces';
import { LoginAction } from './login.action';

const initialState: LoginState = {
  isLoading: false,
  loginLoggedIn: getItemFromLocalStorage('token') ? true : false,
  userInformation: getItemFromLocalStorage('user')
    ? getItemFromLocalStorage('user')
    : null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(LoginAction.pending, (state) => {
      state.isLoading = true;
      state.loginLoggedIn = false;
    });

    builder.addCase(LoginAction.fulfilled, (state, action) => {
      const { id, name, email, token } = action.payload.data;
      state.userInformation = { id, name, email };

      setItemOnLocalStorage('token', token);
      setItemOnLocalStorage('user', { id, name, email });

      state.loginLoggedIn = true;
      state.isLoading = false;
    });

    builder.addCase(LoginAction.rejected, (state, action) => {
      state.loginLoggedIn = false;
      const payload = action.payload as LoginRejectedAction;
      errorNotification(payload.response.data.message);
      state.isLoading = false;
    });
  },
});

export default loginSlice.reducer;
