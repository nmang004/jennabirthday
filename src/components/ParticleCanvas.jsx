import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ParticleCanvas.css';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxParticles = isMobile ? 50 : 150;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle colors (birthday theme)
    const colors = [
      '#ff69b4', // Pink
      '#ff85c1', // Light pink
      '#ffd700', // Gold
      '#ffe066', // Light gold
      '#ffb6c1', // Pale pink
      '#ff4d6d', // Hot pink
    ];

    // Particle class
    class Particle {
      constructor(x, y, isHeart = false) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2 - 1; // Upward bias
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.005 + 0.002;
        this.isHeart = isHeart || Math.random() > 0.7;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.gravity = 0.02;
      }

      update(mouseX, mouseY) {
        // Mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx += (dx / dist) * force * 0.3;
          this.vy += (dy / dist) * force * 0.3;
        }

        // Apply gravity (slight upward for hearts, down for confetti)
        if (this.isHeart) {
          this.vy -= this.gravity * 0.5;
        } else {
          this.vy += this.gravity;
        }

        // Apply velocity with damping
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Rotation
        this.rotation += this.rotationSpeed;

        // Decay
        this.life -= this.decay;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -0.8;
        if (this.y < 0 || this.y > height) this.vy *= -0.8;

        // Keep in bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.life;

        if (this.isHeart) {
          // Draw heart shape
          ctx.fillStyle = this.color;
          ctx.beginPath();
          const s = this.size;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
          ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
          ctx.fill();
        } else {
          // Draw confetti (rectangle)
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        }

        ctx.restore();
      }
    }

    // Initialize some particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(new Particle());
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      // Add particles on mouse move (throttled)
      if (particlesRef.current.length < maxParticles && Math.random() > 0.7) {
        particlesRef.current.push(
          new Particle(mouseRef.current.x, mouseRef.current.y)
        );
      }
    };

    // Touch handler for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;

        if (particlesRef.current.length < maxParticles) {
          particlesRef.current.push(
            new Particle(mouseRef.current.x, mouseRef.current.y)
          );
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      particlesRef.current.forEach((particle) => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      // Randomly spawn new particles
      if (particlesRef.current.length < 30 && Math.random() > 0.95) {
        particlesRef.current.push(new Particle());
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      className="particle-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="particle-content">
        <span className="particle-label">Interactive</span>
        <h2 className="particle-title">
          Move your cursor <span className="gold">around</span>
        </h2>
        <p className="particle-subtitle">
          Watch the hearts and confetti follow your every move
        </p>
      </div>

      <canvas ref={canvasRef} className="particle-canvas" />
    </motion.section>
  );
};

export default ParticleCanvas;
