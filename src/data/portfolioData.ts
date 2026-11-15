export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  image?: string;
  imageAlt?: string;
  stack: string[];
}

export interface SkillItem {
  name: string;
  focus: string;
  context: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

export const SITE_IDENTITY = {
  name: 'Muhammad Yousaf',
  role: 'Independent Developer | AI & Software Enthusiast',
  tagline: 'Building ideas into practical software.',
  /**
   * GitHub profile URL and handle.
   */
  githubUrl: 'https://github.com/MrAssasainM',
  githubHandle: 'MrAssasainM',
} as const;

export const ABOUT_CONTENT = {
  heading: 'About',
  lead: 'I am an independent developer and technology enthusiast interested in software development, artificial intelligence, automation, and building useful digital products.',
  body: 'I learn by building real projects, experimenting with technology, testing ideas, and continuously improving my skills.',
} as const;

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'sheikh-banoori',
    title: 'Sheikh Banoori',
    category: 'Web Development',
    description: 'A Website for Sheikh Banoori Hajj And Umrah Agency',
    liveUrl: 'https://sheikh-banoori-site.vercel.app/',
    imageAlt: 'Preview of the Sheikh Banoori Hajj and Umrah Agency web platform',
    stack: ['Web Development', 'Responsive UI', 'Vercel'],
  },
  {
    id: 'opspilot',
    title: 'OpsPilot',
    category: 'Workflow & Operations',
    description:
      'An operations management prototype designed to organize requests, tasks, and workflows.',
    liveUrl: 'https://opspilot-app.base44.app/',
    imageAlt: 'Preview of OpsPilot operations workflow and task management prototype',
    stack: ['Workflow Automation', 'Task Organization', 'Prototype'],
  },
];

/**
 * Add additional projects to this array at any time.
 * Each entry automatically renders in the "More Projects" grid.
 */
export const MORE_PROJECTS: ProjectItem[] = [];

export const SKILLS_LIST: SkillItem[] = [
  {
    name: 'Python',
    focus: 'Scripting & Logic',
    context: 'Writing scripts, small utilities, and experimenting with AI workflows.',
  },
  {
    name: 'JavaScript',
    focus: 'Interactive Web',
    context: 'Building dynamic client-side behavior and modern web interfaces.',
  },
  {
    name: 'Node.js',
    focus: 'Runtime & Tooling',
    context: 'Developing server-side scripts, local tools, and automation tasks.',
  },
  {
    name: 'Web Development',
    focus: 'Frontend Architecture',
    context: 'Structuring responsive, accessible sites and practical web apps.',
  },
  {
    name: 'Git and GitHub',
    focus: 'Version Control',
    context: 'Tracking changes, organizing repositories, and shipping code cleanly.',
  },
  {
    name: 'SQLite',
    focus: 'Lightweight Storage',
    context: 'Structuring simple relational data for local prototypes and tools.',
  },
  {
    name: 'AI and LLMs',
    focus: 'Applied Exploration',
    context: 'Exploring language models, prompt design, and practical AI integrations.',
  },
  {
    name: 'Workflow Automation',
    focus: 'Process Systems',
    context: 'Connecting repetitive steps into clear, dependable digital workflows.',
  },
];

export const LEARNING_JOURNEY: JourneyStep[] = [
  {
    number: '01',
    title: 'Building Real Projects',
    description:
      'Turning practical needs into live web projects rather than keeping concepts confined to tutorials.',
  },
  {
    number: '02',
    title: 'Experimenting with Technology',
    description:
      'Exploring modern web tooling, lightweight databases, and AI capabilities to see what fits best.',
  },
  {
    number: '03',
    title: 'Testing Ideas in Practice',
    description:
      'Prototyping workflows and interfaces early so usability gaps surface through real interaction.',
  },
  {
    number: '04',
    title: 'Continuous Improvement',
    description:
      'Refining code structure, clarity, and reliability with every iteration and newly shipped build.',
  },
];

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;
