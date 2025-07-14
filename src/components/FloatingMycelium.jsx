import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMycelium = ({ currentPath = '/' }) => {
  const canvasRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  // Navigation links arranged in a circle with icons
  const links = [
    { id: 'home', label: 'Home', href: '/', angle: 0, icon: '🏠', color: 'from-blue-600 to-blue-800' },
    { id: 'projects', label: 'Projects', href: '/projects/', angle: 72, icon: '🌱', color: 'from-green-600 to-green-800' },
    { id: 'wow', label: 'WoW', href: '/wow/', angle: 144, icon: '⚔️', color: 'from-purple-600 to-purple-800' },
    { id: 'about', label: 'About', href: '/about/', angle: 216, icon: '✨', color: 'from-yellow-600 to-yellow-800' },
    { id: 'wife', label: 'For My Wife', href: '/wife/', angle: 288, icon: '💕', color: 'from-pink-600 to-pink-800' }
  ];
  
  // Check if current page
  const isCurrentPage = (href) => {
    return currentPath === href || (href !== '/' && currentPath.startsWith(href));
  };
  
  // Draw mycelium strands
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = 150;
    const centerY = 150;
    const time = Date.now() * 0.001;
    
    const animate = () => {
      ctx.clearRect(0, 0, 300, 300);
      
      if (isExpanded) {
        // Draw rhizomorphic strands
        links.forEach((link, index) => {
          const angleRad = (link.angle * Math.PI) / 180;
          const endX = centerX + Math.cos(angleRad) * 120;
          const endY = centerY + Math.sin(angleRad) * 120;
          
          // Draw multiple strands for organic look
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            
            // Create organic curves with noise
            const points = [];
            for (let t = 0; t <= 1; t += 0.1) {
              const x = centerX + (endX - centerX) * t;
              const y = centerY + (endY - centerY) * t;
              const noise = Math.sin(time + index * 2 + i + t * 10) * 5;
              const perpX = Math.cos(angleRad + Math.PI/2) * noise;
              const perpY = Math.sin(angleRad + Math.PI/2) * noise;
              points.push({ x: x + perpX, y: y + perpY });
            }
            
            // Draw smooth curve through points
            ctx.moveTo(points[0].x, points[0].y);
            for (let j = 1; j < points.length - 2; j++) {
              const xc = (points[j].x + points[j + 1].x) / 2;
              const yc = (points[j].y + points[j + 1].y) / 2;
              ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
            }
            ctx.lineTo(endX, endY);
            
            // Style
            const isHovered = hoveredLink === link.id;
            const isCurrent = isCurrentPage(link.href);
            ctx.strokeStyle = isHovered || isCurrent
              ? `rgba(251, 146, 60, ${0.3 - i * 0.1})`
              : `rgba(156, 163, 175, ${0.2 - i * 0.05})`;
            ctx.lineWidth = isHovered || isCurrent ? 2 - i * 0.5 : 1.5 - i * 0.3;
            ctx.stroke();
          }
          
          // Draw branching hyphae
          for (let branch = 0; branch < 5; branch++) {
            const t = 0.3 + branch * 0.15;
            const branchX = centerX + (endX - centerX) * t;
            const branchY = centerY + (endY - centerY) * t;
            const branchLength = 10 + Math.random() * 10;
            const branchAngle = angleRad + (Math.random() - 0.5) * 1;
            
            ctx.beginPath();
            ctx.moveTo(branchX, branchY);
            ctx.lineTo(
              branchX + Math.cos(branchAngle) * branchLength,
              branchY + Math.sin(branchAngle) * branchLength
            );
            ctx.strokeStyle = 'rgba(156, 163, 175, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [isExpanded, hoveredLink, links, currentPath]);
  
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <div className="relative w-[300px] h-[300px]">
        {/* Canvas for mycelium strands */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="absolute inset-0 pointer-events-none"
        />
        
        {/* Central spore/nucleus */}
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 border-2 border-orange-500 shadow-2xl cursor-pointer overflow-hidden group transition-all duration-300 hover:shadow-orange-500/50 hover:shadow-xl flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Inner texture */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent via-orange-300 to-transparent animate-pulse" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-tl from-transparent via-orange-400 to-transparent animate-pulse animation-delay-500" />
          </div>
          
          {/* Icon with hover scale */}
          <motion.span 
            className="relative text-3xl z-10"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            🍄
          </motion.span>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 blur-xl"
            animate={isExpanded ? { opacity: [0.2, 0.3, 0.2] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </button>
        
        {/* Navigation links */}
        <AnimatePresence>
          {isExpanded && links.map((link, index) => {
            const angleRad = (link.angle * Math.PI) / 180;
            const x = 150 + Math.cos(angleRad) * 120;
            const y = 150 + Math.sin(angleRad) * 120;
            const isCurrent = isCurrentPage(link.href);
            
            return (
              <motion.a
                key={link.id}
                href={link.href}
                className={`absolute flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${link.color} border-2 ${isCurrent ? 'border-orange-500' : 'border-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300 group`}
                style={{ left: x - 28, top: y - 28 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {/* Active ring */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-900"
                    layoutId="activeRing"
                  />
                )}
                
                {/* Icon */}
                <span className="text-2xl z-10">{link.icon}</span>
                
                {/* Label tooltip */}
                <motion.div
                  className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-900/95 backdrop-blur border border-gray-700 rounded-lg text-xs text-gray-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                >
                  {link.label}
                </motion.div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FloatingMycelium;