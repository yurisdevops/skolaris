import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUid, removeUid, saveUid } from "../utils/storage";

interface UserState {
  uid: string | null;
  loading: boolean | null;
}

const initialState: UserState = {
  uid: getUid(),
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
      saveUid(action.payload);
    },
    clearUid(state) {
      state.uid = null;
      removeUid();
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUid, clearUid, setLoading } = userSlice.actions;
export default userSlice.reducer;
