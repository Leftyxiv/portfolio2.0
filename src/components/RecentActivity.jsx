import React from 'react';
import { motion } from 'framer-motion';

const RecentActivity = ({ characterData }) => {
  // Use real achievements from API if available
  const achievements = characterData?.achievements?.recent || [];
  
  // Loading state
  if (!characterData) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 mt-4">Loading recent achievements...</p>
      </div>
    );
  }

  // No achievements state
  if (achievements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No recent achievements found</p>
      </div>
    );
  }
  
  // Function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Function to get border color based on points
  const getBorderColor = (points) => {
    if (points >= 25) return 'border-purple-500/50';
    if (points >= 10) return 'border-yellow-500/50';
    if (points >= 5) return 'border-blue-500/50';
    return 'border-green-500/50';
  };
  
  const activities = [
    // Map real achievements to activities format
    ...achievements.map(achievement => ({
      type: 'achievement',
      title: achievement.name,
      points: `${achievement.points} points`,
      date: formatDate(achievement.completedTimestamp),
      icon: achievement.icon,
      color: getBorderColor(achievement.points),
      description: achievement.description,
      category: achievement.category
    }))
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border ${activity.color} hover:bg-gray-800/50 transition-all duration-300`}
        >
          <div className="flex items-center gap-4">
            {/* Achievement Icon */}
            <div className="flex-shrink-0">
              {activity.icon && typeof activity.icon === 'string' && activity.icon.startsWith('http') ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                  <img 
                    src={activity.icon} 
                    alt={activity.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-2xl">
                    🏆
                  </div>
                </div>
              ) : (
                <span className="text-4xl">🏆</span>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">{activity.title}</h4>
              <p className="text-gray-400">
                {activity.points}
                {activity.category && <span className="ml-2">• {activity.category}</span>}
              </p>
              {activity.description && (
                <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
              )}
            </div>
            <span className="text-sm text-gray-500">{activity.date}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentActivity;