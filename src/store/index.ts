import { configureStore } from "@reduxjs/toolkit";
import userInstitution from "./institutionSlice";
import userMiddleware from "./middlewares/userMiddleware";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    institution: userInstitution,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
