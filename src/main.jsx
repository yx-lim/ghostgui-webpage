import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.mjs';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import BookOpen from 'lucide-react/dist/esm/icons/book-open.mjs';
import Menu from 'lucide-react/dist/esm/icons/menu.mjs';
import X from 'lucide-react/dist/esm/icons/x.mjs';
import './styles.css';

import logoUrl from '../assets/ghostlogo.png';
import interfaceUrl from '../assets/ghostgui-interface.png';
import keyframesUrl from '../assets/keyframes.png';
import pipelineUrl from '../assets/motiongen-pipeline.png';
import demoUrl from '../assets/hand-motion-design.mp4';

const GITHUB_URL = 'https://github.com/yx-lim/ghostgui';
const DOCS_URL = `${GITHUB_URL}/blob/main/docs/README.md`;
const INSTALL_URL = `${GITHUB_URL}/blob/main/docs/install.md`;

const navItems = [
  ['Features', '#features'],
  ['Demo', '#demo'],
  ['Pipeline', '#pipeline'],
  ['Research', '#research'],
  ['Install', '#install'],
];

const features = [
  {
    title: 'Direct robot editing',
    copy: 'Move end-effectors with a 3D transform gizmo or edit joint angles directly.',
  },
  {
    title: 'Preview before committing',
    copy: 'Inspect intermediate poses and constraint feedback before a keyframe becomes part of the motion.',
  },
  {
    title: 'Motion timeline editing',
    copy: 'Insert, shift, move, scale, copy, reverse, repeat, and ping-pong.',
  },
  {
    title: 'Built for robotics pipelines',
    copy: 'Import and export references for simulation, retargeting, and learning workflows.',
  },
];

const pipelineStages = [
  {
    name: 'GhostGUI',
    action: 'Create motion',
    links: [{ label: 'Code', href: GITHUB_URL }],
  },
  {
    name: 'DSMS',
    action: 'Optimize dynamic feasibility',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2608.03116' },
      { label: 'Code', href: 'https://github.com/sesteban951/shooting-for-contact' },
    ],
  },
  {
    name: 'Motion-imitation RL',
    action: 'Train tracking policy',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2601.22074' },
      { label: 'Code', href: 'https://github.com/mujocolab/mjlab' },
    ],
  },
  {
    name: 'Unitree G1',
    action: 'Execute on hardware',
    links: [{ label: 'Code', href: 'https://github.com/sesteban951/deploy_robot' }],
  },
];

const models = [
  ['G1', 'Humanoid'],
  ['H2', 'Humanoid'],
  ['Go2', 'Quadruped'],
  ['Z1', 'Manipulator'],
];

const relatedResearch = [
  ['Shooting for Contact', 'https://arxiv.org/abs/2608.03116'],
  ['mjlab', 'https://arxiv.org/abs/2601.22074'],
  ['BeyondMimic', 'https://arxiv.org/abs/2508.08241'],
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="GhostGUI home">
      <img src={logoUrl} alt="" width="44" height="44" />
      <span>GhostGUI</span>
    </a>
  );
}

function OutboundLink({ href, children, className = '' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <OutboundLink href={GITHUB_URL} className="github-link">
          GitHub
        </OutboundLink>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero page-shell" id="top">
      <div className="hero-copy">
        <h1>Motion,<br /><span>by design.</span></h1>
        <p>
          Create and edit kinematic reference motion with 3D manipulation, preview paths,
          keyframe timelines, and export into robotics learning pipelines.
        </p>
        <div className="hero-actions">
          <OutboundLink href={GITHUB_URL} className="button button-primary">
            View on GitHub
          </OutboundLink>
          <a className="button button-secondary" href="#pipeline">
            Explore the pipeline
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <figure className="hero-media">
        <img
          src={interfaceUrl}
          alt="GhostGUI editing a Unitree G1 hand target in a 3D viewport, with target controls, inverse-kinematics weights, and a keyframe timeline."
          width="2880"
          height="1800"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    </section>
  );
}

