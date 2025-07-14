import React from 'react';
import { motion } from 'framer-motion';

const WoWCharacterProfileBatch = ({ selectedCharacter, onCharacterChange, allCharacterData, loading }) => {
  const characters = [
    { key: 'magicmushies', label: 'magicmushies', icon: '🍄', realm: 'Area 52' },
    { key: 'wtbarm', label: 'wtbarm', icon: '🌿', realm: "Mal'Ganis" },
    { key: 'leftylocs', label: 'leftylocs', icon: '⚔️', realm: 'Turalyon' }
  ];

  const characterData = allCharacterData?.[selectedCharacter];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 mt-4">Loading character data...</p>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Character data not available</p>
      </div>
    );
  }

  const factionColor = characterData.faction === 'Horde' ? 'text-red-500' : 'text-blue-500';
  const factionBgGradient = characterData.faction === 'Horde' 
    ? 'from-red-900/20 to-orange-900/20' 
    : 'from-blue-900/20 to-cyan-900/20';

  return (
    <div>
      {/* Character Selector */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {characters.map((char) => (
          <button
            key={char.key}
            onClick={() => onCharacterChange(char.key)}
            className={`w-48 h-32 flex flex-col items-center justify-center rounded-2xl border-2 transition-all transform hover:scale-105 ${
              selectedCharacter === char.key
                ? 'border-orange-500 bg-gradient-to-br from-orange-500/30 to-orange-600/20 text-white shadow-xl shadow-orange-500/20'
                : 'border-gray-700 bg-gray-800/30 backdrop-blur text-gray-400 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <span className="text-3xl mb-1">{char.icon}</span>
            <span className="font-bold text-base">{char.label}</span>
            <span className="text-xs text-gray-500">{char.realm}</span>
          </button>
        ))}
      </div>

      <motion.div 
        key={selectedCharacter}
        className={`max-w-5xl mx-auto bg-gradient-to-br ${factionBgGradient} rounded-2xl p-8 md:p-12 border border-gray-800 shadow-2xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Character Portrait */}
        <div className="relative flex-shrink-0">
          {characterData.renderUrl ? (
            <div className="relative">
              <img 
                src={characterData.renderUrl} 
                alt={characterData.name}
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <img 
                  src={characterData.renderUrl} 
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-xl bg-gray-800/50 flex items-center justify-center">
              <span className="text-8xl opacity-50">⚔️</span>
            </div>
          )}
          <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 ${factionColor} bg-gray-900 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-gray-800 shadow-xl`}>
            {characterData.level}
          </div>
        </div>

        {/* Character Info */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {characterData.name}
            </h2>
            <p className={`text-2xl ${factionColor} mb-2`}>
              Level {characterData.level} {characterData.race} {characterData.class}
            </p>
            <p className="text-xl text-gray-400">
              {characterData.realm} • <span className={factionColor}>{characterData.faction}</span>
            </p>
            
            {characterData.guild && (
              <p className="text-2xl text-orange-400 mt-3">
                &lt;{characterData.guild}&gt;
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl px-6 py-4 border border-gray-700/50">
              <span className="text-gray-400 text-sm uppercase tracking-wider">Item Level</span>
              <p className="text-purple-400 font-bold text-3xl mt-1">{characterData.itemLevel}</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl px-6 py-4 border border-gray-700/50">
              <span className="text-gray-400 text-sm uppercase tracking-wider">Achievement Points</span>
              <p className="text-yellow-400 font-bold text-3xl mt-1">{characterData.achievementPoints.toLocaleString()}</p>
            </div>
          </div>

          {characterData.lastLogin && (
            <p className="text-gray-500 text-sm">
              Last seen: {new Date(characterData.lastLogin).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default WoWCharacterProfileBatch;