import styles from "./InstitutionHeader.module.scss";

interface InstitutionHeaderProps {
  logoUrl?: string;
  name: string;
  acronym?: string;
  type: string;
  modality: string;
  status?: "ativo" | "inativo" | "pendente";
}

const formatStatus = (status?: InstitutionHeaderProps["status"]) => {
  if (!status) return "Indefinido";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function InstitutionHeader({
  modality,
  name,
  type,
  acronym,
  logoUrl,
  status,
}: InstitutionHeaderProps) {
  return (
    <section className={styles.header}>
      <div className={styles.logoContainer}>
        {logoUrl ? (
          <img src={logoUrl} alt={`Logo ${name}`} className={styles.logo} />
        ) : (
          <div className={styles.placeholder}>📚</div>
        )}
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>
          {name}
          {acronym && <span className={styles.acronym}>({acronym})</span>}
        </h2>
        <p className={styles.meta}>
          {type} • {modality}
        </p>
        <span
          className={`${styles.status} ${
            status ? styles[status] : styles.indefinido
          }`}
        >
          {formatStatus(status)}
        </span>
      </div>
    </section>
  );
}
