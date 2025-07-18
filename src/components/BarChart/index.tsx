// MiniBarChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

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
      max: maiorValor, // agora o topo é o maior valor
      ticks: {
        stepSize: 20,
      },
    },
  },
};

export default function MiniBarChart() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
