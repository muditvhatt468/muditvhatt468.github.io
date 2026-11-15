import { PROJECTS } from './data/portfolioData';

const GITHUB = 'https://github.com/muditvhatt468';
const LINKEDIN = 'https://linkedin.com/in/mudit-bhatt-799348221';
const EMAIL = 'muditbhatt2003@gmail.com';

const NOTES = [
  {
    stat: 'Rules first, LLM second · 260+ tests',
    title: 'The Jarvis command pipeline',
    body: 'Every spoken command first hits a rule-based intent parser, so common commands cost zero tokens and answer instantly. Only what the rules miss goes to an LLM agent loop with tool calling, which falls back across Groq, Claude and local Ollama when a provider fails.',
  },
  {
    stat: '17 job boards · about 2,600 postings per sweep',
    title: 'Job search as tools for AI agents',
    body: 'Job Radar is an MCP server that exposes job search as tools any agent can call. It reads only the official public APIs of Greenhouse, Lever and Ashby, and ships a self-check mode that validates filters and board availability.',
  },
];

const TIMELINE = [
  { when: 'Mar 2025 – now', what: 'Full Stack Developer (Tech Lead)', where: 'Exponent Solutions · Delhi NCR' },
  { when: 'Jul – Sep 2024', what: 'Web Developer Intern', where: 'Cognifyz Technologies · Remote' },
  { when: '2021 – 2025', what: 'B.Tech, Computer Science and Engineering', where: 'GGSIPU, Delhi · GPA 8.4 / 10' },
];

const ext = { target: '_blank', rel: 'noreferrer' };

export default function App() {
  return (
    <div className="wrap" id="top">
      <header className="top">
        <a className="name" href="#top">Mudit Bhatt</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#notes">Notes</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Full stack developer · Delhi NCR · open to product engineering roles</p>
          <h1>I build <em>AI agents</em>, .NET backends and the apps on top of them.</h1>
          <p className="lede">
            I’m <strong>Mudit Bhatt</strong>. I take products from an empty repo to something people use every day:
            voice assistants, agents with tool use, clean-architecture backends, and React and React Native apps.
          </p>
          <p className="links">
            <a href={GITHUB} {...ext}>GitHub ↗</a>
            <a href={LINKEDIN} {...ext}>LinkedIn ↗</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </p>
        </section>

        <section className="block" id="work">
          <h2>Selected work</h2>
          <ol className="work">
            {PROJECTS.map((p, i) => (
              <li key={p.id}>
                <details name="work">
                  <summary>
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="title">{p.title}</span>
                      <span className="tag">{p.tag}</span>
                      <span className="short">{p.short}</span>
                    </span>
                    <span className="plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="detail">
                    <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                    <p className="stack">{p.stack.join(' · ')}</p>
                    {p.link && <a className="src" href={p.link} {...ext}>View source ↗</a>}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </section>

        <section className="block" id="notes">
          <h2>How I build</h2>
          <div className="notes">
            {NOTES.map((n) => (
              <article key={n.title}>
                <span className="stat">{n.stat}</span>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="block" id="about">
          <h2>Experience</h2>
          <dl className="rows">
            {TIMELINE.map((t) => (
              <div key={t.what}>
                <dt>{t.when}</dt>
                <dd>{t.what}<span>{t.where}</span></dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="block contact" id="contact">
          <h2>Contact</h2>
          <div>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p>
              <a href={GITHUB} {...ext}>GitHub ↗</a>
              <a href={LINKEDIN} {...ext}>LinkedIn ↗</a>
            </p>
          </div>
        </section>
      </main>

      <footer>© 2026 Mudit Bhatt</footer>
    </div>
  );
}
