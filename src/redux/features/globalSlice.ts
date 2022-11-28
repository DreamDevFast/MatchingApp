import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {AppState} from '../store';

export type TempUser = {
  id: string;
  email: string;
  mobile: string;
  name: string;
  birthday: string;
  prefecture: number;
  address: string;
  avatar: string;
  role: 'girl' | 'shop';
};

export interface GlobalState {
  isLoading: boolean;
  isAuthenticated: boolean;
  tempUser: TempUser | undefined;
  loginMethod: 'email' | 'mobile';
  newMatchedUsers: Array<any>;
  isEntering: boolean;
}

const initialState: GlobalState = {
  isLoading: false,
  isAuthenticated: false,
  tempUser: {
    id: '',
    email: '',
    mobile: '',
    name: '',
    birthday: new Date().toString(),
    prefecture: 0,
    address: '',
    avatar: 'default.png',
    role: 'girl',
  },
  loginMethod: 'email',
  newMatchedUsers: [],
  isEntering: true,
};

type setLoginMethodPayload = 'email' | 'mobile';

type setTempUserPayload = {
  id: string;
  email: string;
  mobile: string;
  name: string;
  birthday: string;
  prefecture: number;
  address: string;
  avatar: string;
  role: 'girl' | 'shop';
};

type setLoadingPayload = boolean;
type setAuthenticatedPayload = boolean;
type setNewMatchedUsersPayload = Array<any>;
type setEnteringPayload = boolean;

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
    setNewMatchedUsers: (
      state,
      action: PayloadAction<setNewMatchedUsersPayload>,
    ) => {
      state.newMatchedUsers = action.payload;
    },
    setEntering: (state, action: PayloadAction<setEnteringPayload>) => {
      state.isEntering = action.payload;
    },
  },
});

export const {
  setTempUser,
  setLoading,
  setLoginMethod,
  setAuthenticated,
  setNewMatchedUsers,
  setEntering,
} = globalSlice.actions;

export default globalSlice.reducer;
