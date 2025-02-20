'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockLiveChart = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState([]);

  const stocks = [
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'GOOGL', name: 'Google' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'TSLA', name: 'Tesla' }
  ];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://daily-stock-api-acd9dvgvbhauawe9.centralus-01.azurewebsites.net/stocks'
        );
        setStockData(response.data[selectedStock] || []);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [selectedStock]);

  const chartData = {
    labels: stockData.map((data) => new Date(data.timestamp * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: `${selectedStock} Price`,
        data: stockData.map((data) => data.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow flexible height
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Live Stock Prices for ${selectedStock}` }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg w-full flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl font-bold text-white">Live Stock Chart</h1>
        <div>
          <label htmlFor="stock" className="mr-2 text-white font-semibold">
            Stock:
          </label>
          <select
            id="stock"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 px-2 py-1 rounded-lg shadow-sm hover:border-gray-400 transition-all"
          >
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.name} ({stock.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gray-900 shadow-lg rounded-xl flex-grow">
        <div className="p-2 h-[400px] md:h-[500px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StockLiveChart;
