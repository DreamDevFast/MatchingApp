import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {AppState} from '../store';

export type TempUser = {
  name: string;
  birthday: string;
  prefecture: number;
  address: string;
};

export interface GlobalState {
  isLoading: boolean;
  tempUser: TempUser | undefined;
}

const initialState: GlobalState = {
  isLoading: false,
  tempUser: {
    name: '',
    birthday: new Date().toString(),
    prefecture: 0,
    address: '',
  },
};

type setTempUserPayload = {
  name: string;
  birthday: string;
  prefecture: number;
  address: string;
};

type setLoadingPayload = boolean;

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTempUser: (state, action: PayloadAction<setTempUserPayload>) => {
      state.tempUser = {
        ...action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<setLoadingPayload>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setTempUser, setLoading} = globalSlice.actions;

export default globalSlice.reducer;
