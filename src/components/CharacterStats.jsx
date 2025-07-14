import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CharacterStats = ({ selectedCharacter = 'magicmushies' }) => {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('CharacterStats: Fetching for character:', selectedCharacter);
    fetch(`/api/wow-character.json?character=${selectedCharacter}&t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setCharacterData(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch character data:', err);
        setLoading(false);
      });
  }, [selectedCharacter]);

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
    >
      {loading ? (
        <div className="col-span-full text-center text-gray-400">
          Loading character data...
        </div>
      ) : (
        defaultStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
        >
          <h4 className="text-gray-400 text-sm mb-2">{stat.label}</h4>
          <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default CharacterStats;