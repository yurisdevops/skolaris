import styles from "./SummaryCards.module.scss";

interface SummaryCardProps {
  stats: {
    professores: number;
    coordenadores: number;
    inativos: number;
  };
}

export function SummaryCards({ stats }: SummaryCardProps) {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <h4>Ativos</h4>
        <span>{stats.professores}</span>
      </div>
      <div className={styles.card}>
        <h4>Coordenadores</h4>
        <span>{stats.coordenadores}</span>
      </div>
      <div className={styles.card}>
        <h4>Inativos</h4>
        <span>{stats.inativos}</span>
      </div>
    </div>
  );
}
