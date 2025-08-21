import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubPageHeader from "../../components/Profile/SubPageHeader/SubPageHeader";
import { useAuthState } from "../../hooks/useAuthState";
import type { AppDispatch, RootState } from "../../store";
import { getUsers } from "../../store/mangerUserSlice";

export default function UsersManage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.managerUser.data);
  const loading = useSelector((state: RootState) => state.managerUser.loading);
  const { uid } = useAuthState();

  useEffect(() => {
    async function fetchUsers() {
      if (uid) {
        try {
          const result = await dispatch(getUsers(uid)).unwrap();
          console.log("Usuários encontrados:", result);
        } catch (err) {
          console.error("Erro ao buscar usuários:", err);
        }
      }
    }

    fetchUsers();
  }, [uid, dispatch]);

  return (
    <main className={"styles.users"}>
      <SubPageHeader title="Gestão de Usuários" />
      <h2>Usuários Vinculados</h2>

      {users && users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>{user.fullName}</strong> — {user.role}
              <br />
              📧 {user.email} | 📞 {user.phone}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Nenhum usuário vinculado encontrado.</p>
      )}
    </main>
  );
}
