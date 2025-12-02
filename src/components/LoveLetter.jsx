import { motion } from 'framer-motion';
import './LoveLetter.css';

const LoveLetter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="love-letter">
      <motion.div
        className="love-letter-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.span className="love-letter-emoji" variants={itemVariants}>
          💌
        </motion.span>

        <motion.h2 className="love-letter-heading" variants={itemVariants}>
          To My Love
        </motion.h2>

        <motion.div className="love-letter-divider" variants={itemVariants}>
          <span></span>
          <span className="love-letter-heart">💕</span>
          <span></span>
        </motion.div>

        <motion.p className="love-letter-message" variants={itemVariants}>
          Happy 27th birthday babe, I love you so much!
        </motion.p>

        <motion.p className="love-letter-message love-letter-message--secondary" variants={itemVariants}>
          Every moment with you is a gift. Here&apos;s to another year of adventures,
          laughter, and making beautiful memories together.
        </motion.p>

        <motion.p className="love-letter-signature" variants={itemVariants}>
          Forever yours,
          <br />
          <span className="love-letter-signature-name">Your Love</span>
        </motion.p>

        <motion.div className="love-letter-decoration" variants={itemVariants}>
          ✨ 💖 ✨
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
