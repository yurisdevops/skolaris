import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import db from "../services/firestore/firestore";

type managerUserProps = {
  fullName: string;
  role: string;
  email: string;
  phone: string;
};

interface ManagerUserState {
  loading: boolean; // Indica se há operação assíncrona em andamento.
  success: boolean; // Indica se a última operação foi concluída com sucesso.
  error: string | null; // Armazena mensagens de erro, se houver.
  data: managerUserProps[] | null; // Nome (sigla) da instituição.
}

export const getUsers = createAsyncThunk(
  "managerUser/getUsers",
  async (uid: string, _thunkAPI) => {
    if (!uid) throw new Error("UID não fornecido");
    const querySnapshot = await getDocs(
      collection(db, "escolas", uid, "professores")
    );

    const users: managerUserProps[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        fullName: data.fullName,
        role: data.role,
        email: data.email,
        phone: data.phone,
      });
    });
    return users;
  }
);

const initialState: ManagerUserState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const managerUserSlice = createSlice({
  name: "managerUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<managerUserProps[]>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload || null; // Armazena todos os usuários ou null se não houver
      }
    );
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Erro desconhecido";
    });
  },
});

export const managerUserReducer = managerUserSlice.reducer;
