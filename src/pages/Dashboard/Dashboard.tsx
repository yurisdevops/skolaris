import React, { Suspense } from "react";
import styles from "./Dashboard.module.scss";

const DashboardCard = React.lazy(
  () => import("../../components/Dashboard/DashboardCards")
);

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <br />
      <Suspense fallback={<div className={styles.cardSkeleton} />}>
        <DashboardCard title="Atividade dos alunos" />
      </Suspense>
    </div>
  );
}
