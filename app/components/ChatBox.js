'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hey there! I'm RAG, your stock-market sentiment assistant. Ask me about stock trends, market sentiment, or specific companies!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const playBotSound = () => {
    const audio = new Audio('/782969__qubodup__minimal-phone-notification-sound.wav');
    audio.play().catch((err) => console.error('Error playing sound:', err));
  };

  useEffect(() => {
    const faqTimer = setTimeout(() => {
      if (!userHasInteracted) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: 'bot',
            text: `🤔 If you're unsure what to ask, here are some common questions:
                  - "What is the latest sentiment on NVIDIA?"
                  - "How do people feel about Amazon stock?"
                  - "Is Meta a good investment based on sentiment?"
                      
                  Just type your question and I'll analyze it for you! 📈`,
          },
        ]);
        playBotSound()
      }
    }, 30000);

    return () => clearTimeout(faqTimer);
  }, [userHasInteracted]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: message }]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://daily-stock-api-acd9dvgvbhauawe9.centralus-01.azurewebsites.net/sentiment/chat/${encodeURIComponent(
          message
        )}`
      );
      const sentiment = response.data.response || 'Sorry, I couldn’t find an answer for that.';

      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: sentiment }]);
      playBotSound()

    } catch (error) {
      console.error('Error fetching sentiment:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Sorry, there was an error processing your request.' },
      ]);
      playBotSound()
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col">
      {/* Header */}
      <h2 className="text-xl font-bold text-white mb-4">Chat for Sentiment Analysis</h2>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto bg-gray-800 rounded-lg p-4 h-[350px] space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-sm max-w-[80%] ${
              msg.type === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-700 text-gray-200 self-start'
            }`}
          >
            <strong>{msg.type === 'user' ? 'You' : 'RAG'}:</strong> {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-700 text-gray-200 flex items-center">
            <strong>RAG:</strong>
            <div className="ml-2 animate-spin rounded-full border-t-2 border-blue-500 border-solid w-4 h-4"></div>
          </div>
        )}
      </div>

      {/* Input & Button */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow transition-all ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
