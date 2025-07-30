import { useSelector } from "react-redux";
import type { RootState } from "../store";

// Hook personalizado que retorna o estado atual do usuário autenticado.
// Utiliza o Redux para acessar o estado global da aplicação.

export function useAuthState() {
  // `useSelector` acessa o slice `user` da store Redux.
  // O tipo `RootState` garante que a estrutura do estado esteja correta.
  return useSelector((state: RootState) => state.user);
}
