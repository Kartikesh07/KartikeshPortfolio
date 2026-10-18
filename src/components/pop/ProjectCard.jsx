import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectArt } from "./Illustrations";
export default function ProjectCard({
  project,
  onOpen,
  paused
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, {
    stiffness: 160,
    damping: 25
  });
  const y = useSpring(pointerY, {
    stiffness: 160,
    damping: 25
  });
  const rotateX = useTransform(y, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-2, 2]);
  function move(event) {
    if (paused || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }
  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }
  return <article className={`project-card project-${project.id}`}>
    <motion.button className={`project-art ${project.color}`} onClick={event => onOpen(project, event)} onPointerMove={move} onPointerLeave={reset} onBlur={reset} style={{
      rotateX: paused ? 0 : rotateX,
      rotateY: paused ? 0 : rotateY,
      transformPerspective: 1200
    }} whileTap={paused ? undefined : {
      scale: 0.99
    }} aria-label={`Explore ${project.title}`}>
      <div className="project-art-inner">
        <ProjectArt type={project.art} image={project.image} />
      </div>
      <span className="project-open">
        <ArrowUpRight size={24} aria-hidden="true" />
      </span>
    </motion.button>
    <div className="project-caption">
      <span>
        {project.category}
      </span>
      <span>
        {project.image ? "Gameplay image" : "Original illustration"}
      </span>
    </div>
    <div className="project-meta">
      <h3>
        <button onClick={event => onOpen(project, event)}>
          {project.title}
        </button>
      </h3>
      <ArrowUpRight size={22} aria-hidden="true" />
    </div>
    <p className="project-summary">
      {project.summary}
    </p>
    <p className="project-tools">
      {project.shortTools}
    </p>
  </article>;
}
