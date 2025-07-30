import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
        borderColor: "var(--color-white)",
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
        ticks: { color: "var(--color-white)" },
        grid: { color: "var(--color-text)" },
      },
      x: {
        ticks: { color: "var(--color-text)" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        labels: { color: "var(--color-text)" },
      },
    },
  };

  return (
    <div
      style={{
        height: "200px",
        width: "100%",
        border: "2px solid #fff",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}
