import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubPageHeader from "../../components/Profile/SubPageHeader/SubPageHeader";
import { ProfileForm } from "../../components/ProfileForm";
import type { AppDispatch, RootState } from "../../store";
import { getInstitutionProfile } from "../../store/institutionSlice";

export default function ProfileEdit() {
  const dispatch = useDispatch<AppDispatch>();
  const { uid } = useSelector((state: RootState) => state.user);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.institution
  );

  useEffect(() => {
    if (uid) dispatch(getInstitutionProfile());
  }, [uid]);

  if (loading) return <p>Carregando dados da instituição...</p>;
  // if (error) return <p>Erro: {error}</p>;

  const isEditMode = !!data;

  return (
    <main className={"styles.edit"}>
      <SubPageHeader
        title={
          isEditMode
            ? "Editar Perfil Institucional"
            : "Cadastrar Perfil Institucional"
        }
      />
      <h2>{isEditMode ? "Modo de Edição" : "Novo Perfil Institucional"}</h2>
      <ProfileForm initialData={data} />
    </main>
  );
}
