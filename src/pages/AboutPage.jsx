import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import DOCTORS from '../data/doctors';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

/* =================================================================
   ABOUT PAGE — Detailed doctor profiles
   Adapted from marble-card reference, turquoise palette
   ================================================================= */

/* ── Stamp Ring SVG ──────────────────────────────────────────────── */
function StampRing({ text, icon }) {
  const chars = text.split('');
  const total = chars.length;
  return (
    <>
      <div className="about-stamp-glow" aria-hidden="true" />
      <div className="about-stamp-ring" aria-hidden="true">
        <svg viewBox="0 0 84 84" width="84" height="84">
          <defs>
            <path
              id="rp"
              d="M42,42 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0"
              fill="none"
            />
          </defs>
          {chars.map((ch, i) => (
            <text
              key={i}
              fontSize="6.8"
              fontWeight="500"
              fontFamily="Poppins, system-ui, sans-serif"
              letterSpacing="0.15"
              fill="rgba(31,182,185,0.55)"
            >
              <textPath href="#rp" startOffset={`${(i / total) * 100}%`}>
                {ch}
              </textPath>
            </text>
          ))}
          <text
            x="42"
            y="47"
            textAnchor="middle"
            fontSize="15"
            fill="rgba(31,182,185,0.75)"
            fontFamily="Poppins, serif"
          >
            {icon}
          </text>
        </svg>
      </div>
    </>
  );
}

