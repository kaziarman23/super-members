import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import memberSlice from "./features/memberSlice";
import baseApi from "./features/api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    userSlice: userSlice,
    memberSlice: memberSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
