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

// Define o formato do estado da instituição.
// Inclui indicadores de carregamento, sucesso, erro, nome da instituição e dados do perfil.
interface InstitutionState {
  loading: boolean; // Indica se há operação assíncrona em andamento.
  success: boolean; // Indica se a última operação foi concluída com sucesso.
  error: string | null; // Armazena mensagens de erro, se houver.
  name: string | null; // Nome (sigla) da instituição.
  data: institutionData | null; // Dados completos do perfil da instituição.
}

// Thunk que atualiza o perfil da instituição no Firestore.
// Recebe os dados e salva na coleção "escolas" com o uid do usuário.
// Retorna o uid após o salvamento.
export const updateInstitutionProfile = createAsyncThunk(
  "institution/updateProfile",
  async (data: institutionData, _thunkAPI) => {
    const user = auth.currentUser; // Obtém usuário atual do Firebase
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    await setDoc(
      doc(db, "escolas", uid), // Referência ao documento da instituição
      {
        uid,
        dadosGerais: data,
        perfilCompleto: true,
      },
      { merge: true } // Faz merge com dados existentes no Firestore
    );
    return uid;
  }
);

// Thunk que busca o nome (sigla) da instituição no Firestore.
// Retorna a sigla extraída de `dadosGerais.acronym`.
export const getNameInstitution = createAsyncThunk(
  "institution/nameInstitution",
  async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    const docRef = doc(db, "escolas", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const response = docSnap.data();
      return response.dadosGerais.acronym; // Retorna a sigla da instituição
    }

    throw new Error("Escola não encontrada");
  }
);

// Thunk que busca o perfil completo da instituição.
// Valida os dados usando o schema Zod.
// Retorna os dados se válidos, ou lança erro.
export const getInstitutionProfile = createAsyncThunk(
  "institution/getProfile",
  async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    const docRef = doc(db, "escolas", uid);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null; // <- perfil ainda não criado

    const raw = snapshot.data()?.dadosGerais;
    const result = institutionSchema.safeParse(raw);

    if (!result.success) throw result.error;
    return result.data;
  }
);

// Estado inicial do slice.
// Assume nenhum dado carregado, sem erros e ainda não carregando.
const initialState: InstitutionState = {
  loading: false,
  success: false,
  error: null,
  name: null,
  data: null,
};

// Criação do slice `institution` com Redux Toolkit.
// Inclui reducers sincronizados e integração com thunks assíncronos.
const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    // Reseta os indicadores de status (`loading`, `success`, `error`)
    resetStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Estados de carregamento quando cada thunk inicia
      .addCase(updateInstitutionProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNameInstitution.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstitutionProfile.pending, (state) => {
        state.loading = true;
      })

      // Quando o perfil for atualizado com sucesso
      .addCase(updateInstitutionProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.meta.arg; // Armazena o uid retornado
      })

      // Quando o nome da instituição for carregado com sucesso
      .addCase(
        getNameInstitution.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.success = true;
          state.name = action.payload;
        }
      )

      // Quando o perfil da instituição for carregado com sucesso
      .addCase(
        getInstitutionProfile.fulfilled,
        (state, action: PayloadAction<institutionData | null>) => {
          state.loading = false;
          state.success = true;
          state.data = action.payload; // pode ser null
        }
      )

      // Tratamento de erros em cada operação
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

// Exporta a action `resetStatus` para redefinir estado manualmente
export const { resetStatus } = institutionSlice.actions;

// Exporta o reducer para inclusão na store
export default institutionSlice.reducer;
