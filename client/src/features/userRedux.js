import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    loginStart: (state) => {
      state.value.isFetching = true;
    },

    loginSucess: (state, action) => {
      state.value.isFetching = false;
      state.value.currentUser = action.payload;
      state.value.error = false;
    },

    loginFailure: (state, action) => {
      state.value.isFetching = false;
      state.value.error = true;
    },
  },
});

export const { loginSucess, loginStart, loginFailure } = userSlice.actions;
export default userSlice.reducer;
