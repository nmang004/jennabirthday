import { motion } from 'framer-motion';
import './PhotoCard.css';

const PhotoCard = ({ photo, index }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className="photo-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.4, ease: 'easeOut' }
      }}
      style={{ perspective: 1000 }}
    >
      <div className="photo-card-inner">
        <div className="photo-card-accent-line" />

        <div className="photo-card-image-wrapper">
          {photo.src ? (
            <motion.img
              src={photo.src}
              alt={photo.caption || 'Memory'}
              className="photo-card-image"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ) : (
            <div className="photo-card-placeholder">
              <span className="photo-card-placeholder-icon">📷</span>
              <span className="photo-card-placeholder-text">Photo {index + 1}</span>
            </div>
          )}
        </div>

        <div className="photo-card-content">
          <div className="photo-card-meta">
            {photo.occasion && (
              <span className="photo-card-occasion">{photo.occasion}</span>
            )}
            {photo.date && (
              <span className="photo-card-date">{photo.date}</span>
            )}
          </div>
          {photo.caption && (
            <p className="photo-card-caption">{photo.caption}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
