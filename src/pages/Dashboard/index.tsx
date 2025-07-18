import DashboardCard from "../../components/DashboardCards";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <br />
      <DashboardCard title="Atividade dos alunos" />
    </div>
  );
}
