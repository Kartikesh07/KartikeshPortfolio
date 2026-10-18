import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Magnetic({
  children,
  className = "",
  paused,
  ...props
}) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, {
    stiffness: 220,
    damping: 20
  });
  const y = useSpring(targetY, {
    stiffness: 220,
    damping: 20
  });
  const bounds = useRef(null);
  useEffect(() => {
    if (paused) {
      targetX.set(0);
      targetY.set(0);
    }
  }, [paused, targetX, targetY]);
  return <motion.a {...props} className={className} style={{
    x: paused ? 0 : x,
    y: paused ? 0 : y
  }} onPointerEnter={event => {
    bounds.current = event.currentTarget.getBoundingClientRect();
  }} onPointerMove={event => {
    if (paused || event.pointerType !== "mouse" || !bounds.current) return;
    const rect = bounds.current;
    targetX.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    targetY.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  }} onPointerLeave={() => {
    targetX.set(0);
    targetY.set(0);
  }} onBlur={() => {
    targetX.set(0);
    targetY.set(0);
  }}>
    {children}
  </motion.a>;
}
