import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export function Charts({chartTitle,dataTitle,chartLabels,chartData,lineColor}){
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: chartTitle,
    },
  },
};

const labels = chartLabels;

const data = {
  labels,
  datasets: [
    {
      label: dataTitle,
      data: chartData,
      borderColor: lineColor,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};


  return <Line options={options} data={data} />;
}
