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

function DriveStudentChart({ drives, students }) {

  const data = {
    labels: ["Total Drives", "Total Students"],

    datasets: [
      {
        label: "Counts",
        data: [drives, students],
        backgroundColor: ["#6366f1", "#f59e0b"]
      }
    ]
  };

  return (

    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-lg font-semibold mb-2">
        Drives vs Students
      </h2>

      <Bar data={data} />

    </div>

  );
}

export default DriveStudentChart;