function FeaturesAndDemo() {
  return (
    <section className="dark-band" id="features">
      <div className="page-shell features-grid">
        <div className="features-heading">
          <h2>Edit motion,<br />not arrays.</h2>
        </div>
        <figure className="keyframe-media">
          <img
            src={keyframesUrl}
            alt="Keyframe preview with translucent intermediate Unitree G1 poses and the active orange pose controlled by a transform gizmo."
            width="890"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="feature-list">
          {features.map((feature, index) => (
            <article className="feature-row" key={feature.title}>
              <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="page-shell demo" id="demo">
        <div className="demo-heading">
          <h2>Watch a motion take shape.</h2>
          <p className="demo-sequence" aria-label="Manipulate, then preview, commit, generate, and play back">
            <span>Manipulate</span><ArrowRight /><span className="blue">Preview</span><ArrowRight />
            <span className="orange">Commit</span><ArrowRight /><span>Generate</span><ArrowRight /><span>Playback</span>
          </p>
        </div>
        <div className="video-frame">
          <video
            controls
            playsInline
            preload="metadata"
            poster={interfaceUrl}
            aria-label="Eighteen-second GhostGUI demonstration showing robot motion manipulation, preview, keyframe generation, and playback"
          >
            <source src={demoUrl} type="video/mp4" />
            Your browser does not support embedded video.{' '}
            <a href={demoUrl}>Download the GhostGUI demonstration</a>.
          </video>
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className="pipeline page-shell" id="pipeline">
      <div className="section-heading">
        <h2>From motion to hardware<span className="orange">.</span></h2>
        <p>
          GhostGUI authors the kinematic reference. Dynamics-aware retargeting,
          motion-imitation learning, and deployment tooling carry it toward the physical robot.
        </p>
      </div>

      <figure className="pipeline-figure-scroll">
        <img
          src={pipelineUrl}
          alt="GhostGUI motion pipeline: create motion in GhostGUI, optimize dynamic feasibility with DSMS, train a motion-imitation tracking policy, and execute it on Unitree G1 hardware."
          width="1983"
          height="793"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="pipeline-stages">
        {pipelineStages.map((stage) => (
          <article className="pipeline-stage" key={stage.name}>
            <h3>{stage.name}</h3>
            <p>{stage.action}</p>
            <div className="stage-links">
              {stage.links.map((link) => (
                <OutboundLink href={link.href} key={link.label}>
                  {link.label}
                </OutboundLink>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  const flow = ['Kinematic reference', 'DSMS', 'Motion-imitation RL', 'Policy tracking performance'];

  return (
    <section className="research page-shell" id="research">
      <h2>How does reference quality propagate through the humanoid motion pipeline<span className="orange">?</span></h2>
      <div className="research-detail">
        <p>
          GhostGUI was developed as part of research examining how keyframe density,
          feasibility, and smoothness affect dynamics-aware retargeting and downstream
          motion-imitation learning.
        </p>
        <ol className="research-flow">
          {flow.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </div>
    </section>
  );
}

function Models() {
  return (
    <section className="models page-shell" aria-labelledby="models-heading">
      <div className="models-heading">
        <h2 id="models-heading">Multi-robot and extensible.</h2>
        <p>Import additional MuJoCo XML and URDF models.</p>
      </div>
      <div className="model-rail">
        {models.map(([name, type]) => (
          <article key={name}>
            <strong>{name}</strong>
            <span>{type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Install() {
  return (
    <section className="install" id="install">
      <div className="page-shell install-grid">
        <div className="install-copy">
          <h2>Get GhostGUI.</h2>
          <p>
            Linux / Ubuntu — primary<br />
            macOS and Windows — experimental
          </p>
          <div className="install-actions">
            <OutboundLink href={INSTALL_URL} className="button button-light">
              <BookOpen aria-hidden="true" />
              Installation guide
            </OutboundLink>
            <OutboundLink href={GITHUB_URL} className="button button-on-blue">
              View on GitHub
            </OutboundLink>
          </div>
        </div>
        <div className="terminal" aria-label="GhostGUI installation commands">
          <code><span>git clone</span> https://github.com/yx-lim/ghostgui.git</code>
          <code><span>cd</span> ghostgui</code>
          <code><span>bash</span> scripts/install_linux.sh</code>
          <code><span>bash</span> scripts/run_linux.sh</code>
        </div>
      </div>
    </section>
  );
}

function RelatedAndCredits() {
  return (
    <section className="related page-shell">
      <div>
        <h2>Related research</h2>
        <div className="related-links">
          {relatedResearch.map(([label, href]) => (
            <OutboundLink href={href} key={label}>{label}</OutboundLink>
          ))}
        </div>
      </div>
      <div className="credits">
        <h2>Credits</h2>
        <p>GhostGUI was developed during research in the <strong>AMBER Lab at Caltech.</strong></p>
        <p className="mentorship">Research mentorship — Aaron D. Ames · Sergio A. Esteban · Junheng Li</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <div>
          <Brand />
          <p>Interactive motion authoring for robots.</p>
        </div>
        <nav aria-label="Footer navigation">
          <OutboundLink href={GITHUB_URL}>GitHub repository</OutboundLink>
          <OutboundLink href={DOCS_URL}>Documentation</OutboundLink>
        </nav>
        <small>© 2026 GhostGUI</small>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesAndDemo />
        <Pipeline />
        <Research />
        <Models />
        <Install />
        <RelatedAndCredits />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
