import { createSlice } from '@reduxjs/toolkit';
import { RegisterAction } from './register.action';
import { RegisterRejectedAction, RegisterState } from './register.interfaces';
import {
  errorNotification,
  getItemFromLocalStorage,
  setItemOnLocalStorage,
} from '../../../utils/components';

const initialState: RegisterState = {
  isLoading: false,
  token: getItemFromLocalStorage('token'),
  userInformation: {
    id: 0,
    name: '',
    email: '',
    password: '',
    created: '',
    updated: '',
  },
  registerLoggedIn: false,
};

const RegisterSlice = createSlice({
  name: 'Register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterAction.pending, (state) => {
      state.isLoading = true;
      state.registerLoggedIn = false;
    });

    builder.addCase(RegisterAction.fulfilled, (state, action) => {
      console.log('*********');
      console.log('action.payload: ', action.payload.data);
      console.log('*********');
      const { id, name, email, token, created, updated, password } =
        action.payload.data;
      state.userInformation = {
        id,
        name,
        email,
        created,
        updated,
        password,
      };
      setItemOnLocalStorage('token', token);
      setItemOnLocalStorage('user', { id, name, email });
      state.registerLoggedIn = true;
      state.isLoading = false;
    });

    builder.addCase(RegisterAction.rejected, (state, action) => {
      const payload = action.payload as RegisterRejectedAction;
      errorNotification(payload.response.data.message);
      state.isLoading = false;
      state.registerLoggedIn = false;
    });
  },
});

export default RegisterSlice.reducer;
