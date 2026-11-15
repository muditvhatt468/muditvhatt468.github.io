import React, { useState } from 'react';
import ArgonScene from './components/ArgonScene';
import { CATEGORIES, PROJECTS, ProjectItem } from './data/portfolioData';

export default function App() {
  const [station, setStation] = useState(0);
  const [driveMode, setDriveMode] = useState(false);
  const [filter, setFilter] = useState<'all' | ProjectItem['category']>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [coords, setCoords] = useState({ x: -3.0, z: 6.0 });

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  const jumpToStation = (idx: number) => {
    setDriveMode(false);
    setStation(idx);
    const el = document.getElementById(`section-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <ArgonScene
        driveMode={driveMode}
        stationIndex={station}
        onSelectProject={(p) => setSelectedProject(p)}
        onUpdateCoords={(x, z) => setCoords({ x, z })}
      />

      {/* Top Navigation HUD */}
      <header className="fixed top-0 left-0 right-0 z-30 p-4 md:px-8 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="glass pointer-events-auto px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <span className="font-bold tracking-wider text-white text-sm md:text-base">MUDIT.BHATT</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              FULL STACK DEVELOPER
            </span>
          </div>
        </div>

        <nav className="glass pointer-events-auto px-2 py-1.5 rounded-2xl flex items-center gap-1 text-xs md:text-sm font-mono">
          {['01. CORE', '02. PROJECTS', '03. ARCHITECTURE', '04. LABS & AI', '05. CONTACT'].map((label, idx) => (
            <button
              key={label}
              onClick={() => jumpToStation(idx)}
              className={`px-3 py-1.5 rounded-xl transition ${
                station === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="glass pointer-events-auto px-3.5 py-2 rounded-2xl hidden lg:flex items-center gap-3 text-xs font-mono text-slate-300">
          <span className="text-cyan-400 font-semibold">R3F ROVER:</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">W A S D</span>
          <span>X: {coords.x.toFixed(1)} Z: {coords.z.toFixed(1)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-32 space-y-32 pointer-events-none">
        {/* HERO */}
        <section id="section-0" className="min-h-[75vh] flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass pointer-events-auto text-xs font-mono text-cyan-300 border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Open to Product Engineering & Full-Stack Roles
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500">Full-Stack Systems</span> & AI Agents.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed glass p-5 rounded-2xl pointer-events-auto">
              Hey, I’m <strong className="text-white">Mudit Bhatt</strong>, a Full Stack Developer and Tech Lead in Delhi NCR. I build end-to-end products on my own: LLM voice assistants, AI agents with tool use, clean-architecture <span className="font-mono text-emerald-300">.NET</span> backends, <span className="font-mono text-cyan-300">React</span> and <span className="font-mono text-cyan-300">React Native</span> apps, and automated data pipelines on <span className="font-mono text-purple-300">PostgreSQL</span>.
            </p>

            <div className="flex flex-wrap gap-3 pointer-events-auto">
              <button
                onClick={() => jumpToStation(1)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide hover:opacity-95 transition"
              >
                EXPLORE PROJECTS →
              </button>
              <button
                onClick={() => setDriveMode(!driveMode)}
                className={`px-5 py-3 rounded-xl glass glass-hover font-medium text-sm font-mono flex items-center gap-2 ${
                  driveMode ? 'text-emerald-300 border-emerald-400' : 'text-cyan-300'
                }`}
              >
                {driveMode ? '⚡ EXIT ROVER CAMERA' : '🎮 DRIVE 3D ROVER (WASD)'}
              </button>
              <a href="https://github.com/muditvhatt468" target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl glass glass-hover text-slate-200 text-sm font-mono">
                GitHub ↗
              </a>
              <a href="https://linkedin.com/in/mudit-bhatt-799348221" target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl glass glass-hover text-slate-200 text-sm font-mono">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="section-1" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">// STATION 02 — PROJECTS</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Things I Built</h2>
            </div>
            <div className="glass pointer-events-auto p-1.5 rounded-xl inline-flex flex-wrap gap-1 text-xs font-mono">
              {(['all', ...CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg uppercase transition ${
                    filter === cat ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pointer-events-auto">
            {filteredProjects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="glass glass-hover rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">{p.tag}</span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300">0{idx + 1} ↗</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{p.short}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE HIGHLIGHTS */}
        <section id="section-2" className="space-y-8 pointer-events-auto">
          <div>
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">// STATION 03 — SYSTEM ARCHITECTURE</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Engineering Deep-Dives</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 space-y-3 border-l-4 border-l-cyan-400">
              <div className="text-xs font-mono text-cyan-300">RULES FIRST • LLM SECOND • 260+ TESTS</div>
              <h3 className="text-xl font-bold text-white">Jarvis Command Pipeline</h3>
              <p className="text-sm text-slate-300">
                Every spoken command first hits a rule-based intent parser, so common commands cost zero tokens and answer instantly. Only what the rules miss goes to an LLM agent loop with tool calling, which falls back across <code className="text-cyan-300">Groq</code>, <code className="text-cyan-300">Claude</code> and local <code className="text-cyan-300">Ollama</code> when a provider fails.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 space-y-3 border-l-4 border-l-purple-400">
              <div className="text-xs font-mono text-purple-300">17 JOB BOARDS • ~2,400 POSTINGS PER RUN</div>
              <h3 className="text-xl font-bold text-white">Job Radar: Tools for AI Agents over MCP</h3>
              <p className="text-sm text-slate-300">
                An MCP server that exposes job search as tools any AI agent can call. It reads only the official public APIs of <code className="text-purple-300">Greenhouse</code>, <code className="text-purple-300">Lever</code> and <code className="text-purple-300">Ashby</code>, and ships a self-check mode that validates filters and board availability.
              </p>
            </div>
          </div>
        </section>

        {/* LABS & EDUCATION */}
        <section id="section-3" className="glass p-6 sm:p-8 rounded-2xl pointer-events-auto space-y-4">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// STATION 04 — CAREER & EDUCATION</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-mono text-cyan-300">MAR 2025 – PRESENT</div>
              <div className="font-bold text-white">Full Stack Developer (Tech Lead)</div>
              <div className="text-xs text-slate-400">Exponent Solutions • Delhi NCR</div>
            </div>
            <div>
              <div className="text-xs font-mono text-purple-300">JUL 2024 – SEP 2024</div>
              <div className="font-bold text-white">Web Developer Intern</div>
              <div className="text-xs text-slate-400">Cognifyz Technologies (15% Faster Load)</div>
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-300">2021 – 2025</div>
              <div className="font-bold text-white">B.Tech CSE — GGSIPU</div>
              <div className="text-xs text-slate-400">GPA: 8.4 / 10.0</div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="section-4" className="glass rounded-3xl p-8 border border-cyan-500/30 pointer-events-auto space-y-4">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// STATION 05 — CONNECT</div>
          <h2 className="text-3xl font-bold text-white">Let’s Build Together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono pt-2">
            <a href="mailto:muditbhatt2003@gmail.com" className="glass glass-hover p-3.5 rounded-xl text-cyan-300">muditbhatt2003@gmail.com</a>
            <a href="https://linkedin.com/in/mudit-bhatt-799348221" target="_blank" rel="noreferrer" className="glass glass-hover p-3.5 rounded-xl text-emerald-300">linkedin.com/in/mudit-bhatt</a>
            <a href="https://github.com/muditvhatt468" target="_blank" rel="noreferrer" className="glass glass-hover p-3.5 rounded-xl text-purple-300">github.com/muditvhatt468</a>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md pointer-events-auto">
          <div className="glass max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-cyan-400/40 space-y-5 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono"
            >
              ✕
            </button>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{selectedProject.tag}</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedProject.title}</h3>
            <p className="text-slate-300 text-sm sm:text-base">{selectedProject.short}</p>
            <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
              {selectedProject.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="inline-block text-sm font-mono text-cyan-300 underline">
                View source ↗
              </a>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.stack.map((s) => (
                <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
