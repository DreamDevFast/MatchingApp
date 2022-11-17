import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {AppState} from '../store';

export type TempUser = {
  email: string;
  mobile: string;
  name: string;
  birthday: string;
  prefecture: number;
  address: string;
  role: 'girl' | 'shop';
};

export interface GlobalState {
  isLoading: boolean;
  isAuthenticated: boolean;
  tempUser: TempUser | undefined;
  loginMethod: 'email' | 'mobile';
}

const initialState: GlobalState = {
  isLoading: false,
  isAuthenticated: false,
  tempUser: {
    email: '',
    mobile: '',
    name: '',
    birthday: new Date().toString(),
    prefecture: 0,
    address: '',
    role: 'girl',
  },
  loginMethod: 'email',
};

type setLoginMethodPayload = 'email' | 'mobile';

type setTempUserPayload = {
  email: '';
  mobile: '';
  name: string;
  birthday: string;
  prefecture: number;
  address: string;
  role: 'girl' | 'shop';
};

type setLoadingPayload = boolean;
type setAuthenticatedPayload = boolean;

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoginMethod: (state, action: PayloadAction<setLoginMethodPayload>) => {
      state.loginMethod = action.payload;
    },
    setTempUser: (state, action: PayloadAction<setTempUserPayload>) => {
      state.tempUser = {
        ...action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<setLoadingPayload>) => {
      state.isLoading = action.payload;
    },
    setAuthenticated: (
      state,
      action: PayloadAction<setAuthenticatedPayload>,
    ) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  setTempUser,
  setLoading,
  setLoginMethod,
  setAuthenticated,
} = globalSlice.actions;

export default globalSlice.reducer;
