import styles from "./ResponsibleCard.module.scss";

interface ResponsibleCardProps {
  name: string;
  position: string;
  email: string;
  phone: string;
}

export default function ResponsibleCard({
  email,
  name,
  phone,
  position,
}: ResponsibleCardProps) {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Responsável Legal</h3>
      <div className={styles.info}>
        <p>
          <strong>Nome:</strong> {name}
        </p>
        <p>
          <strong>Cargo:</strong> {position}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Telefone:</strong> {phone}
        </p>
      </div>
    </section>
  );
}
