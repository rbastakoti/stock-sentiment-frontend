'use client';

import { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSendMessage = async () => {
    if (!message.trim()) return; 

    
    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: message }]);
    setMessage('');
    setIsLoading(true); 

    try {
  
      const response = await axios.get(
        `https://daily-stock-api-acd9dvgvbhauawe9.centralus-01.azurewebsites.net/sentiment/chat/${encodeURIComponent(message)}`
      );
      const sentiment = response.data.response || 'Sorry, I couldn’t find an answer for that.';

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: sentiment },
      ]);
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat for Sentiment Analysis</h2>

      <div className="space-y-4 mb-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}
          >
            <strong>{msg.type === 'user' ? 'You' : 'RAG'}:</strong> {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-100 text-gray-900 flex items-center">
            <strong>RAG:</strong>
            <div className="ml-2 animate-spin rounded-full border-t-2 border-blue-500 border-solid w-4 h-4"></div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          className="border rounded p-2 w-full mr-2"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading} // Disable input during loading
        />
        <button
          onClick={handleSendMessage}
          className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow transition-all ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
