import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubStatsEnhanced = ({ username = 'leftyxiv' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  
  useEffect(() => {
    fetch(`/api/github-stats.json?username=${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch GitHub stats:', err);
        setLoading(false);
      });
  }, [username]);
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 mt-4">Loading GitHub stats...</p>
      </div>
    );
  }
  
  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Unable to load GitHub stats</p>
      </div>
    );
  }
  
  const tabs = [
    { id: 'stats', label: 'Overview', icon: '📊' },
    { id: 'languages', label: 'Languages', icon: '💻' },
    { id: 'contributions', label: 'Contributions', icon: '🔥' }
  ];
  
  return (
    <div className="github-stats-enhanced bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-white">GitHub Activity</h3>
        <a 
          href={stats.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2"
        >
          <span>@{username}</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="tab-content"
      >
        {activeTab === 'stats' && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
            <img 
              src={stats.statsUrl}
              alt="GitHub Stats"
              className="w-full max-w-2xl mx-auto"
              loading="lazy"
            />
          </div>
        )}
        
        {activeTab === 'languages' && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
            <img 
              src={stats.languagesUrl}
              alt="Top Languages"
              className="w-full max-w-md mx-auto"
              loading="lazy"
            />
          </div>
        )}
        
        {activeTab === 'contributions' && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
            <img 
              src={stats.contributionsUrl}
              alt="GitHub Streak"
              className="w-full max-w-2xl mx-auto"
              loading="lazy"
            />
          </div>
        )}
      </motion.div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-1">🌟</div>
          <div className="text-sm text-gray-400">Public Repos</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-1">👥</div>
          <div className="text-sm text-gray-400">Followers</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-sm text-gray-400">Achievements</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-1">💻</div>
          <div className="text-sm text-gray-400">Contributions</div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsEnhanced;