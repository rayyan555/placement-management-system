import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PlacementChart({ placed, nonPlaced }) {

  const data = {
    labels: ["Placed Students", "Non-Placed Students"],
    datasets: [
      {
        data: [placed, nonPlaced],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">
        Placement Distribution
      </h2>

      <Pie data={data} />
    </div>
  );
}

export default PlacementChart;