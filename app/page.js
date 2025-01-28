'use client';

import { useState } from 'react';
import StockLiveChart from './components/StockLiveChart';
import ChatBox from './components/ChatBox';  // Import the ChatBox component

const MainPage = () => {
  const [showChart, setShowChart] = useState(false); 

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Stock Analyzer</h1>
      <p className="mb-8 text-lg">Monitor live prices of top stocks in real-time and their sentiments.</p>
      
      <button
        onClick={() => setShowChart(!showChart)} 
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all mb-6"
      >
        {showChart ? 'Hide Live Chart' : 'Go to Live Chart'}
      </button>

      <div className="flex space-x-6 justify-center mt-6">
        {/* Conditionally render StockLiveChart */}
        {showChart && (
          <div className="flex-1">
            <StockLiveChart />
          </div>
        )}

        {/* ChatBox Component */}
        <div className="flex-2">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
