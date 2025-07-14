import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReasonsCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const reasons = [
    {
      id: 1,
      front: "Your Smile",
      back: "It lights up every room and melts my heart every single time"
    },
    {
      id: 2,
      front: "Your Kindness",
      back: "The way you care for everyone around you inspires me daily"
    },
    {
      id: 3,
      front: "Your Humor",
      back: "You make me laugh like no one else can"
    },
    {
      id: 4,
      front: "Your Support",
      back: "You believe in me even when I don't believe in myself"
    },
    {
      id: 5,
      front: "Your Intelligence",
      back: "Our conversations challenge and excite me"
    },
    {
      id: 6,
      front: "Your Adventurous Spirit",
      back: "Every day with you is a new adventure"
    },
    {
      id: 7,
      front: "Your Compassion",
      back: "You make the world a better place just by being you"
    },
    {
      id: 8,
      front: "Your Strength",
      back: "You're the strongest person I know, in every way"
    },
    {
      id: 9,
      front: "You're My Best Friend",
      back: "I can't imagine life without you by my side"
    }
  ];

  const toggleCard = (id) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reasons.map((reason) => (
        <motion.div
          key={reason.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reason.id * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="relative h-48 cursor-pointer"
          onClick={() => toggleCard(reason.id)}
        >
          <AnimatePresence mode="wait">
            {!flippedCards.has(reason.id) ? (
              <motion.div
                key="front"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-rose-500/30 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/40 flex items-center justify-center"
              >
                <h3 className="text-2xl font-bold text-white text-center">
                  {reason.front}
                </h3>
                <span className="absolute bottom-4 right-4 text-pink-300 text-sm">
                  Click to flip 💕
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-br from-rose-500/40 to-pink-500/40 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/50 flex items-center justify-center"
              >
                <p className="text-lg text-pink-100 text-center leading-relaxed">
                  {reason.back}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default ReasonsCards;