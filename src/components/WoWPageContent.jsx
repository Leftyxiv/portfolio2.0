import React, { useState } from 'react';
import WoWCharacterProfile from './WoWCharacterProfile.jsx';
import CharacterStats from './CharacterStats.jsx';
import RecentActivity from './RecentActivity.jsx';

const WoWPageContent = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('magicmushies');
  
  console.log('WoWPageContent: Current selectedCharacter:', selectedCharacter);
  
  const handleCharacterChange = (character) => {
    console.log('WoWPageContent: Changing character to:', character);
    setSelectedCharacter(character);
  };

  return (
    <>
      {/* Character Profile with switcher */}
      <section>
        <WoWCharacterProfile selectedCharacter={selectedCharacter} onCharacterChange={handleCharacterChange} />
      </section>
      
      {/* Character Stats */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Character Stats</h2>
        <CharacterStats selectedCharacter={selectedCharacter} />
      </section>
      
      {/* Recent Activity */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Adventures</h2>
        <RecentActivity />
      </section>
      
      {/* Achievements Showcase */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Notable Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex gap-4 items-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-3xl flex-shrink-0">⚔️</div>
            <div>
              <h4 className="text-lg font-bold text-red-400">High Warlord</h4>
              <p className="text-gray-400">Vanilla PvP Legend</p>
            </div>
          </div>
          <div className="flex gap-4 items-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-3xl flex-shrink-0">🏆</div>
            <div>
              <h4 className="text-lg font-bold text-purple-400">6x Cutting Edge</h4>
              <p className="text-gray-400">3 US Top 100 Kills</p>
            </div>
          </div>
          <div className="flex gap-4 items-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center text-3xl flex-shrink-0">💕</div>
            <div>
              <h4 className="text-lg font-bold text-pink-400">Married My Pocket Healer</h4>
              <p className="text-gray-400">Best Achievement Ever</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guild Info */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Guild</h2>
        <div className="guild-info max-w-2xl mx-auto bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-orange-700/30">
          <h3 className="text-3xl font-bold text-orange-400 mb-2">&lt;Enigma&gt;</h3>
          <p className="text-xl text-gray-300 mb-2">
            Mal'Ganis - Horde
          </p>
          <p className="text-gray-400 mb-6">
            Run by my wife and I - Building something special, one raid at a time
          </p>
          <div className="flex justify-center gap-8 mb-6 text-gray-400">
            <div>
              <span className="block text-2xl font-bold text-orange-300">Rebuilding</span>
              <span className="text-sm">For Greatness</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-orange-300">Community</span>
              <span className="text-sm">Focused</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-orange-300">Family</span>
              <span className="text-sm">Leadership Team</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="https://enigmaguild.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-orange-600/20 border border-orange-600 rounded-lg hover:bg-orange-600/30 transition-colors text-orange-400"
            >
              Visit Website
            </a>
            <a 
              href="https://discord.gg/enigmawow" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-purple-600/20 border border-purple-600 rounded-lg hover:bg-purple-600/30 transition-colors text-purple-400"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default WoWPageContent;