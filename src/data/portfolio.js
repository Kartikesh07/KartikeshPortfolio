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
    id: "arcchain",
    title: "ArcChain",
    category: "Unreal systems",
    color: "blue",
    art: "arcchain",
    shortTools: "Unreal Engine · C++",
    status: "Electricity propagation",
    summary:
      "One spark. A chain reaction. An electricity propagation system built in Unreal Engine.",
    description:
      "An Unreal Engine electricity system exploring how an electrical impulse travels between connected targets. ArcChain brings chain propagation and its visual feedback into a real-time gameplay system.",
    details: [
      "Electricity chain propagation between connected targets.",
      "Real-time visual feedback for electrical connections.",
      "Built as an Unreal Engine project with C++ source.",
    ],
    tools: ["Unreal Engine", "C++", "Gameplay systems", "Electricity VFX"],
    url: "https://github.com/Kartikesh07/ArcChain",
    linkLabel: "View ArcChain source",
  },
  {
    id: "reactive-shield",
    title: "Reactive Energy Shield",
    category: "Unreal systems",
    color: "yellow",
    art: "shield",
    shortTools: "Unreal Engine · C++",
    status: "Reactive shield & VFX",
    summary:
      "Every impact leaves a mark. A reactive shield with ripples, fractures, and energy-driven VFX.",
    description:
      "An Unreal Engine energy shield that responds to incoming impacts. Impact ripples, energy depletion, fractures, and visual effects communicate the shield’s changing state.",
    details: [
      "Impact ripples that make contact points visible.",
      "Energy depletion and fractures tied to shield response.",
      "VFX that communicate impact and changing shield state.",
    ],
    tools: ["Unreal Engine", "C++", "Materials", "VFX"],
    url: "https://github.com/Kartikesh07/ReactiveShield",
    linkLabel: "View shield source",
  },
  {
    id: "visionforge",
    title: "VisionForge",
    category: "Web & AI",
    color: "green",
    art: "visionforge",
    shortTools: "PyTorch · ResNet18 · Grad-CAM",
    status: "Computer vision prototype",
    summary:
      "Look closer. Steel surface defect classification with a visual explanation of the prediction.",
    description:
      "A PyTorch steel surface defect classifier comparing a custom CNN with ResNet18 transfer learning on NEU-CLS. A Streamlit dashboard presents class predictions, probabilities, and Grad-CAM visual explanations. This is an inspection prototype, not a validated factory quality-control system.",
    details: [
      "Classification across six steel surface defect types.",
      "Custom CNN and ResNet18 model comparison with held-out evaluation.",
      "Grad-CAM highlights regions influencing a prediction; it is not defect segmentation.",
    ],
    tools: ["Python", "PyTorch", "ResNet18", "Grad-CAM", "Streamlit"],
    url: "https://github.com/Kartikesh07/VisionForge",
    linkLabel: "View VisionForge source",
  },
];

export const experience = [
  {
    company: "GameWise",
    role: "Game Developer Intern",
    period: "Aug 2026 — present",
    field: "Game development",
    description:
      "Building gameplay mechanics and real-time interaction systems, refining player movement, and working with asset integration and playtesting.",
  },
  {
    company: "Kravos Tech",
    role: "Full Stack AI Developer Intern",
    period: "May 2026 — Aug 2026",
    field: "Web & AI",
    description:
      "Worked on Python data pipelines, machine-learning API integration, and responsive React interfaces for analytics.",
  },
  {
    company: "Rural Games",
    role: "Development Lead Intern",
    period: "Jun 2026 - Aug 2026",
    field: "Mobile games",
    description:
      "Worked on core gameplay architecture for a mobile title, developer collaboration, touch interactions, and mobile rendering performance.",
  },
  {
    company: "CodeNucleus Solutions",
    role: "Software Engineering Intern",
    period: "April 2025 — May 2025",
    field: "Software",
    description:
      "Built web features and reusable interface components, integrated APIs, and worked on application state and database queries.",
  },
  {
    company: "Solapur Municipal Corporation",
    role: "Technical Systems Intern",
    period: "Jun 2025 - Jan 2026",
    field: "Civic technology",
    description:
      "Contributed to digital reporting and administrative interfaces, data migration, and verification workflows for municipal services.",
  },
];
