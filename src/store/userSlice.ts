import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUid, removeUid, saveUid } from "../utils/storage";

// Cria um slice de estado chamado "user" para controlar informações de autenticação e carregamento.
// Usa Redux Toolkit para simplificar a criação de reducers e ações.

interface UserState {
  uid: string | null; // ID do usuário autenticado. `null` indica que não há usuário logado.
  loading: boolean | null; // Indica se o app está em estado de carregamento. `null` pode representar estado inicial indefinido.
}

// Estado inicial do slice.
// Recupera o `uid` salvo no armazenamento local, se existir, e define `loading` como true.
const initialState: UserState = {
  uid: getUid(), // Obtido via utilitário local
  loading: true, // Começa como carregando
};

export const userSlice = createSlice({
  name: "user", // Nome do slice
  initialState, // Estado inicial definido acima
  reducers: {
    // Define o `uid` do usuário e salva essa informação no armazenamento local
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
      saveUid(action.payload); // Persistência no storage
    },

    // Limpa o `uid` do estado e do armazenamento local
    clearUid(state) {
      state.uid = null;
      removeUid(); // Remove do storage
    },

    // Atualiza o status de carregamento (`true` ou `false`)
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// Exporta as ações para serem usadas em outras partes da aplicação
export const { setUid, clearUid, setLoading } = userSlice.actions;

// Exporta o reducer para ser incluído na store Redux
export default userSlice.reducer;
