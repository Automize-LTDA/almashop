import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Exact SVG path from public/bat.svg (potrace output)
const BAT_PATH = "M9785 5728 c-2 -7 -22 -68 -45 -135 -313 -948 -940 -1649 -1822 -2037 -209 -92 -598 -211 -618 -189 -4 4 -47 209 -96 456 -49 246 -92 446 -96 445 -4 -2 -93 -85 -197 -186 l-190 -182 -48 30 c-86 55 -167 73 -301 67 -75 -3 -135 -11 -166 -22 l-49 -18 -177 184 -177 184 -26 -85 c-14 -47 -83 -276 -152 -510 -69 -234 -131 -440 -136 -458 -13 -40 -11 -40 -214 25 -834 270 -1466 781 -1894 1533 -119 210 -278 599 -306 753 -4 20 -11 37 -15 37 -4 0 -25 -21 -46 -47 -59 -73 -199 -219 -294 -307 -463 -431 -1050 -712 -1700 -815 -151 -24 -345 -41 -483 -42 l-102 0 110 -23 c694 -145 1141 -501 1270 -1010 13 -50 26 -126 30 -169 6 -63 10 -77 22 -73 37 15 183 48 290 67 149 26 427 36 544 20 414 -59 707 -271 890 -646 67 -137 110 -263 139 -403 22 -112 40 -248 40 -308 l0 -42 92 55 c106 64 190 101 314 140 83 25 102 27 264 27 161 0 182 -2 265 -27 119 -36 288 -120 400 -199 111 -78 344 -308 454 -446 97 -123 245 -344 336 -502 77 -133 237 -457 286 -579 l34 -84 13 49 c126 473 374 815 792 1093 392 262 930 443 1499 506 80 8 145 17 146 18 1 1 12 56 24 122 138 724 488 1210 991 1374 267 88 596 92 886 11 64 -17 64 -17 68 4 30 154 92 301 178 423 160 227 434 471 793 705 200 131 357 220 635 361 140 71 247 127 238 123 -10 -3 -71 -13 -135 -23 -183 -27 -599 -24 -793 6 -383 58 -703 159 -1057 331 -252 122 -474 255 -646 387 -39 30 -59 40 -62 31z";

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
  flapDuration: number;
}

export default function BatsAnimation() {
  const [bats, setBats] = useState<BatProps[]>([]);

  useEffect(() => {
    // Generate random bats
    const isMobile = window.innerWidth < 768;
    const numBats = isMobile ? 16 : 38; // Increased counts back up for a denser flock now that transition lag is solved
    
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
        duration: 1.2 + Math.random() * 1.8,
        delay: Math.random() * 1.2,
        scale: 0.005 + Math.random() * 0.01, // Start extremely tiny (relative to 300px base width)
        targetScale: 1.2 + Math.random() * 1.8, // End at large size (up to 900px) with zero blur/pixelation
        zIndex: 50,
        flapDuration: 0.35 + Math.random() * 0.15, // Synchronized wing flap speed per bat
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
            repeat: Infinity,
            ease: "easeIn" // Accelerates as it gets closer
          }}
          className="absolute origin-center"
          style={{ 
            zIndex: bat.zIndex,
            filter: bat.scale > 1.2 ? 'blur(2px)' : 'none', // Depth of field effect
            perspective: 800,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity" // Hardware acceleration
          }}
        >
          <svg
            width="300"
            height="137"
            viewBox="0 0 1280 585"
            fill="currentColor"
            className="text-black/80 dark:text-black origin-center"
          >
            <defs>
              <clipPath id={`left-wing-clip-${bat.id}`}>
                <rect x="0" y="0" width="550" height="585" />
              </clipPath>
              <clipPath id={`right-wing-clip-${bat.id}`}>
                <rect x="730" y="0" width="550" height="585" />
              </clipPath>
              <clipPath id={`body-clip-${bat.id}`}>
                <rect x="548" y="0" width="184" height="585" />
              </clipPath>
            </defs>

            {/* Body (static) */}
            <g clipPath={`url(#body-clip-${bat.id})`}>
              <g transform="translate(0.000000,585.000000) scale(0.100000,-0.100000)">
                <path d={BAT_PATH} />
              </g>
            </g>

            {/* Left Wing (flapping) */}
            <g clipPath={`url(#left-wing-clip-${bat.id})`}>
              <motion.g
                style={{ transformOrigin: "550px 292px" }}
                animate={{
                  rotateY: [0, 50, -35, 0], // Sweeping forward and backward in 3D
                  rotate: [0, -12, 8, 0],   // Gentle up and down stroke
                }}
                transition={{
                  duration: bat.flapDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <g transform="translate(0.000000,585.000000) scale(0.100000,-0.100000)">
                  <path d={BAT_PATH} />
                </g>
              </motion.g>
            </g>

            {/* Right Wing (flapping) */}
            <g clipPath={`url(#right-wing-clip-${bat.id})`}>
              <motion.g
                style={{ transformOrigin: "730px 292px" }}
                animate={{
                  rotateY: [0, -50, 35, 0], // Sweeping forward and backward in 3D (mirrored)
                  rotate: [0, 15, -10, 0],   // Gentle up and down stroke
                }}
                transition={{
                  duration: bat.flapDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <g transform="translate(0.000000,585.000000) scale(0.100000,-0.100000)">
                  <path d={BAT_PATH} />
                </g>
              </motion.g>
            </g>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
