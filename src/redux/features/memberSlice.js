import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  superhero: "",
  id: "",
  isLoading: true,
  isError: false,
  error: false,
};

const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {
    removeMember: (state) => {
      state.name = "";
      state.superhero = "";
      state.id = "";
    },
  },
});

export const { removeMember } = memberSlice.actions;

export default memberSlice.reducer;
