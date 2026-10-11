import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectArt } from "./Illustrations";

const ProjectCard = forwardRef(function ProjectCard(
  { project, onOpen, paused, index },
  ref,
) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  function move(event) {
    if (paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }
  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }
  return (
    <motion.article
      ref={ref}
      className="project-card"
      layout={!paused}
      initial={paused ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: paused ? 1 : 0.96 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: paused ? 0 : 0.4,
        delay: paused ? 0 : index * 0.045,
        layout: { duration: 0.4 },
      }}
    >
      <motion.button
        className={`project-art ${project.color}`}
        onClick={(event) => onOpen(project, event)}
        onPointerMove={move}
        onPointerLeave={reset}
        onBlur={reset}
        style={{
          rotateX: paused ? 0 : rotateX,
          rotateY: paused ? 0 : rotateY,
          transformPerspective: 1000,
        }}
        whileTap={paused ? undefined : { scale: 0.98 }}
        aria-label={`Read about ${project.title}`}
      >
        <ProjectArt type={project.art} image={project.image} />
        <span className="project-category">{project.category}</span>
        <span className="project-open">
          <span className="project-open-label">Explore project</span>
          <ArrowUpRight size={25} />
        </span>
      </motion.button>
      <div className="project-meta">
        <h3>
          <button onClick={(event) => onOpen(project, event)}>
            {project.title}
          </button>
        </h3>
        <span>{project.shortTools}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
    </motion.article>
  );
});

export default ProjectCard;
