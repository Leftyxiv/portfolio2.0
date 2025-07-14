import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WoWCharacterProfile = ({ selectedCharacter = 'magicmushies', onCharacterChange }) => {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);

  const characters = [
    { key: 'magicmushies', label: 'magicmushies', icon: '🍄', realm: 'Area 52' },
    { key: 'wtbarm', label: 'wtbarm', icon: '🌿', realm: "Mal'Ganis" },
    { key: 'leftylocs', label: 'leftylocs', icon: '⚔️', realm: 'Turalyon' }
  ];

  useEffect(() => {
    console.log('Fetching character data for:', selectedCharacter);
    setLoading(true);
    const fetchUrl = `/api/wow-character.json?character=${selectedCharacter}&t=${Date.now()}`;
    console.log('Fetch URL:', fetchUrl);
    fetch(fetchUrl, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        console.log('Received data:', data);
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
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {characters.map((char) => (
          <button
            key={char.key}
            onClick={() => {
              console.log('Button clicked for:', char.key);
              if (onCharacterChange) {
                console.log('Calling onCharacterChange with:', char.key);
                onCharacterChange(char.key);
              } else {
                console.log('onCharacterChange is not defined!');
              }
            }}
            className={`px-6 py-3 rounded-lg border-2 transition-all ${
              selectedCharacter === char.key
                ? 'border-orange-500 bg-orange-500/20 text-white'
                : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600'
            }`}
          >
            <span className="text-2xl mr-2">{char.icon}</span>
            <span className="font-semibold">{char.label}</span>
            <span className="text-sm block text-gray-500">{char.realm}</span>
          </button>
        ))}
      </div>

      <motion.div 
        key={selectedCharacter}
        className={`bg-gradient-to-br ${factionBgGradient} rounded-2xl p-8 border border-gray-800`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Character Portrait */}
        <div className="relative">
          {characterData.renderUrl ? (
            <img 
              src={characterData.renderUrl} 
              alt={characterData.name}
              className="w-48 h-48 md:w-64 md:h-64 rounded-xl shadow-2xl object-cover"
            />
          ) : (
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-gray-800 flex items-center justify-center">
              <span className="text-6xl">⚔️</span>
            </div>
          )}
          <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${factionColor} bg-gray-900 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-gray-700`}>
            {characterData.level}
          </div>
        </div>

        {/* Character Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {characterData.name}
          </h2>
          <p className={`text-xl ${factionColor} mb-1`}>
            Level {characterData.level} {characterData.race} {characterData.class}
          </p>
          <p className="text-gray-400 mb-4">
            {characterData.realm} • <span className={factionColor}>{characterData.faction}</span>
          </p>
          
          {characterData.guild && (
            <p className="text-orange-400 text-lg mb-4">
              &lt;{characterData.guild}&gt;
            </p>
          )}

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-gray-800/50 rounded-lg px-4 py-2">
              <span className="text-gray-400 text-sm">Item Level</span>
              <p className="text-purple-400 font-bold text-xl">{characterData.itemLevel}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg px-4 py-2">
              <span className="text-gray-400 text-sm">Achievement Points</span>
              <p className="text-yellow-400 font-bold text-xl">{characterData.achievementPoints.toLocaleString()}</p>
            </div>
          </div>

          {characterData.lastLogin && (
            <p className="text-gray-500 text-sm mt-4">
              Last seen: {new Date(characterData.lastLogin).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default WoWCharacterProfile;