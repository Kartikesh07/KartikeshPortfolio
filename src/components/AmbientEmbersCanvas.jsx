import { useEffect, useRef } from 'react';

const AmbientEmbersCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion preference
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pre-allocated particle pool
    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.15,
      fadeSpeed: Math.random() * 0.006 + 0.003,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
      swayOffset: Math.random() * Math.PI * 2,
    }));

    let isVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        render();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 16.667, 2); // Normalized frame delta
      lastTime = now;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Update position
        p.y -= p.speedY * delta;
        p.swayOffset += 0.015 * delta;
        p.x += (p.speedX + Math.sin(p.swayOffset) * 0.25) * delta;

        // Update pulsing opacity
        p.opacity += p.fadeSpeed * p.fadeDirection * delta;
        if (p.opacity >= 0.65) {
          p.opacity = 0.65;
          p.fadeDirection = -1;
        } else if (p.opacity <= 0.05) {
          p.opacity = 0.05;
          p.fadeDirection = 1;
        }

        // Recycle particles when off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft ember particle
        ctx.fillStyle = `rgba(255, 107, 26, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
      aria-hidden="true"
    />
  );
};

export default AmbientEmbersCanvas;
