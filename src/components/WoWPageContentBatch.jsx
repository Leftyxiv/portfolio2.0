import React, { useState, useEffect } from 'react';
import WoWCharacterProfileBatch from './WoWCharacterProfileBatch.jsx';
import CharacterStatsBatch from './CharacterStatsBatch.jsx';
import RecentActivity from './RecentActivity.jsx';
import AchievementsSection from './AchievementsSection.jsx';

const WoWPageContentBatch = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('magicmushies');
  const [allCharacterData, setAllCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch all character data once on mount
  useEffect(() => {
    console.log('Fetching all character data...');
    fetch('/api/wow-characters-batch.json', { cache: 'no-store' })
      .then(res => res.json())
      .then(response => {
        console.log('Batch response:', response);
        if (response.data) {
          setAllCharacterData(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch character data:', err);
        setLoading(false);
      });
  }, []);
  
  const handleCharacterChange = (character) => {
    console.log('Changing character to:', character);
    setSelectedCharacter(character);
  };

  return (
    <>
      {/* Character Profile with switcher */}
      <section>
        <WoWCharacterProfileBatch 
          selectedCharacter={selectedCharacter} 
          onCharacterChange={handleCharacterChange}
          allCharacterData={allCharacterData}
          loading={loading}
        />
      </section>
      
      {/* Character Stats */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Character Stats</h2>
        <CharacterStatsBatch 
          selectedCharacter={selectedCharacter}
          characterData={allCharacterData?.[selectedCharacter]}
        />
      </section>
      
      {/* Recent Activity */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Adventures</h2>
        <RecentActivity characterData={allCharacterData?.[selectedCharacter]} />
      </section>
      
      {/* Achievements Showcase */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Notable Achievements
          {allCharacterData?.[selectedCharacter] && (
            <span className="text-xl text-gray-400 ml-3">
              ({allCharacterData[selectedCharacter].name})
            </span>
          )}
        </h2>
        <AchievementsSection 
          selectedCharacter={selectedCharacter} 
          characterData={allCharacterData?.[selectedCharacter]}
        />
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
            Run by my wife, myself, and a couple close friends - Building something special, one raid at a time
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

export default WoWPageContentBatch;