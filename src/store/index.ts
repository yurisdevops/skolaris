// Cria e configura a store principal da aplicação usando Redux Toolkit.
// Define os reducers, aplica middlewares personalizados e exporta tipos para uso com TypeScript.

import { configureStore } from "@reduxjs/toolkit";
import userInstitution from "./institutionSlice"; // Reducer responsável pelos dados da instituição
import { managerUserReducer } from "./mangerUserSlice"; // Reducer para gerenciar usuários (professores, coordenadores, etc.)
import userMiddleware from "./middlewares/userMiddleware"; // Middleware personalizado (monitoramento, logs, etc.)
import teacherReducer from "./teacherSlice"; // Reducer para gerenciar dados do professor
import themeReducer from "./themeSlice"; // Reducer responsável pelo tema da aplicação
import userReducer from "./userSlice"; // Reducer responsável pelos dados de autenticação do usuário

// Configuração da store Redux principal
export const store = configureStore({
  reducer: {
    user: userReducer, // Slice 'user' com dados de autenticação
    institution: userInstitution, // Slice 'institution' com dados institucionais
    theme: themeReducer, // Slice 'theme' com dados de tema
    managerUser: managerUserReducer, // Slice 'managerUser' para gerenciar usuários
    teacher: teacherReducer, // Slice 'teacher' para gerenciar dados do professor
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userMiddleware), // Adiciona o middleware customizado à lista padrão
});

// Tipo que representa a estrutura completa do estado global da aplicação
export type RootState = ReturnType<typeof store.getState>;

// Tipo para a função de dispatch da store, usado com Thunks e actions
export type AppDispatch = typeof store.dispatch;
