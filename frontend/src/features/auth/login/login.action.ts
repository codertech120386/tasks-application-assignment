import { createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../api/server';
import { LoginRequest, LoginStateResponse } from './login.interfaces';

export const LoginAction = createAsyncThunk<
  LoginStateResponse,
  LoginRequest,
  { rejectValue: unknown }
>('auth/login', async (payload: LoginRequest, { rejectWithValue }) => {
  try {
    const { data } = await server.login.loadLogin(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
