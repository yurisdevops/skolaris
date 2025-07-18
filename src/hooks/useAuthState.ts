import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function useAuthState() {
  return useSelector((state: RootState) => state.user);
}
