import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  email: string;
  name: string;
  profile_image_url: string;
  role: string;
  thumbnail_image_url: string;
  user_id: number;
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
}

export const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export default slice.reducer;

export const { setUser, clearAuth } = slice.actions;
