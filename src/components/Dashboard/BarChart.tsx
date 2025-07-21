import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./DashboardCard.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const valores = [65, 59, 80, 81];
const maiorValor = Math.max(...valores);

const data = {
  labels: ["Jan", "Fev", "Mar", "Abr"],
  datasets: [
    {
      data: valores,
      backgroundColor: valores.map((valor) =>
        valor === maiorValor ? "#ff6384" : "#4bc0c0"
      ),
      barThickness: 20,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: true },
    legend: { display: false },
  },
  scales: {
    x: { display: false },
    y: {
      beginAtZero: true,
      max: maiorValor,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

export default function MiniBarChart() {
  return (
    <div className={styles.miniBar}>
      <Bar data={data} options={options} />
    </div>
  );
}
