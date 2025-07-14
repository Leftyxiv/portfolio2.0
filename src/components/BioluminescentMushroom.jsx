import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BioluminescentMushroom = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-48 h-48 lg:w-64 lg:h-64">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovered
            ? '0 0 80px 40px rgba(0, 255, 148, 0.6)'
            : '0 0 40px 20px rgba(0, 255, 148, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Mushroom SVG */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Mushroom cap */}
        <motion.path
          d="M100 40 C130 40, 160 60, 160 90 C160 100, 150 110, 140 115 L60 115 C50 110, 40 100, 40 90 C40 60, 70 40, 100 40"
          fill="url(#capGradient)"
          filter="url(#glow)"
          animate={{
            fill: isHovered ? "url(#capGradientHover)" : "url(#capGradient)",
          }}
        />
        
        {/* Mushroom spots */}
        <circle cx="80" cy="70" r="8" fill="rgba(255, 255, 255, 0.7)" />
        <circle cx="120" cy="75" r="6" fill="rgba(255, 255, 255, 0.7)" />
        <circle cx="100" cy="60" r="10" fill="rgba(255, 255, 255, 0.7)" />
        
        {/* Mushroom stem */}
        <motion.rect
          x="85"
          y="110"
          width="30"
          height="50"
          rx="10"
          fill="#FFF4E6"
          filter="url(#stemGlow)"
        />
        
        {/* Spore particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={85 + i * 10}
            cy={160}
            r="2"
            fill="#00FF94"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-20, -80, -140],
              x: [0, (i - 2) * 10, (i - 2) * 20],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#6B46C1" />
          </linearGradient>
          
          <linearGradient id="capGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF94" />
            <stop offset="50%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="stemGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    </div>
  );
};

export default BioluminescentMushroom;