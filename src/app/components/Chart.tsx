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
    labels: heartRate.map(
      (data) => new Date(data.timestamp).toLocaleTimeString(),
      { hour: '2-digit', minute: '2-digit', second: '2-digit' },
    ),
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRate.map((data) => data.heartRate),
        fill: 'origin',
        backgroundColor: 'rgba(75, 192, 192, 0.831)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Heart Rate (BPM)',
        },
        suggestedMin: 50,
        suggestedMax: 120,
      },
    },
    animation: {
      duration: 500,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-[420px] h-[420px]">
      <Line data={data} options={options} height={30} width={30} />
    </div>
  );
};

export default Chart;