/* ── Doctor Card ─────────────────────────────────────────────────── */
function DoctorCard({ doctor }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* 3D tilt on photo frame */
  const handleMouseMove = useCallback((e) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    frame.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) scale(1.02) translateX(0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const frame = frameRef.current;
    if (frame) frame.style.transform = '';
  }, []);

  return (
    <article
      id={doctor.id}
      ref={cardRef}
      className={`about-marble-card${visible ? ' about-card-vis' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="about-card-inner">
        {/* PHOTO */}
        <div className="about-photo-side">
          <div className="about-photo-frame" ref={frameRef}>
            <StampRing text={doctor.stampText} icon={doctor.stampIcon} />
            <img
              className="about-photo-img"
              src={doctor.avatar}
              alt={doctor.name}
              loading="lazy"
              width={256}
              height={341}
            />
            <div className="about-photo-shine" aria-hidden="true" />
          </div>
        </div>

        {/* INFO */}
        <div className="about-info-side">
          <h2 className="about-doc-name">{doctor.name}</h2>
          <p className="about-doc-role">{doctor.role}</p>
          <div className="about-hairline" />
          <p className="about-doc-bio">{doctor.fullBio}</p>
          <p className="about-creds-label">Credenciales y Experiencia</p>
          <ul className="about-creds-list" role="list">
            {doctor.credentials.map((c, i) => (
              <li key={i} className="about-cred-item">
                <span className="about-cred-bullet" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="about-cta-wrap">
            <a
              href="/#contacto"
              className="about-cta-btn"
              aria-label={`Agendar cita con ${doctor.name}`}
            >
              <Calendar size={14} />
              Agendar Cita
              <span className="about-cta-arrow">
                <ArrowRight size={13} />
              </span>
            </a>
            <div className="about-cta-line" aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Divider ─────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="about-divider-wrap" aria-hidden="true">
      <span className="about-divider-line" />
      <span className="about-divider-gem">✦</span>
      <span className="about-divider-line" />
    </div>
  );
}

/* ── Page Hero ───────────────────────────────────────────────────── */
function AboutHero() {
  return (
    <header className="about-hero">
      <div className="about-hero-bg" />
      <div className="about-hero-content">
        <Link
          to="/"
          className="about-back-link"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <span className="about-hero-eyebrow">Nuestro Equipo</span>
        <h1 className="about-hero-title">
          Conoce a nuestros
          <br />
          <span style={{ color: '#1FB6B9' }}>Especialistas</span>
        </h1>
        <div className="about-hero-ornament" aria-hidden="true">
          <span className="about-hero-ornament-line" />
          <span className="about-hero-ornament-glyph">✦</span>
          <span className="about-hero-ornament-line" />
        </div>
        <p className="about-hero-sub">
          Profesionales certificados con años de experiencia y un
          compromiso genuino con tu salud y confianza.
        </p>
        <nav className="about-hero-nav" aria-label="Ir al perfil del doctor">
          {DOCTORS.map((d) => (
            <a key={d.id} href={`#${d.id}`} className="about-hero-nav-a">
              {d.name.split(',')[0]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════════════════════════
   STYLES — Scoped to about page
   ════════════════════════════════════════════════════════════════════ */
function AboutStyles() {
  return (
    <style>{`
      /* ── Page background ── */
      .about-page-bg {
        background: #F5F7F8;
        min-height: 100vh;
      }

      /* ── Hero ── */
      .about-hero {
        text-align: center;
        padding: 120px 24px 68px;
        position: relative;
        overflow: hidden;
      }

      .about-hero-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 70% 90% at 50% 120%, rgba(31,182,185,0.08) 0%, transparent 65%),
          #F5F7F8;
        z-index: 0;
      }

      .about-hero-content { position: relative; z-index: 1; }

      .about-back-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #1FB6B9;
        text-decoration: none;
        margin-bottom: 28px;
        padding: 6px 16px;
        border-radius: 9999px;
        background: rgba(31,182,185,0.08);
        transition: background 0.2s, transform 0.2s;
      }
      .about-back-link:hover {
        background: rgba(31,182,185,0.15);
        transform: translateX(-2px);
      }

      .about-hero-eyebrow {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #1FB6B9;
        margin-bottom: 20px;
        opacity: 0;
        animation: about-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.15s forwards;
      }

      .about-hero-title {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(2.2rem, 5vw, 3.8rem);
        font-weight: 700;
        color: #1E1E1E;
        line-height: 1.1;
        letter-spacing: -0.01em;
        margin-bottom: 18px;
        opacity: 0;
        animation: about-anim-up 0.9s cubic-bezier(.22,1,.36,1) 0.28s forwards;
      }

      .about-hero-ornament {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        margin-bottom: 22px;
        opacity: 0;
        animation: about-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.42s forwards;
      }
      .about-hero-ornament-line {
        width: 72px;
        height: 1px;
        background: linear-gradient(to right, transparent, #1FB6B9, transparent);
      }
      .about-hero-ornament-glyph {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #1FB6B9;
        opacity: 0.75;
      }

      .about-hero-sub {
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        font-weight: 400;
        color: #6B7280;
        line-height: 1.8;
        max-width: 500px;
        margin: 0 auto 36px;
        opacity: 0;
        animation: about-anim-up 0.9s cubic-bezier(.22,1,.36,1) 0.50s forwards;
      }

      .about-hero-nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        opacity: 0;
        animation: about-anim-up 0.8s cubic-bezier(.22,1,.36,1) 0.64s forwards;
      }
      .about-hero-nav-a {
        font-family: 'Inter', sans-serif;
        font-size: 12.5px;
        font-weight: 500;
        color: #1E1E1E;
        text-decoration: none;
        padding: 8px 20px;
        border-radius: 999px;
        border: 1px solid rgba(31,182,185,0.2);
        background: rgba(255,255,255,0.6);
        letter-spacing: 0.04em;
        transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.22s cubic-bezier(.34,1.56,.64,1);
      }
      .about-hero-nav-a:hover {
        border-color: #1FB6B9;
        color: #0E8C8F;
        background: rgba(31,182,185,0.08);
        transform: translateY(-2px);
      }

      /* ── Page wrap ── */
      .about-page-wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 8px 20px 80px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      /* ── Marble card ── */
      .about-marble-card {
        position: relative;
        overflow: hidden;
        background-color: #ffffff;
        border-radius: 24px;
        box-shadow:
          0 1px 2px rgba(0,0,0,0.03),
          0 4px 16px rgba(31,182,185,0.06),
          0 16px 48px rgba(31,182,185,0.08);
        transition: box-shadow 0.5s cubic-bezier(.22,1,.36,1);
      }
      .about-marble-card:hover {
        box-shadow:
          0 2px 4px rgba(0,0,0,0.04),
          0 8px 32px rgba(31,182,185,0.12),
          0 28px 72px rgba(31,182,185,0.14);
      }

      /* Subtle vein texture */
      .about-marble-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 24px;
        background-image:
          repeating-linear-gradient(110deg,
            transparent 0, transparent 195px,
            rgba(31,182,185,0.025) 195px, rgba(31,182,185,0.025) 196px,
            transparent 196px, transparent 350px),
          radial-gradient(ellipse at 68% 42%, rgba(31,182,185,0.06) 0%, transparent 56%),
          radial-gradient(ellipse at 14% 82%, rgba(31,182,185,0.03) 0%, transparent 46%);
        pointer-events: none;
        z-index: 0;
      }

      .about-card-inner {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 320px 1fr;
        align-items: center;
        min-height: 480px;
      }
      @media (max-width: 880px) {
        .about-card-inner { grid-template-columns: 1fr; min-height: unset; }
      }

      /* ── Photo side ── */
      .about-photo-side {
        padding: 44px 24px 44px 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 900px;
      }
      @media (max-width: 880px) { .about-photo-side { padding: 44px 44px 20px; } }
      @media (max-width: 520px) { .about-photo-side { padding: 32px 24px 16px; } }

      .about-photo-frame {
        position: relative;
        width: 100%;
        max-width: 270px;
        transform-style: preserve-3d;
        transition: transform 0.18s linear;
        opacity: 0;
        transform: translateX(-24px);
      }
      .about-card-vis .about-photo-frame {
        opacity: 1;
        transform: translateX(0) rotateY(0) rotateX(0);
        transition: opacity 0.9s cubic-bezier(.22,1,.36,1) 0.06s,
                    transform 0.9s cubic-bezier(.22,1,.36,1) 0.06s;
      }
      @media (max-width: 880px) { .about-photo-frame { max-width: 300px; } }

      .about-photo-img {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        object-position: top center;
        border-radius: 16px;
        display: block;
        box-shadow:
          0 2px 6px rgba(0,0,0,0.06),
          0 10px 28px rgba(31,182,185,0.10),
          0 24px 52px rgba(31,182,185,0.08);
        transition: box-shadow 0.4s cubic-bezier(.22,1,.36,1), filter 0.4s;
      }
      .about-marble-card:hover .about-photo-img {
        box-shadow:
          0 4px 12px rgba(0,0,0,0.08),
          0 18px 44px rgba(31,182,185,0.14),
          0 40px 72px rgba(31,182,185,0.10);
        filter: brightness(1.03);
      }
      @media (max-width: 880px) { .about-photo-img { aspect-ratio: 4/3; } }
      @media (max-width: 520px) { .about-photo-img { aspect-ratio: 1/1; object-position: center 18%; } }

      /* Turquoise shimmer */
      .about-photo-shine {
        position: absolute;
        inset: 0;
        border-radius: 16px;
        background: linear-gradient(
          115deg,
          transparent 25%,
          rgba(31,182,185,0.12) 48%,
          transparent 72%
        );
        background-size: 250% 100%;
        background-position: 250% 0;
        transition: background-position 0.8s ease;
        pointer-events: none;
        z-index: 2;
      }
      .about-marble-card:hover .about-photo-shine { background-position: -250% 0; }

      /* ── Stamp ring ── */
      .about-stamp-ring {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 84px;
        height: 84px;
        pointer-events: none;
        z-index: 10;
        animation: about-spin-ring 26s linear infinite;
      }
      @keyframes about-spin-ring { to { transform: rotate(360deg); } }

      .about-stamp-glow {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 84px;
        height: 84px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(31,182,185,0.22) 0%, transparent 68%);
        animation: about-pulse-glow 3.2s ease-in-out infinite;
        z-index: 9;
      }
      @keyframes about-pulse-glow {
        0%,100% { opacity: 0.35; transform: scale(0.88); }
        50%      { opacity: 1;    transform: scale(1.18); }
      }

      /* ── Info side ── */
      .about-info-side {
        padding: 52px 56px 52px 36px;
        display: flex;
        flex-direction: column;
      }
      @media (max-width: 880px) { .about-info-side { padding: 4px 44px 52px; } }
      @media (max-width: 520px) { .about-info-side { padding: 4px 24px 40px; } }

      .about-info-side > * {
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
      }
      .about-card-vis .about-info-side > *:nth-child(1) { transition-delay: 0.10s; }
      .about-card-vis .about-info-side > *:nth-child(2) { transition-delay: 0.18s; }
      .about-card-vis .about-info-side > *:nth-child(3) { transition-delay: 0.25s; }
      .about-card-vis .about-info-side > *:nth-child(4) { transition-delay: 0.32s; }
      .about-card-vis .about-info-side > *:nth-child(5) { transition-delay: 0.39s; }
      .about-card-vis .about-info-side > *:nth-child(6) { transition-delay: 0.46s; }
      .about-card-vis .about-info-side > *:nth-child(7) { transition-delay: 0.54s; }
      .about-card-vis .about-info-side > * { opacity: 1; transform: none; }

      /* Name */
      .about-doc-name {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(1.6rem, 2.8vw, 2.2rem);
        font-weight: 700;
        color: #1E1E1E;
        letter-spacing: -0.01em;
        line-height: 1.15;
        margin-bottom: 9px;
        position: relative;
        display: inline-block;
      }
      .about-doc-name::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(to right, #1FB6B9, transparent);
        border-radius: 9999px;
        transition: width 0.55s cubic-bezier(.22,1,.36,1);
      }
      .about-marble-card:hover .about-doc-name::after { width: 100%; }

      .about-doc-role {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #1FB6B9;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        margin-bottom: 22px;
      }

      /* Hairline – scaleX 0 → 1 */
      .about-hairline {
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, rgba(31,182,185,0.4), rgba(31,182,185,0.08), transparent);
        margin-bottom: 22px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.85s cubic-bezier(.22,1,.36,1);
      }
      .about-card-vis .about-hairline { transform: scaleX(1); transition-delay: 0.28s; }

      .about-doc-bio {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.85;
        color: #6B7280;
        margin-bottom: 22px;
        max-width: 560px;
      }

      .about-creds-label {
        font-family: 'Inter', sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #9CA3AF;
        margin-bottom: 11px;
      }

      .about-creds-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 34px;
      }

      .about-cred-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-family: 'Inter', sans-serif;
        font-size: 13.5px;
        font-weight: 400;
        color: #6B7280;
        line-height: 1.55;
        opacity: 0;
        transform: translateX(-12px);
        transition: opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1),
                    color 0.2s;
      }
      .about-card-vis .about-cred-item { opacity: 1; transform: none; }
      .about-card-vis .about-cred-item:nth-child(1) { transition-delay: 0.44s; }
      .about-card-vis .about-cred-item:nth-child(2) { transition-delay: 0.52s; }
      .about-card-vis .about-cred-item:nth-child(3) { transition-delay: 0.60s; }
      .about-card-vis .about-cred-item:nth-child(4) { transition-delay: 0.68s; }
      .about-card-vis .about-cred-item:nth-child(5) { transition-delay: 0.76s; }
      .about-cred-item:hover { color: #1E1E1E; }

      .about-cred-bullet {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #1FB6B9;
        margin-top: 7px;
        flex-shrink: 0;
        transition: transform 0.25s cubic-bezier(.34,1.56,.64,1);
      }
      .about-cred-item:hover .about-cred-bullet { transform: scale(1.8); }

      /* ── CTA button ── */
      .about-cta-wrap {
        position: relative;
        align-self: flex-start;
        display: inline-block;
      }

      .about-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(135deg, #1FB6B9, #0E8C8F);
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 14px 30px;
        border-radius: 9999px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(31,182,185,0.35);
        transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s cubic-bezier(.22,1,.36,1);
      }
      .about-cta-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 60%, transparent 80%);
        background-size: 200% 100%;
        background-position: 200% 0;
        transition: background-position 0.55s ease;
      }
      .about-cta-btn:hover::before { background-position: -200% 0; }
      .about-cta-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 36px rgba(31,182,185,0.45);
      }
      .about-cta-btn:active { transform: translateY(-1px); }

      .about-cta-arrow {
        display: inline-flex;
        transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
      }
      .about-cta-btn:hover .about-cta-arrow { transform: translateX(5px); }

      .about-cta-line {
        position: absolute;
        bottom: -5px;
        left: 0;
        height: 2px;
        width: 0;
        background: linear-gradient(to right, #1FB6B9, rgba(31,182,185,0.3));
        border-radius: 1px;
        transition: width 0.45s cubic-bezier(.22,1,.36,1);
        pointer-events: none;
      }
      .about-cta-btn:hover ~ .about-cta-line,
      .about-cta-wrap:hover .about-cta-line { width: 100%; }

      /* ── Divider ── */
      .about-divider-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 20px 0;
      }
      .about-divider-line {
        flex: 1;
        max-width: 120px;
        height: 1px;
        background: rgba(31,182,185,0.18);
        transform: scaleX(0);
        transform-origin: center;
        animation: about-line-grow 0.7s cubic-bezier(.22,1,.36,1) 0.1s forwards;
      }
      @keyframes about-line-grow { to { transform: scaleX(1); } }

      .about-divider-gem {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid rgba(31,182,185,0.18);
        background: rgba(31,182,185,0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Poppins', sans-serif;
        font-size: 13px;
        color: #1FB6B9;
        animation: about-fade-gem 0.6s cubic-bezier(.22,1,.36,1) 0.35s both;
      }
      @keyframes about-fade-gem { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }

      /* ── Keyframes ── */
      @keyframes about-anim-up {
        from { opacity:0; transform:translateY(22px); }
        to   { opacity:1; transform:none; }
      }
    `}</style>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-bg">
      <AboutStyles />
      <Navbar />
      <AboutHero />
      <main>
        <div className="about-page-wrap">
          {DOCTORS.map((doc, i) => (
            <div key={doc.id}>
              {i > 0 && <Divider />}
              <DoctorCard doctor={doc} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
