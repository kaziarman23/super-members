import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
  isError: false,
  error: false,
};

// create user with email
export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    console.log(data);
    return {
      name: data.user.displayName,
      email: data.user.email,
    };
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = false;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;