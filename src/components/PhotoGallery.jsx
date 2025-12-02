import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import './PhotoGallery.css';

const PhotoGallery = () => {
  // Placeholder photos - replace with your actual photos
  const photos = [
    {
      id: 1,
      src: '/gallery/photo-01.webp',
      caption: 'One of my favorite memories with you',
      occasion: 'Adventure'
    },
    {
      id: 2,
      src: '/gallery/photo-02.webp',
      caption: 'That smile that makes everything better',
      occasion: 'Date Night'
    },
    {
      id: 3,
      src: '/gallery/photo-03.webp',
      caption: 'Always laughing together',
      occasion: 'Just Us'
    },
    {
      id: 4,
      src: '/gallery/photo-04.webp',
      caption: 'Making memories everywhere we go',
      occasion: 'Travel'
    },
    {
      id: 5,
      src: '/gallery/photo-05.webp',
      caption: 'My favorite person in the world',
      occasion: 'Everyday'
    },
    {
      id: 6,
      src: '/gallery/photo-06.webp',
      caption: 'The look that stole my heart',
      occasion: 'Special'
    },
    {
      id: 7,
      src: '/gallery/photo-07.webp',
      caption: 'Adventures are better with you',
      occasion: 'Exploring'
    },
    {
      id: 8,
      src: '/gallery/photo-08.webp',
      caption: 'Perfect moments, perfect you',
      occasion: 'Together'
    },
    {
      id: 9,
      src: '/gallery/photo-09.webp',
      caption: 'Every day with you is a gift',
      occasion: 'Love'
    },
    {
      id: 10,
      src: '/gallery/photo-10.webp',
      caption: 'Here\'s to many more years',
      occasion: 'Forever'
    },
    {
      id: 11,
      src: '/gallery/photo-11.webp',
      caption: 'You light up every room',
      occasion: 'Celebration'
    },
    {
      id: 12,
      src: '/gallery/photo-12.webp',
      caption: 'My heart, always',
      occasion: 'Us'
    },
    {
      id: 13,
      src: '/gallery/photo-13.webp',
      caption: 'The beginning of forever',
      occasion: 'Proposal'
    },
    {
      id: 14,
      src: '/gallery/photo-14.webp',
      caption: 'She said yes!',
      occasion: 'Proposal'
    },
    {
      id: 15,
      src: '/gallery/photo-15.webp',
      caption: 'My future wife',
      occasion: 'Proposal'
    }
  ];

  return (
    <section className="photo-gallery">
      <motion.div
        className="photo-gallery-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="photo-gallery-label">Our Memories</span>
        <h2 className="photo-gallery-title">
          A Year of <span className="accent">Love</span>
        </h2>
        <p className="photo-gallery-subtitle">
          Some of my favorite moments with you
        </p>
      </motion.div>

      <div className="photo-gallery-grid">
        {photos.map((photo, index) => (
          <PhotoCard key={photo.id} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
