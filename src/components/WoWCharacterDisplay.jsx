import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WoWCharacterDisplay = ({ selectedCharacter = 'magicmushies' }) => {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/wow-character.json?character=${selectedCharacter}`)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div className="flex items-center justify-center h-[500px] text-gray-400">
        <p>Character data unavailable</p>
      </div>
    );
  }

  const factionColor = characterData.faction === 'Horde' ? 'from-red-900' : 'from-blue-900';
  const factionAccent = characterData.faction === 'Horde' ? 'border-red-500' : 'border-blue-500';

  return (
    <div className="relative h-[600px] rounded-xl overflow-hidden">
      {/* Background with faction colors */}
      <div className={`absolute inset-0 bg-gradient-to-b ${factionColor} to-gray-900 opacity-50`}></div>
      
      {/* Character Render */}
      <div className="relative h-full flex items-center justify-center">
        {characterData.renderUrl ? (
          <motion.div
            key={characterData.renderUrl}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src={characterData.renderUrl}
              alt={characterData.name}
              className="h-[500px] object-contain drop-shadow-2xl"
            />
            
            {/* Glow effect behind character */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
              <img
                src={characterData.renderUrl}
                alt=""
                className="h-[500px] object-contain"
              />
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="text-8xl mb-4">⚔️</div>
            <p className="text-gray-400">Character render unavailable</p>
          </div>
        )}
      </div>

      {/* Character Info Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{characterData.name}</h3>
              <p className="text-xl text-gray-300">
                Level {characterData.level} {characterData.race} {characterData.class}
              </p>
              <p className="text-lg text-gray-400">
                {characterData.realm} • <span className={characterData.faction === 'Horde' ? 'text-red-400' : 'text-blue-400'}>{characterData.faction}</span>
              </p>
              {characterData.guild && (
                <p className="text-orange-400 mt-2">&lt;{characterData.guild}&gt;</p>
              )}
            </div>
            
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase">Item Level</p>
                <p className="text-2xl font-bold text-purple-400">{characterData.itemLevel}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase">Achievement Points</p>
                <p className="text-2xl font-bold text-yellow-400">{characterData.achievementPoints.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className={`absolute top-4 right-4 w-20 h-20 border-2 ${factionAccent} rounded-full opacity-20`}></div>
      <div className={`absolute bottom-4 left-4 w-32 h-32 border-2 ${factionAccent} rounded-full opacity-10`}></div>
    </div>
  );
};

export default WoWCharacterDisplay;