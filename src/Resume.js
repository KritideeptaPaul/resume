import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About Me", icon: "⬡" },
  { id: "achievements", label: "Achievements", icon: "⬡" },
  { id: "now", label: "What I'm Doing", icon: "⬡" },
];

const glitchKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 8px 0 rgba(34,211,238,0.3); }
  50% { box-shadow: 0 0 22px 4px rgba(34,211,238,0.55); }
}
@keyframes drawLine {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
`;

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const handler = () => {
      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const current = offsets.reduce((acc, o) =>
        o.top <= 120 ? o : acc, offsets[0]);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return [active, setActive];
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Sidebar / Top Nav ──────────────────────────────────────────────────────

function Sidebar({ active, onNav, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* ---- MOBILE TOP BAR ---- */}
      <header
        style={{
          display: "none",
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(8,14,26,0.97)",
          borderBottom: "1px solid rgba(34,211,238,0.18)",
          backdropFilter: "blur(12px)",
          padding: "0 1.25rem",
          height: "56px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="mobile-header"
      >
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#22d3ee", fontSize: "1rem", letterSpacing: "0.06em" }}>
          KP<span style={{ color: "#64748b" }}>://resume</span>
        </span>
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{ background: "none", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 4, color: "#22d3ee", padding: "4px 10px", cursor: "pointer", fontFamily: "monospace", fontSize: "1.1rem" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* ---- MOBILE DROPDOWN MENU ---- */}
      {mobileOpen && (
        <nav
          style={{
            display: "none",
            position: "fixed", top: "56px", left: 0, right: 0, zIndex: 99,
            background: "rgba(8,14,26,0.99)",
            borderBottom: "1px solid rgba(34,211,238,0.18)",
            padding: "0.5rem 0",
          }}
          className="mobile-nav"
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); onNav(id); setMobileOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: active === id ? "rgba(34,211,238,0.08)" : "none",
                border: "none",
                borderLeft: active === id ? "3px solid #22d3ee" : "3px solid transparent",
                color: active === id ? "#22d3ee" : "#94a3b8",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.9rem",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      )}

      {/* ---- DESKTOP SIDEBAR ---- */}
      <aside
        className="desktop-sidebar"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: "260px",
          background: "rgba(8,14,26,0.98)",
          borderRight: "1px solid rgba(34,211,238,0.12)",
          display: "flex", flexDirection: "column",
          padding: "2.5rem 0",
          zIndex: 50,
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Logo / Name Block */}
        <div style={{ padding: "0 2rem 2rem", borderBottom: "1px solid rgba(34,211,238,0.1)" }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "#22d3ee", fontSize: "0.7rem",
            letterSpacing: "0.15em", marginBottom: "0.5rem",
            opacity: 0.7,
          }}>
            &gt; PROFILE.EXE
          </div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "1.5rem",
            color: "#f1f5f9",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
          }}>
            KRITIDEEPTA<br />
            <span style={{ color: "#22d3ee" }}>PAUL</span>
          </div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "#64748b",
            fontSize: "0.65rem",
            marginTop: "0.6rem",
            letterSpacing: "0.08em",
          }}>
            CYB3R5EC · DEV
          </div>
          {/* Animated cursor */}
          <span style={{
            display: "inline-block",
            width: 8, height: 14,
            background: "#22d3ee",
            marginLeft: 4,
            verticalAlign: "middle",
            animation: "blink 1.1s step-end infinite",
          }} />
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "1.5rem 0" }}>
          {NAV_ITEMS.map(({ id, label }, i) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); onNav(id); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                width: "100%", textAlign: "left",
                background: active === id
                  ? "linear-gradient(90deg, rgba(34,211,238,0.1) 0%, transparent 100%)"
                  : "none",
                border: "none",
                borderLeft: active === id ? "2px solid #22d3ee" : "2px solid transparent",
                color: active === id ? "#22d3ee" : "#64748b",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.78rem",
                padding: "0.75rem 2rem",
                cursor: "pointer",
                letterSpacing: "0.08em",
                transition: "all 0.25s",
                animation: `fadeSlideIn 0.5s ease both`,
                animationDelay: `${i * 0.08 + 0.2}s`,
              }}
            >
              <span style={{
                fontSize: "0.55rem",
                color: active === id ? "#22d3ee" : "rgba(100,116,139,0.4)",
                transition: "color 0.25s",
              }}>◆</span>
              {label.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "1.5rem 2rem 0",
          borderTop: "1px solid rgba(34,211,238,0.08)",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.6rem",
          color: "rgba(100,116,139,0.5)",
          letterSpacing: "0.06em",
        }}>
          NFSU · CSE (CYBERSECURITY)<br />
          <span style={{ color: "rgba(34,211,238,0.3)" }}>B.TECH-M.TECH INTEGRATED</span>
        </div>
      </aside>
    </>
  );
}

// ── Section Wrapper ────────────────────────────────────────────────────────

function Section({ id, title, tag, children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        minHeight: "100vh",
        padding: "7rem 3rem 5rem",
        borderBottom: "1px solid rgba(34,211,238,0.07)",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <div style={{ maxWidth: 680 }}>
        {/* Section tag */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.65rem",
          color: "#22d3ee",
          letterSpacing: "0.2em",
          marginBottom: "0.75rem",
          opacity: 0.7,
        }}>
          {tag}
        </div>
        {/* Section title */}
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2rem, 5vw, 3.25rem)",
          color: "#f1f5f9",
          letterSpacing: "0.01em",
          lineHeight: 1,
          marginBottom: "2.5rem",
          position: "relative",
        }}>
          {title}
          <span style={{
            display: "block",
            height: 2,
            background: "linear-gradient(90deg, #22d3ee 0%, transparent 100%)",
            marginTop: "0.6rem",
            width: vis ? "100%" : "0%",
            transition: `width 0.8s ease ${delay + 0.2}s`,
          }} />
        </h2>
        {children}
      </div>
    </section>
  );
}

// ── Tag Chip ───────────────────────────────────────────────────────────────

function Tag({ label }) {
  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: "0.65rem",
      color: "#22d3ee",
      background: "rgba(34,211,238,0.08)",
      border: "1px solid rgba(34,211,238,0.25)",
      borderRadius: 3,
      padding: "2px 9px",
      letterSpacing: "0.08em",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

// ── Achievement Card ───────────────────────────────────────────────────────

function AchCard({ icon, title, desc, tags }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? "rgba(34,211,238,0.05)"
          : "rgba(15,23,42,0.6)",
        border: `1px solid ${hov ? "rgba(34,211,238,0.35)" : "rgba(34,211,238,0.1)"}`,
        borderRadius: 6,
        padding: "1.5rem",
        marginBottom: "1rem",
        transition: "all 0.25s",
        animation: hov ? "pulseGlow 2s infinite" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{icon}</span>
        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#f1f5f9",
            letterSpacing: "0.03em",
            marginBottom: "0.35rem",
          }}>{title}</div>
          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "0.88rem",
            color: "#94a3b8",
            lineHeight: 1.65,
            marginBottom: tags?.length ? "0.75rem" : 0,
          }}>{desc}</div>
          {tags?.length && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {tags.map(t => <Tag key={t} label={t} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Now Card ──────────────────────────────────────────────────────────────

function NowCard({ emoji, title, desc, status }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: "1rem",
      alignItems: "start",
      padding: "1.25rem 1.5rem",
      marginBottom: "0.85rem",
      background: "rgba(15,23,42,0.5)",
      border: "1px solid rgba(34,211,238,0.1)",
      borderRadius: 6,
      transition: "border-color 0.2s",
    }}>
      <span style={{ fontSize: "1.3rem", marginTop: 1 }}>{emoji}</span>
      <div>
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "#e2e8f0",
          marginBottom: "0.25rem",
        }}>{title}</div>
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: "0.84rem",
          color: "#64748b",
          lineHeight: 1.6,
        }}>{desc}</div>
      </div>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.58rem",
        color: "#22d3ee",
        background: "rgba(34,211,238,0.08)",
        border: "1px solid rgba(34,211,238,0.2)",
        borderRadius: 3,
        padding: "2px 7px",
        whiteSpace: "nowrap",
        marginTop: 2,
        animation: "pulseGlow 2.5s infinite",
      }}>
        {status}
      </span>
    </div>
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────

function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Cybersecurity Professional & Developer";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />
      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "30%", right: "10%",
        width: 320, height: 320,
        background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
        animation: "float 6s ease-in-out infinite",
      }} />

      <div style={{ maxWidth: 680, position: "relative" }}>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: "#22d3ee",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          marginBottom: "1.5rem",
          opacity: 0.8,
          animation: "fadeIn 0.6s ease 0.2s both",
        }}>
          &gt; INITIALIZING PROFILE...
        </div>

        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          color: "#f1f5f9",
          lineHeight: 0.95,
          letterSpacing: "-0.01em",
          marginBottom: "1.25rem",
          animation: "fadeSlideIn 0.7s ease 0.35s both",
        }}>
          KRITIDEEPTA<br />
          <span style={{
            color: "transparent",
            WebkitTextStroke: "2px #22d3ee",
            display: "inline-block",
          }}>PAUL</span>
        </h1>

        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.8rem, 2vw, 1rem)",
          color: "#94a3b8",
          marginBottom: "2rem",
          minHeight: "1.5em",
          animation: "fadeIn 0.6s ease 0.7s both",
        }}>
          <span style={{ color: "#22d3ee" }}>$ </span>
          {typed}
          <span style={{
            display: "inline-block", width: 8, height: "1em",
            background: "#22d3ee", marginLeft: 3, verticalAlign: "text-bottom",
            animation: "blink 1.1s step-end infinite",
          }} />
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.5rem",
          animation: "fadeSlideIn 0.6s ease 1.1s both",
        }}>
          {["C/C++", "VHDL", "SystemVerilog", "CTF", "HackTheBox", "WebExploit", "OSINT", "Pwn"].map(t => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────

export default function Resume() {
  const [active, setActive] = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        ${glitchKeyframes}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080e1a; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.3); border-radius: 2px; }

        /* Responsive layout */
        .page-layout {
          margin-left: 260px;
        }
        .desktop-sidebar { display: flex !important; }
        .mobile-header { display: none !important; }
        .mobile-nav { display: none !important; }

        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .mobile-nav { display: block !important; }
          .page-layout { margin-left: 0 !important; padding-top: 56px; }
          section { padding: 4rem 1.5rem 3rem !important; }
        }
      `}</style>

      <div style={{ background: "#080e1a", minHeight: "100vh", color: "#f1f5f9" }}>
        <Sidebar active={active} onNav={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <main className="page-layout">
          <Hero />

          <Section id="about" title="ABOUT ME" tag="// SECTION_01" delay={0}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "#94a3b8",
              lineHeight: 1.85,
              marginBottom: "1.5rem",
            }}>
              I'm a B.Tech–M.Tech Integrated student specialising in{" "}
              <span style={{ color: "#22d3ee", fontWeight: 600 }}>Computer Science & Engineering (Cybersecurity)</span>{" "}
              at the National Forensic Sciences University (NFSU). My academic and
              personal journey sits at the intersection of low-level systems and
              high-level application craft.
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "#94a3b8",
              lineHeight: 1.85,
              marginBottom: "2rem",
            }}>
              My approach is deliberately dual-layered — I ground every project in{" "}
              <span style={{ color: "#e2e8f0" }}>low-level system understanding</span>{" "}
              (C, C++, digital logic design, hardware description) while simultaneously
              building polished, secure high-level applications. I believe that knowing
              what happens at the silicon level makes you a fundamentally better
              software developer — and a far sharper security professional.
            </p>

            {/* Stat grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1rem",
              marginTop: "1rem",
            }}>
              {[
                { val: "NFSU", sub: "University" },
                { val: "CSE", sub: "Specialisation" },
                { val: "B.Tech+M.Tech", sub: "Programme" },
                { val: "C · C++", sub: "Core Languages" },
              ].map(({ val, sub }) => (
                <div key={sub} style={{
                  background: "rgba(15,23,42,0.7)",
                  border: "1px solid rgba(34,211,238,0.12)",
                  borderRadius: 6,
                  padding: "1rem 1.25rem",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#22d3ee",
                    letterSpacing: "0.05em",
                  }}>{val}</div>
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#475569",
                    marginTop: "0.25rem",
                    letterSpacing: "0.1em",
                  }}>{sub.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="achievements" title="ACHIEVEMENTS" tag="// SECTION_02" delay={0.05}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300, fontSize: "0.9rem", color: "#64748b",
              marginBottom: "1.75rem", lineHeight: 1.7,
            }}>
              A record built through consistent offensive security practice,
              competitive challenges, and real-world tooling.
            </p>

            <AchCard
              icon="🚩"
              title="Capture The Flag (CTF) Competitor"
              desc="Actively compete in national and international CTF events, specialising in three core disciplines that demand both creativity and deep technical knowledge."
              tags={["OSINT", "Web Exploitation", "Pwn", "Binary Exploitation"]}
            />
            <AchCard
              icon="📦"
              title="Hack The Box — Complex Challenge Solver"
              desc="Consistently solve medium-to-hard ranked machines on Hack The Box, covering privilege escalation, vulnerability chaining, and lateral movement across Linux and Windows environments."
              tags={["Privilege Escalation", "Enumeration", "Post-Exploitation", "Linux", "Windows"]}
            />
            <AchCard
              icon="🔐"
              title="Secure Application Development"
              desc="Build custom applications with security baked in from the architecture stage — not bolted on as an afterthought. Projects span system-level C programs to full-stack web services with hardened input handling."
              tags={["C / C++", "Secure Coding", "Threat Modelling"]}
            />
          </Section>

          <Section id="now" title="WHAT I'M DOING NOW" tag="// SECTION_03" delay={0.05}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300, fontSize: "0.9rem", color: "#64748b",
              marginBottom: "1.75rem", lineHeight: 1.7,
            }}>
              Current projects and areas of active development — updated regularly.
            </p>

            <NowCard
              emoji="🖥️"
              title="C-Based Screen Lock System with Mobile Warning Triggers"
              desc="Engineering a low-level screen locking utility in C that triggers real-time alerts to a paired mobile device on suspicious access attempts. Focuses on OS-level hooks, IPC mechanisms, and minimal attack surface."
              status="IN PROGRESS"
            />
            <NowCard
              emoji="⚡"
              title="Hardware Description Languages — VHDL & SystemVerilog"
              desc="Deepening knowledge of digital design fundamentals through VHDL and SystemVerilog, bridging the gap between software intuition and hardware reality. Focus on combinational logic, FSMs, and synthesis-aware coding patterns."
              status="STUDYING"
            />

            <div style={{
              marginTop: "2rem",
              padding: "1rem 1.5rem",
              background: "rgba(34,211,238,0.04)",
              border: "1px solid rgba(34,211,238,0.15)",
              borderRadius: 6,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(34,211,238,0.6)",
              letterSpacing: "0.08em",
              lineHeight: 1.8,
            }}>
              &gt; INTERESTS: Reverse Engineering · Network Forensics · FPGA Design<br />
              &gt; PHILOSOPHY: Understand the machine. Own the stack. Secure everything.
            </div>
          </Section>
        </main>
      </div>
    </>
  );
}