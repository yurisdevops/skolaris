import styles from "./InstitutionDetails.module.scss";

interface InstitutionDetailsProps {
  cnpj: string;
  foundingYear: number;
  modality: string;
  email: string;
  phone: string;
  address: {
    cep: string;
    city: string;
    state: string;
  };
}

export default function InstitutionDetails({
  address,
  cnpj,
  email,
  foundingYear,
  modality,
  phone,
}: InstitutionDetailsProps) {
  return (
    <section className={styles.detailsContainer}>
      <p>
        <strong>CNPJ:</strong> {cnpj}
      </p>
      <p>
        <strong>Fundção:</strong> {foundingYear}
      </p>
      <p>
        <strong>Modalidade:</strong> {modality}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Telefone:</strong>
        {phone}
      </p>
      <p>
        <strong>Endereço:</strong> {address.city} - {address.state}, CEP
        {address.cep}
      </p>
    </section>
  );
}
