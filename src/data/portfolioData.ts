export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  short: string;
  stack: string[];
  bullets: string[];
  link?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'jarvis-ai',
    tag: 'AI voice assistant · desktop & mobile',
    title: 'Jarvis: AI Voice Assistant',
    short: 'Voice-first personal assistant: ASP.NET Core backend serving an Electron desktop overlay and a React Native Android app.',
    stack: ['C# / .NET 10', 'ASP.NET Core', 'CQRS / MediatR', 'WebSockets', 'Electron', 'React Native / Expo', 'Three.js', 'PostgreSQL'],
    bullets: [
      'Clean Architecture backend (CQRS) serving REST and WebSocket APIs to a desktop overlay and an Android app.',
      'Command pipeline: a rule-based intent parser for zero-token commands, then an LLM agent loop with tool calling and multi-provider fallback (Groq, Claude, local Ollama).',
      'Speech-to-text (Whisper / whisper.cpp), wake-word detection, neural text-to-speech with viseme lip-sync, and per-device routing that hands calls and app launches to the phone.',
      'Integrates Microsoft Graph (calendar, mail), Home Assistant and weather APIs; secured with token auth, an origin allow-list and DPAPI-encrypted secrets.',
      '260+ automated xUnit tests covering the agent loop, connection handling and reminder parsing.'
    ]
  },
  {
    id: 'daily-briefing',
    tag: 'AI pipeline · personal dashboard',
    title: 'Daily Briefing Dashboard',
    short: 'Automated pipeline that collects work items, calendar, time tracking and expenses, and has an LLM write twice-daily briefings.',
    stack: ['Python', 'Claude API', 'Gmail API', 'Jira REST API', 'Firebase Hosting', 'Firestore'],
    bullets: [
      'Collects Jira work items, calendar and email, time tracking and expenses, then has an LLM write a morning and an end-of-day briefing.',
      'Parses bank alert emails to categorize transactions by date, amount, merchant and category with no manual input.',
      'Private, Google sign-in protected dashboard on Firebase, refreshed every 30 minutes by a scheduled job.',
      'Study planner tab: parses a 12-week plan, matches lecture files to topics, replans around missed days, and schedules spaced review of logged mistakes.'
    ]
  },
  {
    id: 'job-radar',
    tag: 'MCP server · open source',
    title: 'Job Radar: MCP Server for Job Search',
    short: 'MCP server that gives AI agents job-search tools over the official public APIs of company job boards.',
    stack: ['Python', 'Model Context Protocol', 'Greenhouse API', 'Lever API', 'Ashby API'],
    bullets: [
      'Sweeps 17 company job boards (about 2,400 postings per run) through official public APIs.',
      'Title-based filtering, application tracking, and a self-check mode that validates filters and board availability.'
    ],
    link: 'https://github.com/muditvhatt468/job-radar'
  },
  {
    id: 'web-3d',
    tag: 'WebGL · scroll-driven 3D',
    title: 'Interactive 3D Web Experiences',
    short: 'Scroll-driven 3D websites where scroll position drives a camera through a live WebGL scene.',
    stack: ['React', 'React Three Fiber', 'Three.js', 'GSAP', 'Lenis', 'Vite', 'Tailwind CSS'],
    bullets: [
      'Landing page where scroll position drives a spline camera through a live WebGL scene with 480+ instanced meshes and post-processing.',
      'Original automotive concept sites with procedural Three.js vehicles and scroll-directed camera choreography.',
      'A 3D developer portfolio with a drivable rover, and an interactive toy-box scene of motion studies.'
    ]
  },
  {
    id: 'trackmate',
    tag: 'Offline-first mobile',
    title: 'TrackMate Expense Tracker',
    short: 'Offline-first React Native and .NET expense tracker with background sync.',
    stack: ['React Native', 'TypeScript', '.NET', 'JWT', 'Jest', 'GitHub Actions'],
    bullets: [
      'Reduced sync latency by 30% with an optimized local store and background sync; the app works fully offline.',
      'JWT authentication, Jest unit tests and a GitHub Actions CI pipeline.'
    ]
  },
  {
    id: 'ecommerce-api',
    tag: 'High-concurrency backend',
    title: 'E-Commerce REST API',
    short: 'ASP.NET Core and PostgreSQL API tuned for 10,000+ concurrent requests at sub-100 ms latency.',
    stack: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'PostgreSQL'],
    bullets: [
      'Role-based REST API over 8+ normalized PostgreSQL tables with filtering and pagination.',
      'Tuned indexes and query plans to sustain 10k+ concurrent requests under 100 ms.'
    ]
  }
];
