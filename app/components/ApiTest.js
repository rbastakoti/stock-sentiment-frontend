'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const StockDataTest = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/quote', {
          params: {
            symbol: 'AAPL',  // Example stock symbol (Apple)
            token: process.env.NEXT_PUBLIC_FINNHUB_API_KEY,
          },
        });
        setStockData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Stock Data for AAPL</h3>
      <p>Current Price: ${stockData?.c}</p>
      <p>High Price: ${stockData?.h}</p>
      <p>Low Price: ${stockData?.l}</p>
      <p>Open Price: ${stockData?.o}</p>
      <p>Previous Close: ${stockData?.pc}</p>
    </div>
  );
};

export default StockDataTest;