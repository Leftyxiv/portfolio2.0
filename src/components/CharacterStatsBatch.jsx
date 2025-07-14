import React from 'react';
import { motion } from 'framer-motion';

const CharacterStatsBatch = ({ selectedCharacter, characterData }) => {
  // Default stats for display
  const defaultStats = [
    { label: 'Level', value: characterData?.level || '70', color: 'text-yellow-400' },
    { label: 'Item Level', value: characterData?.itemLevel || '450', color: 'text-purple-400' },
    { label: 'Achievement Points', value: characterData?.achievementPoints?.toLocaleString() || '15,230', color: 'text-green-400' },
    { label: 'Class', value: characterData?.class || 'Warrior', color: 'text-red-400' },
    { label: 'Race', value: characterData?.race || 'Orc', color: 'text-orange-400' },
    { label: 'Guild', value: characterData?.guild || 'For the Horde', color: 'text-blue-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={selectedCharacter}
    >
      {defaultStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
        >
          <h4 className="text-gray-400 text-sm mb-2">{stat.label}</h4>
          <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CharacterStatsBatch;