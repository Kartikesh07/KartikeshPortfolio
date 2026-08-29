import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = '01#@∆§¥X█▓░<>[]{}/*+=~';

const TextScramble = ({ text, className = '', as = 'span', trigger = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const inView = useInView(elementRef, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || !trigger || hasAnimated.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    hasAnimated.current = true;
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iteration += 1 / 2.5; // Controls unscramble speed
    }, 28);

    return () => clearInterval(interval);
  }, [inView, text, trigger]);

  const Component = as;

  return (
    <Component ref={elementRef} className={className}>
      {displayText}
    </Component>
  );
};

export default TextScramble;
