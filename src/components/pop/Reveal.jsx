import { motion } from "framer-motion";

export default function Reveal({ children, className, paused, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={paused ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: paused ? 0 : 0.65,
        delay: paused ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
