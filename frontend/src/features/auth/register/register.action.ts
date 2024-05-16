import { createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../api/server';
import { RegisterRequest, RegisterResponse } from './register.interfaces';

export const RegisterAction = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: unknown }
>(
  'auth/register-form',
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const { data } = await server.register.loadRegister(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
