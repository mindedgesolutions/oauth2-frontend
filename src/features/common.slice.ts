import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {} as UserProps | null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    unsetCurrentUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
    },
  },
});
export const { setCurrentUser, unsetCurrentUser } = commonSlice.actions;
export default commonSlice.reducer;
