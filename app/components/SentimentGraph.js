'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell } from "recharts";

const sentimentData = {'Nvidia': {'avg_sentiment': -0.06336758874356746,
    'related_entities': {'Motley Fool': -0.013740393248471346,
     'Motley Fool Stock Advisor': 0.009525795416398482,
     'Meta Platforms': 0.03953132232030233,
     'Stock Advisor': -0.023252973189720742}},
   'Netflix': {'avg_sentiment': 0.3642516170556729,
    'related_entities': {'Stock Advisor': 0.0,
     'Motley Fool': 0.0,
     'Netflix, Inc': 0.44507892692790313,
     'Zacks': 0.32051401478903635}},
   'Apple': {'avg_sentiment': 0.0045412385966195614,
    'related_entities': {'Apple Intelligence': -0.17529301285743715,
     'Stock Advisor': 0.0,
     'Motley Fool': 0.0,
     'Meta Platforms': 0.03192128028188433}},
   'DeepSeek': {'avg_sentiment': -0.013078742425906488,
    'related_entities': {'OpenAI': -0.029485131551822027,
     'Cha': -0.1949508888968106,
     'CNBC': 0.4437209503217177,
     'DeepS': 0.19760173559188843}},
   'Google': {'avg_sentiment': 0.1721001016330554,
    'related_entities': {'Motley Fool': 0.0,
     'Meta Platforms': 0.12276029840428779,
     'GO': 0.24750104317298302,
     'Zacks': 0.08642532122440827}},
   'Microsoft': {'avg_sentiment': 0.1504667643523469,
    'related_entities': {'OpenAI': 0.05273033784968512,
     'Meta Platforms': 0.010795593846078012,
     'Motley Fool': 0.0,
     'MS': 0.14667983635051832}},
   'Tesla': {'avg_sentiment': -0.06696115152112075,
    'related_entities': {'El': -0.14568509374346053,
     'Meta Platforms': 0.05671918910482655,
     'Elon Musk': -0.013008930466391823,
     'Musk': 0.0904618689888402}},
   'Meta': {'avg_sentiment': 0.25496466819815305,
    'related_entities': {'Meta Platforms': 0.24742236056111075,
     'Meta Platforms, Inc': 0.3261064210453549,
     'Motley Fool': 0.0,
     'In': 0.02847848976812055}},
   'Amazon': {'avg_sentiment': 0.13941349180893786,
    'related_entities': {'Motley Fool': 0.0,
     'UPS': -0.545666862101782,
     'Whole Foods Market': 0.0,
     'Meta Platforms': 0.02444988489151001}},
   'Disney': {'avg_sentiment': 0.14863656187942456,
    'related_entities': {'Fubo': -0.08325296193361283,
     'Zacks': 0.06654058396816254,
     'ESPN': 0.08845680182979952,
     'Warner Bros. Discovery': -0.070433376232783}}};

     const getColor = (score) => {
        if (score > 0.4) return '#1B5E20'; // Dark Green (High Positive)
        if (score > 0.05) return '#66BB6A'; // Light Green (Low Positive)
        if (score < -0.3) return '#B71C1C'; // Dark Red (High Negative)
        if (score < -0.05) return '#E53935'; // Light Red (Low Negative)
        return '#FFB300'; // Yellow (Neutral)
      };
      
      const SentimentGraph = () => {
        const [hoveredEntity, setHoveredEntity] = useState(null);
        const [mounted, setMounted] = useState(false);
      
        useEffect(() => {
          setMounted(true);
        }, []);
      
        if (!mounted) return <div className="text-white text-center">Loading...</div>;
      
        return (
            <div className="flex flex-wrap justify-center gap-8 transition-opacity duration-300">
            {Object.entries(sentimentData).map(([entity, { avg_sentiment, related_entities }]) => (
                <div
                    key={entity}
                    className={`relative flex flex-col items-center transition-opacity duration-300 ${hoveredEntity && hoveredEntity !== entity ? "opacity-10" : "opacity-100"} ${hoveredEntity === entity ? "scale-110" : ""}`}
                    onMouseEnter={() => setHoveredEntity(entity)}
                    onMouseLeave={() => setHoveredEntity(null)}
                >
                {/* Avoid hydration mismatch by rendering charts only after mount */}
                {mounted && (
                  <PieChart width={80} height={80}>
                    <Pie
                      data={[{ value: 100 }]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      fill={getColor(avg_sentiment)}
                      stroke="none"
                    />
                  </PieChart>
                )}
                <p className="text-white text-sm text-center mt-1">{entity}</p>
      
                {/* Show related entities when hovering */}
                {hoveredEntity === entity && (
                  <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        >
                        {Object.entries(related_entities).map(([related, sentiment], index) => {
                            const angle = (index / Object.keys(related_entities).length) * (2 * Math.PI);
                            const x = Math.cos(angle) * 80; 
                            const y = Math.sin(angle) * 80 - 10;
                    
                            return (
                            <div
                                key={related}
                                className="absolute"
                                style={{
                                transform: `translate(${x}px, ${y}px)`,
                                }}
                            >
                                <PieChart width={40} height={40}>
                                <Pie
                                    data={[{ value: 100 }]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={10}
                                    outerRadius={20}
                                    fill={getColor(sentiment)}
                                    stroke="none"
                                    isAnimationActive={true}
                                />
                                </PieChart>
                                <p className="absolute left-1/2 transform -translate-x-1/2 text-white text-xs whitespace-nowrap">
                                {related}
                                </p>
                            </div>
                            );
                        })}
                    </motion.div> 
                )}
              </div>
            ))}
          </div>
        );
      };
      
      export default SentimentGraph;