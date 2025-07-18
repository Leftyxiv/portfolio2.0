import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Our precious memories together
  const photos = [
    { id: 1, src: '/assets/wife/cenotes-mexico.jpg', caption: 'Swimming in the magical cenotes of Mexico' },
    { id: 2, src: '/assets/wife/bacalar-lagoon.jpg', caption: 'Together at Bacalar, the Lagoon of Seven Colors' },
    { id: 3, src: '/assets/wife/giants-game.jpg', caption: 'Cheering on the Giants when they played the Reds' },
    { id: 4, src: '/assets/wife/haight-ashbury.jpg', caption: 'Exploring Haight-Ashbury in San Francisco' },
    { id: 5, src: '/assets/wife/disney-honeymoon.jpg', caption: 'Our magical honeymoon at Disney World, Orlando' },
    { id: 6, src: '/assets/wife/wedding-day.jpg', caption: 'The happiest day - our wedding day kiss' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square bg-gradient-to-br from-pink-900/20 to-rose-900/20 backdrop-blur-sm">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-auto rounded-2xl"
              />
              <p className="text-white text-center mt-4 text-lg">
                {selectedPhoto.caption}
              </p>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;