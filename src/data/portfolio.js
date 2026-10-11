import cyberRunImage from "../components/img/CyberRun.png";

export const projects = [
  {
    id: "cyber-run",
    title: "Cyber Run",
    category: "Games",
    color: "pink",
    art: "cyber",
    image: cyberRunImage,
    shortTools: "Unreal Engine · Blender",
    status: "Published on itch.io",
    summary:
      "A little momentum. A lot of “one more try.” A 3D parkour platformer.",
    description:
      "A fast-paced 3D platformer built around responsive movement, dynamic hazards, and a cyberpunk world. Created with Unreal Engine and custom assets made in Blender.",
    details: [
      "3D environments and hard-surface assets modeled in Blender.",
      "Player movement, jumping, checkpoints, and obstacle interactions.",
      "A playable release available on itch.io.",
    ],
    tools: ["Unreal Engine", "Blender", "3D modeling", "Game physics"],
    url: "https://kartikesh007.itch.io/cyber-run",
    linkLabel: "Play Cyber Run",
  },
  {
    id: "sky-ruins",
    title: "Sky-Ruins",
    category: "Games",
    color: "blue",
    art: "islands",
    shortTools: "Godot 4 · GDScript",
    status: "In development",
    summary:
      "A world from a seed. Procedural floating islands and a little exploration.",
    description:
      "A procedural level-generation project in Godot 4. Noise-driven island placement and custom editor tools make it possible to experiment with floating worlds and their ruins.",
    details: [
      "Noise-based spatial clustering for floating island layouts.",
      "GDScript editor tools for adjusting generation parameters.",
      "Exploration of terrain, atmosphere, and world-building workflows.",
    ],
    tools: ["Godot 4", "GDScript", "Procedural generation", "Editor tools"],
    url: "https://github.com/Kartikesh07",
    linkLabel: "Visit my GitHub",
  },
  {
    id: "runtime-tools",
    title: "Tools for making worlds",
    category: "Tools",
    color: "yellow",
    art: "gizmo",
    shortTools: "Unreal Engine · C++",
    status: "Engine tooling",
    summary:
      "Translate, rotate, create. Runtime tools that put ideas into motion.",
    description:
      "A runtime transform-gizmo framework for spatial manipulation in Unreal Engine. Developed in C++ for moving, rotating, and scaling objects inside an interactive scene.",
    details: [
      "Translate, rotate, and scale controls across three axes.",
      "Screen-to-world raycasting and constrained object movement.",
      "Tools for runtime editing and spatial debugging.",
    ],
    tools: ["Unreal Engine", "C++", "Raycasting", "Spatial mathematics"],
    url: "https://github.com/Kartikesh07",
    linkLabel: "Visit my GitHub",
  },
  {
    id: "ai-web",
    title: "Code meets intelligence",
    category: "Web & AI",
    color: "mint",
    art: "web",
    shortTools: "React · Python · Supabase",
    status: "Full-stack experiments",
    summary:
      "From data to a useful experience. Exploring the creative side of full-stack AI.",
    description:
      "Web and data experiments connecting Python-powered analysis with React interfaces and cloud data storage, drawing on my background in AI & Data Science.",
    details: [
      "Python data processing and analysis workflows.",
      "Responsive interfaces built with React.",
      "Backend and cloud database integration.",
    ],
    tools: ["React", "Python", "AI & Data Science", "Supabase"],
    url: "https://github.com/Kartikesh07",
    linkLabel: "Explore my GitHub",
  },
];

export const experience = [
  {
    company: "GameWise",
    role: "Game Developer Intern",
    period: "2024 — present",
    field: "Game development",
    description:
      "Building gameplay mechanics and real-time interaction systems, refining player movement, and working with asset integration and playtesting.",
  },
  {
    company: "Kravos Tech",
    role: "Full Stack AI Developer Intern",
    period: "2024",
    field: "Web & AI",
    description:
      "Worked on Python data pipelines, machine-learning API integration, and responsive React interfaces for analytics.",
  },
  {
    company: "Rural Games",
    role: "Development Lead Intern",
    period: "2023 — 2024",
    field: "Mobile games",
    description:
      "Worked on core gameplay architecture for a mobile title, developer collaboration, touch interactions, and mobile rendering performance.",
  },
  {
    company: "CodeNucleus Solutions",
    role: "Software Engineering Intern",
    period: "2023",
    field: "Software",
    description:
      "Built web features and reusable interface components, integrated APIs, and worked on application state and database queries.",
  },
  {
    company: "Solapur Municipal Corporation",
    role: "Technical Systems Intern",
    period: "2022 — 2023",
    field: "Civic technology",
    description:
      "Contributed to digital reporting and administrative interfaces, data migration, and verification workflows for municipal services.",
  },
];
