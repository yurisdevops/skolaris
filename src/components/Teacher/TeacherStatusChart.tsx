import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./TeacherControls.module.scss";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TeacherStatusProps {
  data: {
    professores: number;
    coordenadores: number;
    inativos: number;
  };
}
export function TeacherStatusChart({ data }: TeacherStatusProps) {
  const chartData = {
    labels: ["Professores", "Coordenadores", "Inativos"],
    datasets: [
      {
        label: "Distribuição de cargos",
        data: [data.professores, data.coordenadores, data.inativos],
        backgroundColor: ["#00c6ff", "#0072ff", "#666"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#ffffffff" },
        grid: {
          color: "#ffffffff",
        },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#ffffffff" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#ffffff" },
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
