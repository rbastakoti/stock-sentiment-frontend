'use client';

import { useState } from 'react';
import StockLiveChart from '../components/StockLiveChart';
import ChatBox from '../components/ChatBox';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Dashboard = () => {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center">
      {/* Header Section */}
      <Link href="/" passHref>
        <motion.h1
          className="text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Stock Analyzer
        </motion.h1>
      </Link>

      <motion.p 
        className="mb-6 text-lg text-gray-300 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Monitor live stock prices and real-time sentiment analysis powered by AI.
      </motion.p>

      {/* Button Group (Toggle & Sentiment Graph) */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Toggle Live Chart Button */}
        <button
          onClick={() => setShowChart(!showChart)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
        >
          {showChart ? 'Hide Live Chart' : 'Show Live Chart'}
        </button>

        {/* Sentiment Graph Button */}
        <Link href="/sentimentgraph">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            View Sentiment Graph
          </button>
        </Link>
      </motion.div>

      {/* Dashboard Layout */}
      <motion.div 
        className="w-full flex flex-col md:flex-row gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {showChart && (
          <motion.div 
            className="bg-gray-800 p-3 rounded-lg shadow-lg w-full md:w-3/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StockLiveChart />
          </motion.div>
        )}

        <motion.div 
          className="bg-gray-800 p-3 rounded-lg shadow-lg w-full md:w-2/5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChatBox />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
