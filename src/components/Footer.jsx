import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const startAnimation = () => {
    if (hasAnimated) return;
    setHasAnimated(true);

    animate(count, 27, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1]
    });
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onViewportEnter={startAnimation}
    >
      <div className="footer-content">
        <motion.div
          className="footer-age-wrapper"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="footer-age-label">Celebrating</span>
          <div className="footer-age">
            <motion.span className="footer-age-number">{rounded}</motion.span>
            <span className="footer-age-text">years</span>
          </div>
          <span className="footer-age-sublabel">of being amazing</span>
        </motion.div>

        <motion.div
          className="footer-emojis"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          >
            💖
          </motion.span>
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.5
            }}
          >
            🎉
          </motion.span>
        </motion.div>

        <motion.p
          className="footer-message"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Made with 💕 for the most amazing person
        </motion.p>

        <motion.div
          className="footer-year"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {new Date().getFullYear()}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
