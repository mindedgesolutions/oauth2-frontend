import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {} as UserProps | null,
  chatUsers: [] as UserProps[],
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
    setChatUsers: (state, action) => {
      state.chatUsers = action.payload;
    },
  },
});
export const { setCurrentUser, unsetCurrentUser, setChatUsers } =
  commonSlice.actions;
export default commonSlice.reducer;
