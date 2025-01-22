import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
);

const Chart = ({
  heartRate,
}: {
  heartRate: { timestamp: number; heartRate: number }[];
}) => {
  const data = {
    labels: heartRate.map((data) =>
      new Date(data.timestamp).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRate.map((data) => data.heartRate),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default Chart;
