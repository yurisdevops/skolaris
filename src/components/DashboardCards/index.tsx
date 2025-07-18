// DashboardCard.jsx
import MiniBarChart from "../BarChart/";
import styles from "./DashboardCard.module.scss";

type DashboardCardProps = {
  title: string;
};

export default function DashboardCard({ title }: DashboardCardProps) {
  return (
    <div className={styles.dashboardCard}>
      <h4>{title}</h4>
      <MiniBarChart />
    </div>
  );
}
