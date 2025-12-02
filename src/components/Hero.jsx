import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import './Hero.css';

const Hero = () => {
  const titleWords = ['Happy', '27th', 'Birthday'];
  const nameLetters = ['J', 'e', 'n', 'n', 'a'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  const nameContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 2,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5,
        duration: 0.5
      }
    },
    bounce: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className="hero">
      <FloatingHearts />

      <div className="hero-content">
        {/* Decorative elements */}
        <motion.span
          className="hero-decorative hero-decorative--left"
          variants={decorativeVariants}
          initial="hidden"
          animate="visible"
        >
          ✨
        </motion.span>

        {/* Birthday message */}
        <motion.div
          className="hero-title-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              className={`hero-title-word ${word === '27th' ? 'hero-title-word--accent' : ''}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          variants={nameContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="hero-name-letter"
              variants={letterVariants}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            className="hero-name-heart"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, type: 'spring' }}
          >
            💕
          </motion.span>
        </motion.h1>

        {/* Decorative elements */}
        <motion.span
          className="hero-decorative hero-decorative--right"
          variants={decorativeVariants}
          initial="hidden"
          animate="visible"
        >
          🎂
        </motion.span>

        {/* Underline decoration */}
        <motion.div
          className="hero-underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 0.8, ease: 'circOut' }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={['visible', 'bounce']}
      >
        <span className="scroll-indicator-text">Scroll to explore</span>
        <span className="scroll-indicator-arrow">↓</span>
      </motion.div>
    </section>
  );
};

export default Hero;
