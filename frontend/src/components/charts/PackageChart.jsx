import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function PackageChart({ highest, average }) {

  const data = {
    labels: ["Highest Package", "Average Package"],

    datasets: [
      {
        label: "Package (LPA)",
        data: [highest, average],
        backgroundColor: ["#22c55e", "#3b82f6"]
      }
    ]
  };

  return (

    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-lg font-semibold mb-2">
        Package Comparison
      </h2>

      <Bar data={data} />

    </div>

  );
}

export default PackageChart;