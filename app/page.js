'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('https://daily-stock-api-acd9dvgvbhauawe9.centralus-01.azurewebsites.net/stocks');
        const data = await response.json();
        const formattedData = Object.keys(data).map((symbol) => {
          const latest = data[symbol][data[symbol].length - 1];
          return {
            symbol,
            price: latest.price,
            open: latest.open,
          };
        });
        setStockData(formattedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    
    fetchStockData();
    const interval = setInterval(fetchStockData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 relative">
      {/* Stock Ticker - Top */}
      <div className="absolute top-0 left-0 w-full bg-gray-800 py-2 overflow-hidden">
        <div className="flex space-x-16 animate-marquee whitespace-nowrap px-4">
          {stockData.map((stock, index) => (
            <span key={index} className={`text-sm font-semibold ${stock.price < stock.open ? 'text-red-400' : 'text-green-400'}`}>
              {stock.symbol}: <span className="ml-4">${stock.price.toFixed(2)}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <motion.h1 
        className="text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        AI-Powered Stock Sentiment Analyzer
      </motion.h1>
      
      <motion.p 
        className="text-lg mb-6 max-w-3xl text-center text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Get real-time insights on stock market sentiment from news and social media. 
        Chat with our AI-powered assistant to analyze trends and make informed investment decisions.
      </motion.p>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
        {[
          { title: "📈 Live Stock Prices", text: "Track real-time daily stock price movements." },
          { title: "🗞️ Sentiment from News & Social Media", text: "See how the market feels about stocks this week." },
          { title: "🤖 AI Chatbot", text: "Ask our chatbot for instant stock sentiment insights." }
        ].map((feature, index) => (
          <motion.div 
            key={index} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400">{feature.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link href="/dashboard">
          <button className="bg-green-500 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105">
            Explore the Dashboard
          </button>
        </Link>
      </motion.div>

      {/* Stock Ticker - Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-gray-800 py-2 overflow-hidden">
        <div className="flex space-x-16 animate-marquee whitespace-nowrap px-4">
          {stockData.map((stock, index) => (
            <span key={index} className={`text-sm font-semibold ${stock.price < stock.open ? 'text-red-400' : 'text-green-400'}`}>
              {stock.symbol}: <span className="ml-4">${stock.price.toFixed(2)}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
