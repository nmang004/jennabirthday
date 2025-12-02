import { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);

  useEffect(() => {
    // Check if mobile/touch device
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
    };

    if (isMobile()) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseenter', onMouseEnter);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };

    // Add hover listeners for interactive elements
    const addHoverListeners = () => {
      // Links and buttons
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });

      // Photo cards
      document.querySelectorAll('.photo-card').forEach((el) => {
        el.addEventListener('mouseenter', () => setPhotoHovered(true));
        el.addEventListener('mouseleave', () => setPhotoHovered(false));
      });
    };

    addEventListeners();

    // Delay adding hover listeners to ensure DOM is ready
    const timeout = setTimeout(addHoverListeners, 1000);

    // Re-add hover listeners when DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  const cursorClasses = [
    'cursor',
    hidden && 'cursor--hidden',
    clicked && 'cursor--clicked',
    linkHovered && 'cursor--link-hovered',
    photoHovered && 'cursor--photo-hovered'
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {photoHovered && <span className="cursor-text">💕</span>}
    </div>
  );
};

export default CustomCursor;
