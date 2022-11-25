import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function Charts({chartTitle,dataTitle,chartLabels,chartData,lineColor, barColor, type}){
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
      backgroundColor: barColor,
    },
  ],
};

if(type==="line"){return <Line options={options} data={data} />}
else {return <Bar options={options} data={data} />}
}
