import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  institutionSchema,
  type institutionData,
} from "../schemas/profileSchema";
import auth from "../services/auth/auth";
import db from "../services/firestore/firestore";

interface InstitutionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  name: string | null;
  data: institutionData | null;
}

export const updateInstitutionProfile = createAsyncThunk(
  "institution/updateProfile",
  async (data: institutionData, _thunkAPI) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    await setDoc(
      doc(db, "escolas", uid),
      {
        uid,
        dadosGerais: data,
        perfilCompleto: true,
      },
      { merge: true }
    );
    return uid;
  }
);

export const getNameInstitution = createAsyncThunk(
  "institution/nameInstitution",
  async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    const escolaRef = doc(db, "escolas", uid);
    const escolaSnap = await getDoc(escolaRef);

    if (escolaSnap.exists()) {
      const response = escolaSnap.data();
      return response.dadosGerais.acronym;
    }

    throw new Error("Escola não encontrada");
  }
);

export const getInstitutionProfile = createAsyncThunk(
  "institution/getProfile",
  async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    const docRef = doc(db, "escolas", uid);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) throw new Error("Perfil não encontrado");

    const raw = snapshot.data()?.dadosGerais;
    const result = institutionSchema.safeParse(raw);

    if (!result.success) throw result.error;
    return result.data;
  }
);

const initialState: InstitutionState = {
  loading: false,
  success: false,
  error: null,
  name: null,
  data: null,
};

const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateInstitutionProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNameInstitution.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstitutionProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInstitutionProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        getNameInstitution.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.success = true;
          state.name = action.payload;
        }
      )
      .addCase(
        getInstitutionProfile.fulfilled,
        (state, action: PayloadAction<institutionData>) => {
          state.loading = false;
          state.success = true;
          state.data = action.payload;
        }
      )
      .addCase(updateInstitutionProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao salvar perfil";
      })
      .addCase(getNameInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao capturar o nome";
      })
      .addCase(getInstitutionProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar perfil";
      });
  },
});

export const { resetStatus } = institutionSlice.actions;
export default institutionSlice.reducer;
