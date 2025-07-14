import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

// Placeholder 3D model - in production, you'd load actual WoW character models
function CharacterModel({ characterData }) {
  const meshRef = useRef();
  
  // Rotate the model
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  // Different colors based on class
  const classColors = {
    'Warrior': '#C79C6E',
    'Paladin': '#F58CBA',
    'Hunter': '#A9D271',
    'Rogue': '#FFF569',
    'Priest': '#FFFFFF',
    'Death Knight': '#C41F3B',
    'Shaman': '#0070DE',
    'Mage': '#40C7EB',
    'Warlock': '#8787ED',
    'Monk': '#00FF96',
    'Druid': '#FF7D0A',
    'Demon Hunter': '#A330C9',
    'Evoker': '#33937F'
  };

  const color = classColors[characterData?.class] || '#ff6b00';

  return (
    <mesh ref={meshRef}>
      <capsuleGeometry args={[1, 2, 4, 8]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

const WoWCharacter = ({ selectedCharacter = 'magicmushies' }) => {
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

  return (
    <div className="w-full h-[500px] relative">
      {/* Character Info Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          key={selectedCharacter}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30"
        >
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : characterData ? (
            <>
              <h3 className="text-xl font-bold text-orange-400">{characterData.name}</h3>
              <p className="text-gray-300">Level {characterData.level} {characterData.race} {characterData.class}</p>
              <p className="text-sm text-gray-400">Item Level: {characterData.itemLevel}</p>
              {characterData.guild && (
                <p className="text-sm text-orange-400">&lt;{characterData.guild}&gt;</p>
              )}
            </>
          ) : (
            <div className="text-gray-400">Character data unavailable</div>
          )}
        </motion.div>
      </div>

      {/* Character Render Image (if available from API) */}
      {characterData?.renderUrl && (
        <div className="absolute top-4 right-4 z-10">
          <motion.img
            key={characterData.renderUrl}
            src={characterData.renderUrl}
            alt={characterData.name}
            className="w-32 h-32 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#ff6b00" intensity={0.5} />
          
          <Center>
            <CharacterModel characterData={characterData} />
          </Center>
          
          <OrbitControls 
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
          
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-sm text-gray-400">Click and drag to rotate</p>
      </div>
    </div>
  );
};

export default WoWCharacter;