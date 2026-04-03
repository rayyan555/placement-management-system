import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function DriveTimelineChart({ drives }) {

  const data = {
    labels: drives.map(d => d.driveDate),

    datasets: [
      {
        label: "Company Drives",

        data: drives.map((_, index) => index + 1),

        borderColor: "#6366f1",
        backgroundColor: "#6366f1",

        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (

    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-lg font-semibold mb-2">
        Drive Timeline
      </h2>

      <Line data={data} options={options} />

    </div>

  );
}

export default DriveTimelineChart;