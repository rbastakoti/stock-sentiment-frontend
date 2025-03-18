"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SentimentGraph() {
  const [graphUrl, setGraphUrl] = useState("");
  const [isLegendVisible, setIsLegendVisible] = useState(false); // State to toggle visibility of the legend

  useEffect(() => {
    setGraphUrl(
      "https://daily-stock-api-acd9dvgvbhauawe9.centralus-01.azurewebsites.net/sentiment/get-graph"
    );
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 relative">
      {/* Heading */}
      <h1 className="text-xl font-bold text-blue-500 z-10 absolute top-4 left-4 p-1 border-2 border-blue-500 rounded-lg shadow-md bg-white">
        Stock Sentiment Network Graph
      </h1>

      {/* Graph */}
      <div className="w-full h-full absolute top-0 left-0">
        {graphUrl ? (
            <iframe
            src={graphUrl}
            className="w-full h-full border-none transform sm:scale-150 md:scale-100"
            title="Sentiment Graph"
            />
        ) : (
            <div className="flex items-center justify-center w-full h-full">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>
        )}
      </div>

      {/* Button (on right with left arrow) */}
      <Link href="/dashboard" passHref>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 z-10 absolute bottom-6 left-6 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-2 transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m7 7l-7-7 7-7"
            />
          </svg>
          Back to Chat
        </button>
      </Link>

      {/* Legends on the right */}
      <div
        className={`absolute top-1/4 right-6 bg-white p-4 rounded-lg shadow-lg text-black text-sm transition-all duration-300 ${
          isLegendVisible ? "w-72" : "w-16"
        } md:w-72`}
      >
        {/* Toggle button for mobile */}
        <button
          onClick={() => setIsLegendVisible(!isLegendVisible)}
          className="absolute top-0 left-0 p-2 bg-gray-200 rounded-full focus:outline-none md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isLegendVisible ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
            />
          </svg>
        </button>

        {/* Legend content */}
        <div className={`${isLegendVisible ? "block" : "hidden"} md:block`}>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-green-700 mr-2 rounded-full"></div>
            <span>High Positive Sentiment</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-green-300 mr-2 rounded-full"></div>
            <span>Mid Positive Sentiment</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-yellow-500 mr-2 rounded-full"></div>
            <span>Neutral Sentiment</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-red-400 mr-2 rounded-full"></div>
            <span>Mid Negative Sentiment</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-red-700 mr-2 rounded-full"></div>
            <span>High Negative Sentiment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
