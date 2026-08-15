// Signal Noir reminder: cinematic visual language, bold readable type, and precise proof-of-work layouts.
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ExternalLink, Github, Mail, MapPin, Menu, X } from "lucide-react";
import EvilEye from "@/components/EvilEye";
import AccordionGallery from "@/components/AccordionGallery";

const projects = [
  { number: "01", title: "CrimeVision AI", eyebrow: "AI / VISUAL ANALYTICS", description: "An explainable AI command center prototype for the Karnataka State Police, visualizing crime hotspots, emerging trends, suspect networks, and risk assessments.", tags: ["Explainable AI", "Data Viz", "Dashboard"], href: "https://crimevision-ai-cqetlerx.onslate.in/", image: "/manus-storage/crimevision-visual-v2_fe92ba8f.png" },
  { number: "02", title: "Smart Energy Monitoring", eyebrow: "IOT / TELEMETRY", description: "An end-to-end monitoring system combining ESP32 simulation, Thingspeak telemetry, PIR occupancy cutoffs, tariff calculation, and AI-assisted load optimization.", tags: ["ESP32", "Thingspeak", "AI"], href: "https://smart-energy-monitoring-nu.vercel.app/", image: "/manus-storage/energy-visual-v2_7eb41aea.png" },
  { number: "03", title: "Smart Traffic Violation System", eyebrow: "PHP / DATABASE SYSTEM", description: "A centralized platform for managing drivers, vehicles, violations, and payments through a structured, responsive interface designed to reduce manual record keeping.", tags: ["PHP", "MySQL", "Responsive UI"], href: "https://smart-traffic-violation-system-xi.vercel.app/admin/login.php", image: "/manus-storage/traffic-visual-v2_49a7515d.png" },
];

const skills = [
  ["Frontend", "HTML5", "CSS3", "JavaScript", "Responsive design"],
  ["Languages", "Python", "C", "C++", "PHP"],
  ["Data & tools", "Supabase", "PostgreSQL", "Git & GitHub", "VS Code", "XAMPP"],
];

