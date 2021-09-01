import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountState {
  count: number;
}

export const initialState: CountState = {
  count: 0,
};

const slice = createSlice({
  name: 'pickCount',
  initialState,
  reducers: {
    setPickCount: (state, action: PayloadAction<{ count: number }>) => {
      state.count = action.payload.count;
    },
    clearPickCount: (state) => {
      state.count = 0;
    },
    increaseCount: (state) => {
      state.count += 1;
    },
    decreaseCount: (state) => {
      state.count -= 1;
    },
  },
});

export default slice.reducer;

export const { setPickCount, clearPickCount, increaseCount, decreaseCount } = slice.actions;
