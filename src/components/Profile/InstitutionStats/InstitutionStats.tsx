import styles from "./InstitutionStats.module.scss";

interface InstitutionStatsProps {
  students: number;
  teachers: number;
  classes: number;
  attendanceRate: number;
  performanceScore: number;
  lastUpdated: string;
}

export default function InstitutionStats({
  attendanceRate,
  classes,
  lastUpdated,
  performanceScore,
  students,
  teachers,
}: InstitutionStatsProps) {
  return (
    <section className={styles.statsContainer}>
      <h3 className={styles.title}>Indicadores Institucionais</h3>
      <ul className={styles.statsList}>
        <li>
          <strong>Alunos:</strong> {students}
        </li>
        <li>
          <strong>Professores:</strong> {teachers}
        </li>
        <li>
          <strong>Turmas:</strong> {classes}
        </li>
        <li>
          <strong>Presença Média:</strong> {attendanceRate}%
        </li>
        <li>
          <strong>Desempenho Geral:</strong> {performanceScore.toFixed(1)}
        </li>
        <li>
          <strong>Última Atualização:</strong> {lastUpdated}
        </li>
      </ul>
    </section>
  );
}
