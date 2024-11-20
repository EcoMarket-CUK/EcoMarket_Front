import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionChart = ({ transactionVolume, bidHistory }) => {
  const chartData = {
    labels: transactionVolume.map((item) => item.date),
    datasets: [
      {
        label: '거래량',
        data: transactionVolume.map((item) => item.volume),
        backgroundColor: '#ff5252',
        borderRadius: 5, // 막대의 모서리를 둥글게 설정
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true, // 툴팁을 활성화
        mode: 'index', // 터치 시 막대별로 값 표시
        intersect: false, // 터치 지점 근처의 모든 데이터 표시
        callbacks: {
          label: function (context) {
            // 툴팁에 표시될 텍스트 형식을 지정합니다.
            return `${context.dataset.label}: ${context.raw}개`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category', // 'category' 스케일을 명확하게 지정
        grid: { display: false },
        ticks: {
          display: true,
          maxRotation: 0, // 텍스트 회전을 방지하여 수평으로 표시
          minRotation: 0,
          color: '#000000', // x축 날짜 색상을 검은색으로 설정
          
        },
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };
  

  return (
    <div className="detail-transaction-container">
      <h3 className="section-title">거래량</h3>
      <div className="transaction-chart">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <h3 className="section-title">입찰 내역</h3>
      <div className="bid-history">
        {bidHistory.map((bid, index) => (
          <div key={index} className="bid-row">
            <span className="bid-amount">{`${bid.date} ${bid.time}`}</span>
            <span className="bid-amount">{bid.amount.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionChart;
