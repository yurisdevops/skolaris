// Importa elementos essenciais do Chart.js para renderizar gráficos de barra
import {
  BarElement, // Responsável por renderizar cada barra do gráfico
  CategoryScale, // Escala para o eixo X (categorias)
  Chart as ChartJS,
  LinearScale, // Escala linear para o eixo Y
  Tooltip, // Exibe dicas ao passar o mouse
} from "chart.js";

import { Bar } from "react-chartjs-2"; // Componente React para renderizar gráfico de barras
import styles from "./DashboardCard.module.scss"; // Estilos específicos para o gráfico

// Registra os componentes e escalas necessários para o Chart.js funcionar corretamente
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// Array com os valores que serão exibidos no gráfico
const valores = [65, 59, 80, 81];

// Identifica o maior valor para destacar visualmente
const maiorValor = Math.max(...valores);

// Configuração dos dados para o gráfico de barras
const data = {
  labels: ["Jan", "Fev", "Mar", "Abr"], // Rótulos para o eixo X
  datasets: [
    {
      data: valores, // Dados usados nas barras
      backgroundColor: valores.map(
        (valor) => (valor === maiorValor ? "#ff6384" : "#4bc0c0") // Destaca a maior barra com cor diferente
      ),
      barThickness: 20, // Espessura das barras
    },
  ],
};

// Configurações visuais e funcionais do gráfico
const options = {
  responsive: true, // Adapta o tamanho do gráfico ao container
  maintainAspectRatio: false, // Permite altura fixa do container sem manter proporção
  plugins: {
    tooltip: { enabled: true }, // Habilita tooltip ao passar o mouse
    legend: { display: false }, // Remove legenda para simplificar visual
  },
  scales: {
    x: { display: false }, // Oculta o eixo X (apenas visual)
    y: {
      beginAtZero: true, // Eixo Y começa do zero
      max: maiorValor, // Define o limite máximo como o maior valor
      ticks: {
        stepSize: 20, // Intervalo entre os ticks (marcações no eixo Y)
      },
    },
  },
};

// Componente React que renderiza o gráfico de barras em miniatura
export default function MiniBarChart() {
  return (
    <div className={styles.miniBar}>
      <Bar data={data} options={options} />{" "}
      {/* Renderiza o gráfico com dados e opções */}
    </div>
  );
}
