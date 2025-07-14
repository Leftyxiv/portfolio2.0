import React from 'react';
import { motion } from 'framer-motion';

const AchievementsSection = ({ selectedCharacter, characterData }) => {
  // Define static notable achievements that don't change
  const notableAchievements = [
    {
      icon: '⚔️',
      title: 'High Warlord',
      description: 'MoP RBG Legend',
      color: 'red'
    },
    {
      icon: '🏆',
      title: '6x Cutting Edge',
      description: '3 US Top 100 Kills',
      color: 'purple'
    },
    {
      icon: '💕',
      title: 'Married My Pocket Healer',
      description: 'Best Achievement Ever',
      color: 'pink'
    }
  ];

  const colorClasses = {
    red: 'from-red-600 to-red-800 hover:border-red-500/50 text-red-400',
    purple: 'from-purple-600 to-purple-800 hover:border-purple-500/50 text-purple-400',
    pink: 'from-pink-600 to-pink-800 hover:border-pink-500/50 text-pink-400',
    green: 'from-green-600 to-green-800 hover:border-green-500/50 text-green-400',
    orange: 'from-orange-600 to-orange-800 hover:border-orange-500/50 text-orange-400',
    blue: 'from-blue-600 to-blue-800 hover:border-blue-500/50 text-blue-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notableAchievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex gap-4 items-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 ${colorClasses[achievement.color].split(' ').slice(2).join(' ')}`}
        >
          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${colorClasses[achievement.color].split(' ').slice(0, 2).join(' ')} flex items-center justify-center text-3xl flex-shrink-0`}>
            {achievement.icon}
          </div>
          <div>
            <h4 className={`text-lg font-bold ${colorClasses[achievement.color].split(' ').pop()}`}>
              {achievement.title}
            </h4>
            <p className="text-gray-400">{achievement.description}</p>
          </div>
        </motion.div>
      ))}
      
      {/* Shared achievement points display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: notableAchievements.length * 0.1 }}
        className="flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 md:col-span-2 lg:col-span-3"
      >
        <span className="text-6xl mb-2">🏅</span>
        <h4 className="text-2xl font-bold text-yellow-400">
          {characterData?.achievementPoints?.toLocaleString() || '0'} Points
        </h4>
        <p className="text-gray-400">Total Achievement Points</p>
        {characterData?.achievements?.totalAchievements && (
          <p className="text-sm text-gray-500 mt-1">
            {characterData.achievements.totalAchievements.toLocaleString()} achievements earned
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AchievementsSection;