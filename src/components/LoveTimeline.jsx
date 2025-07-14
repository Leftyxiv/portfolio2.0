import React from 'react';
import { motion } from 'framer-motion';

const LoveTimeline = () => {
  const milestones = [
    {
      date: 'October 30, 2019',
      title: 'We Got Together',
      description: 'The day that changed everything',
      icon: '✨',
    },
    {
      date: 'November 2019',
      title: 'First "I Love You"',
      description: 'The easiest three words I\'ve ever said',
      icon: '💕',
    },
    {
      date: 'April 28, 2020',
      title: 'Got Engaged!',
      description: 'You said yes to forever!',
      icon: '💍',
    },
    {
      date: 'May 2020',
      title: 'First House Together',
      description: 'Quarantine in our very own home',
      icon: '🏡',
    },
    {
      date: 'December 12, 2020',
      title: 'Wedding Day',
      description: 'The best day of my life',
      icon: '👰',
    },
    {
      date: 'June 2023',
      title: 'Our New House',
      description: 'Building our dreams together',
      icon: '🏠',
    },
    {
      date: 'Today',
      title: 'Still Falling',
      description: 'More in love with you every single day',
      icon: '❤️',
    },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
      
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className="flex-1" />
            
            {/* Timeline node */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative z-10 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-pink-500/50"
            >
              {milestone.icon}
            </motion.div>
            
            {/* Content */}
            <div className="flex-1 px-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br from-pink-900/20 to-rose-900/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30 ${
                  index % 2 === 0 ? 'text-right' : 'text-left'
                }`}
              >
                <div className="text-pink-400 text-sm font-semibold mb-1">
                  {milestone.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-pink-100">
                  {milestone.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoveTimeline;