import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'view', 'open', 'get'
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens with fine pointers
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen to hover targets
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        if (cursorType === 'view') {
          setCursorState('view');
        } else if (cursorType === 'get') {
          setCursorState('get');
        } else if (cursorType === 'open' || target.tagName === 'A') {
          setCursorState('open');
        } else {
          setCursorState('hover');
        }
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isLabelState = ['view', 'open', 'get'].includes(cursorState);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Center Reticle Point */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-ember pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#FF6B1A]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isLabelState ? 0 : cursorState === 'hover' ? 1.4 : 1,
          opacity: isLabelState ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Director's Viewfinder Outer Frame */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isLabelState ? 64 : cursorState === 'hover' ? 44 : 26,
          height: isLabelState ? 64 : cursorState === 'hover' ? 44 : 26,
          borderColor: isLabelState ? '#FF6B1A' : cursorState === 'hover' ? '#FF6B1A' : 'rgba(255, 255, 255, 0.25)',
          rotate: cursorState === 'view' ? 45 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Reticle Corner Brackets */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-ember" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-ember" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-ember" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-ember" />
        </div>

        {/* View / Open / Get Label */}
        {cursorState === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: -45 }}
            className="font-cinematic text-xs tracking-widest text-ember font-bold"
          >
            VIEW
          </motion.span>
        )}

        {cursorState === 'open' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-cinematic text-[11px] tracking-widest text-ember font-bold"
          >
            OPEN
          </motion.span>
        )}

        {cursorState === 'get' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-cinematic text-[11px] tracking-widest text-ember font-bold"
          >
            GET
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
