import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import './App.css';

// Components
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import PhotoGallery from './components/PhotoGallery';
import ParticleCanvas from './components/ParticleCanvas';
import LoveLetter from './components/LoveLetter';
import Footer from './components/Footer';

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if mobile/touch device
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
    };

    // Only initialize Lenis on desktop
    if (!isMobile()) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      const raf = (time) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <ThemeToggle />

      <main>
        <Hero />
        <Marquee />
        <PhotoGallery />
        <ParticleCanvas />
        <LoveLetter />
        <Footer />
      </main>
    </div>
  );
}

export default App;