const certifications = [
  { issuer: "SRM Institute", title: "SRM Chennai Hackathon", detail: "Recognized among the Top 50 teams for presenting an innovative solution, explaining the problem clearly, and demonstrating thoughtful problem-solving. The recognition reflects both technical creativity and confident communication." },
  { issuer: "MongoDB", title: "MongoDB Basics for Students", detail: "A practical introduction to MongoDB fundamentals, document databases, collections, queries, and the core ideas student developers use to build data-driven applications. It builds a practical starting point for working with modern application data." },
  { issuer: "MongoDB", title: "AI and Innovation", detail: "Explores how MongoDB supports resilient AI strategies through flexible data models, reliable application architecture, and a foundation that can adapt as intelligent products grow. The focus is on making AI systems dependable as their data and usage expand." },
  { issuer: "MongoDB", title: "AI-Powered Search", detail: "Covers how vector search connects semantic embeddings with application data to build AI-powered discovery experiences that return more useful and context-aware results. The approach is useful for building search experiences that feel natural and relevant." },
  { issuer: "MongoDB", title: "RAG Apps", detail: "Introduces the building blocks of RAG applications, from retrieving relevant context to grounding generated responses with MongoDB-backed knowledge and structured data. It helps connect retrieval, context, and generation into a more grounded user experience." },
  { issuer: "MongoDB", title: "AI Agents", detail: "Explores the foundations of AI agents, including tool use, memory, retrieval, and the role of MongoDB in helping agents work with persistent application context. The ideas connect intelligent behavior with real application workflows." },
  { issuer: "MathWorks", title: "MATLAB Onramp", detail: "Hands-on certification covering MATLAB basics, matrix operations, scripting, visualization, and scientific computing workflows for solving technical problems. The course emphasizes learning by building and testing solutions step by step." },
  { issuer: "MATLAB", title: "Statistics Certification", detail: "Covers probability, statistical methods, data interpretation, and analytical reasoning fundamentals that support machine learning and scientific decision-making. These fundamentals support clearer reasoning from real-world datasets." },
  { issuer: "MATLAB", title: "Linear Algebra", detail: "Covers vector spaces, matrices, linear transformations, and the mathematical structures that form a foundation for machine learning and engineering systems. The concepts provide a strong base for understanding technical models." },
  { issuer: "CyberSecurity", title: "Cybersecurity Foundation", detail: "Introduces core cybersecurity principles, common digital risks, safe practices, and the responsible habits needed to protect systems and information. The training encourages careful, responsible behavior in digital environments." },
];

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <div className="section-label"><span>{number}</span><i />{children}</div>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(motion.matches);
    onMotion();
    motion.addEventListener("change", onMotion);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => { motion.removeEventListener("change", onMotion); window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }); setMenuOpen(false); };

  return (
    <div className="portfolio-shell">
      <div className="grain" aria-hidden="true" />
      <div className="global-eye-layer" aria-hidden="true"><EvilEye reducedMotion={reducedMotion} /></div>
      <div className="page-veil" aria-hidden="true" />
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <button className="wordmark" onClick={() => scrollTo("top")} aria-label="Return to top"><span className="wordmark-mark">◒</span>THAYA<span className="wordmark-dot">.</span></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <button onClick={() => scrollTo("profile")}>Profile</button><button onClick={() => scrollTo("work")}>Work</button><button onClick={() => scrollTo("toolkit")}>Toolkit</button><button onClick={() => scrollTo("certifications")}>Certifications</button><button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title"><div className="hero-copy reveal is-visible"><div className="eyebrow"><span className="pulse-dot" /> AVAILABLE FOR FRONTEND OPPORTUNITIES</div><h1 id="hero-title">Interfaces for<br /><em>systems</em> that<br />deserve to be understood.</h1><p className="hero-summary">I’m <span className="hero-name">R Thayananth</span>, a computer science student and frontend developer turning complex ideas into useful, interactive web experiences.</p><div className="hero-actions"><button className="signal-button" onClick={() => scrollTo("work")}>Trace the work <ArrowDownRight size={17} /></button><a className="text-link" href="https://github.com/thaya-fr" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a></div></div><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16} /></div></section>
        <div className="signal-divider"><span /><span /><span /></div>
        <section id="profile" className="section profile-section"><div className="section-aside reveal"><SectionLabel number="01">PROFILE</SectionLabel><span className="aside-note">A builder with a<br />curious eye.</span></div><div className="profile-content reveal"><h2>I turn complex ideas into <span>clear, interactive</span> web experiences.</h2><p>Currently pursuing my second year of B.E. Computer Science and Engineering at Sri Ramakrishna Institute of Technology, I enjoy connecting thoughtful frontend design with practical backend systems.</p><div className="profile-facts"><div><small>LOCATION</small><strong><MapPin size={14} /> Theni, Tamil Nadu</strong></div><div><small>FOCUS</small><strong>Frontend development</strong></div><div><small>LANGUAGES</small><strong>Tamil · English · Hindi</strong></div></div></div></section>
        <section id="work" className="section work-section"><div className="section-header reveal"><div><SectionLabel number="02">SELECTED WORK</SectionLabel><h2>Built to make<br /><span>signals visible.</span></h2></div><p>Projects across AI, IoT, and management systems—each one a study in making dense information easier to act on.</p></div><div className="project-list">{projects.map((project, index) => <article className={`project-card reveal project-${index + 1}`} key={project.title}><div className="project-visual"><img src={project.image} alt="" /><div className="visual-wash" /><span className="project-number">{project.number}</span><a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ExternalLink size={18} /></a></div><div className="project-info"><div className="project-eyebrow">{project.eyebrow}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target="_blank" rel="noreferrer">View live demo <ArrowUpRight size={15} /></a></div></article>)}</div></section>
        <section id="toolkit" className="section toolkit-section"><div className="section-aside reveal"><SectionLabel number="03">TOOLKIT</SectionLabel><span className="aside-note">The materials<br />behind the signal.</span></div><div className="toolkit-content reveal"><h2>A practical stack,<br /><span>always learning.</span></h2><div className="skills-grid">{skills.map(([label, ...items]) => <div className="skill-group" key={label}><small>{label}</small>{items.map((item) => <div className="skill-item" key={item}>{item}<span>↗</span></div>)}</div>)}</div></div></section>
        <section id="certifications" className="section certifications-section"><div className="section-aside reveal"><SectionLabel number="04">CERTIFICATIONS</SectionLabel></div><div className="certifications-content reveal"><h2>Learning that<br /><span>keeps compounding.</span></h2><p className="certification-note">Proof of curiosity.</p><AccordionGallery items={certifications.map((cert) => ({ issuer: cert.issuer, label: cert.title, description: cert.detail }))} defaultIndex={0} accentColor="#ff6f37" overlayColor="#120b07" textColor="#fffaf4" height={300} expandRatio={0.56} radius={18} duration={0.82} /></div></section>
        <section className="section journey-section"><div className="section-aside reveal"><SectionLabel number="05">JOURNEY</SectionLabel><span className="aside-note">Curiosity in<br />motion.</span></div><div className="journey-content reveal"><div className="journey-row"><span>2024—NOW</span><div><h3>B.E. Computer Science & Engineering</h3><p>Sri Ramakrishna Institute of Technology</p></div></div><div className="journey-row"><span>HIGHLIGHTS</span><div><h3>Participated in SRM Hackathon</h3><p>StudAI One Foundry Hackathon · Web Security CTF Workshop<br />EFX&nbsp;×&nbsp;SRIT Vibe-Coded Websites Event</p></div></div></div></section>
        <section id="contact" className="contact-section"><div className="contact-eye"><span className="mini-eye">◒</span><span>06 / OPEN CHANNEL</span></div><h2>Have a problem<br />worth <em>solving?</em></h2><p>Let’s turn it into a useful interface.</p><div className="contact-actions"><a className="contact-button" href="mailto:thayananthraghuraman02@gmail.com">Email app <Mail size={17} /></a><a className="contact-button gmail-button" href="https://mail.google.com/mail/?view=cm&fs=1&to=thayananthraghuraman02@gmail.com" target="_blank" rel="noreferrer">Open Gmail <ArrowUpRight size={17} /></a></div><div className="contact-links"><a href="mailto:thayananthraghuraman02@gmail.com">thayananthraghuraman02@gmail.com</a><a href="https://github.com/thaya-fr" target="_blank" rel="noreferrer"><Github size={15} /> github.com/thaya-fr</a></div></section>
      </main>
      <footer><span>R THAYANANTH · FRONTEND DEVELOPER</span><span>© 2026 / ALL RIGHTS RESERVED</span></footer>
    </div>
  );
}
