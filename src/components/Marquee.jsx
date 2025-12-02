import { motion } from 'framer-motion';
import './Marquee.css';

const Marquee = () => {
  const messages = [
    { text: "You're amazing", emoji: "💖" },
    { text: "27 looks good on you", emoji: "✨" },
    { text: "Here's to another year of adventures", emoji: "🎉" },
    { text: "You make everything better", emoji: "💕" },
    { text: "Cheers to you", emoji: "🥂" },
    { text: "Forever my favorite person", emoji: "🌸" },
    { text: "27 and thriving", emoji: "💫" },
    { text: "My favorite human", emoji: "💝" },
  ];

  const createMarqueeContent = () => (
    <>
      {messages.map((msg, i) => (
        <span key={i} className="marquee-item">
          <span className="marquee-emoji">{msg.emoji}</span>
          <span className="marquee-text">{msg.text}</span>
          <span className="marquee-separator">•</span>
        </span>
      ))}
    </>
  );

  const marqueeVariantsLeft = {
    animate: {
      x: [0, -2000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear'
        }
      }
    }
  };

  const marqueeVariantsRight = {
    animate: {
      x: [-2000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear'
        }
      }
    }
  };

  return (
    <motion.section
      className="marquee-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Row 1 - Left */}
      <div className="marquee-container">
        <motion.div
          className="marquee-track"
          variants={marqueeVariantsLeft}
          animate="animate"
        >
          {createMarqueeContent()}
          {createMarqueeContent()}
          {createMarqueeContent()}
        </motion.div>
      </div>

      {/* Row 2 - Right */}
      <div className="marquee-container marquee-container--reverse">
        <motion.div
          className="marquee-track"
          variants={marqueeVariantsRight}
          animate="animate"
        >
          {createMarqueeContent()}
          {createMarqueeContent()}
          {createMarqueeContent()}
        </motion.div>
      </div>

      {/* Row 3 - Left (slower) */}
      <div className="marquee-container marquee-container--accent">
        <motion.div
          className="marquee-track"
          variants={marqueeVariantsLeft}
          animate="animate"
        >
          {createMarqueeContent()}
          {createMarqueeContent()}
          {createMarqueeContent()}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Marquee;
