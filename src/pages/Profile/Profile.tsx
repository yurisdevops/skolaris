import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InstitutionDetails from "../../components/Profile/InstitutionDetails/InstitutionDetails";
import InstitutionHeader from "../../components/Profile/InstitutionHeader/InstitutionHeader";
import InstitutionStats from "../../components/Profile/InstitutionStats/InstitutionStats";
import ProfileActions from "../../components/Profile/ProfileActions/ProfileActions";
import ResponsibleCard from "../../components/Profile/ResponsibleCard/ResponsibleCard";
import type { AppDispatch, RootState } from "../../store";
import { getInstitutionProfile } from "../../store/institutionSlice";
import styles from "./Profile.module.scss";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.institution);

  useEffect(() => {
    dispatch(getInstitutionProfile());
  }, []);
  return (
    <main className={styles.profile}>
      {/* <ProfileForm /> */}
      <InstitutionHeader
        name={data?.name ?? ""}
        acronym={data?.acronym}
        type={data?.type ?? ""}
        modality={data?.modality ?? ""}
        status="ativo"
        logoUrl="/images/escola.webp"
      />
      <div className={styles.info}>
        <InstitutionDetails
          cnpj={data?.cnpj ?? ""}
          foundingYear={data?.foundedYear ?? 0}
          modality={data?.modality ?? ""}
          email={data?.email ?? ""}
          phone={data?.phone ?? ""}
          address={{
            cep: data?.zipCode ?? "",
            city: data?.city ?? "",
            state: data?.state ?? "",
          }}
        />

        <ResponsibleCard
          name={data?.responsible.name ?? ""}
          position={data?.responsible.role ?? ""}
          email={data?.responsible.email ?? ""}
          phone={data?.responsible.phone ?? ""}
        />
      </div>
      <InstitutionStats
        students={0}
        teachers={0}
        classes={0}
        attendanceRate={0}
        performanceScore={0}
        lastUpdated={""}
      />
      <ProfileActions />
    </main>
  );
}
