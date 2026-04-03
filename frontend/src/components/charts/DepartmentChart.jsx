import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function DepartmentChart({ data }) {

  const chartData = {
    labels: data.map(d => d.department),
    datasets: [
      {
        label: "Placed Students",
        data: data.map(d => d.placed),
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return (

    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-lg font-semibold mb-2">
        Department Placements
      </h2>

      <Bar data={chartData} />

    </div>
  );
}

export default DepartmentChart;