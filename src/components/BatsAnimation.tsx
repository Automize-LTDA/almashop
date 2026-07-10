import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Flawless hand-crafted Batman logo path (24x24)
const BAT_PATH = "M 12 21 Q 14 18 17 20 Q 15 14 22 13 Q 18 9 14 9 L 13 3 L 12 6 L 11 3 L 10 9 Q 6 9 2 13 Q 9 14 7 20 Q 10 18 12 21 Z";

interface BatProps {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  duration: number;
  delay: number;
  scale: number;
  targetScale: number;
  zIndex: number;
}

export default function BatsAnimation() {
  const [bats, setBats] = useState<BatProps[]>([]);

  useEffect(() => {
    // Generate random bats
    const isMobile = window.innerWidth < 768;
    const numBats = isMobile ? 15 : 40;
    
    const newBats: BatProps[] = Array.from({ length: numBats }).map((_, i) => {
      // Start near the center of the screen
      const initialX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
      const initialY = window.innerHeight / 2 + (Math.random() - 0.5) * 100;
      
      // Fan outwards towards the edges of the screen
      const targetX = window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 1.5;
      const targetY = window.innerHeight / 2 + (Math.random() - 0.5) * window.innerHeight * 1.5;
      
      return {
        id: i,
        initialX,
        initialY,
        targetX,
        targetY,
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 1.5,
        scale: 0.05 + Math.random() * 0.1, // Start very tiny
        targetScale: 10 + Math.random() * 25, // Scale up massively (flying into the camera)
        zIndex: 50,
      };
    });

    setBats(newBats);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {bats.map((bat) => (
        <motion.div
          key={bat.id}
          initial={{ x: bat.initialX, y: bat.initialY, scale: bat.scale, opacity: 0 }}
          animate={{ 
            x: bat.targetX, 
            y: bat.targetY,
            scale: bat.targetScale,
            opacity: [0, 1, 1, 0] // Fade in and out
          }}
          transition={{
            duration: bat.duration,
            delay: bat.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ 
            zIndex: bat.zIndex,
            filter: bat.scale > 1.2 ? 'blur(2px)' : 'none', // Depth of field effect
          }}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-black/80 dark:text-black"
            animate={{
              scaleY: [1, 0.6, 1], // Flapping wings effect
            }}
            transition={{
              duration: 0.15 + Math.random() * 0.1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <path d={BAT_PATH} />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}
