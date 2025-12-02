import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingHearts.css';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Generate initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 0.5 + Math.random() * 1,
      emoji: ['💕', '💖', '💗', '💝', '✨', '🌸'][Math.floor(Math.random() * 6)]
    }));

    setHearts(initialHearts);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}rem`
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {heart.emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingHearts;
