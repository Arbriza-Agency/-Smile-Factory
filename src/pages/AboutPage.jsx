import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight, Heart, Shield, Sparkles, Users } from 'lucide-react';
import DOCTORS from '../data/doctors';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

/* =================================================================
   ABOUT PAGE — Misión → Doctores → Instalaciones
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
            <path id="rp" d="M42,42 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0" fill="none" />
          </defs>
          {chars.map((ch, i) => (
            <text key={i} fontSize="6.8" fontWeight="500" fontFamily="Poppins, system-ui, sans-serif" letterSpacing="0.15" fill="rgba(31,182,185,0.55)">
              <textPath href="#rp" startOffset={`${(i / total) * 100}%`}>{ch}</textPath>
            </text>
          ))}
          <text x="42" y="47" textAnchor="middle" fontSize="15" fill="rgba(31,182,185,0.75)" fontFamily="Poppins, serif">{icon}</text>
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

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    frame.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) scale(1.02) translateX(0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) frameRef.current.style.transform = '';
  }, []);

  return (
    <article id={doctor.id} ref={cardRef} className={`about-marble-card${visible ? ' about-card-vis' : ''}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="about-card-inner">
        <div className="about-photo-side">
          <div className="about-photo-frame" ref={frameRef}>
            <StampRing text={doctor.stampText} icon={doctor.stampIcon} />
            <img className="about-photo-img" src={doctor.avatar} alt={doctor.name} loading="lazy" width={256} height={341} />
            <div className="about-photo-shine" aria-hidden="true" />
          </div>
        </div>
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
          <p className="about-creds-label">Areas de Enfoque</p>
          <div className="about-areas-wrap">
            {doctor.areas.map((area, i) => (
              <span key={i} className="about-area-tag">{area}</span>
            ))}
          </div>
          <div className="about-cta-wrap">
            <Link to="/contacto" className="about-cta-btn" aria-label={`Agendar cita con ${doctor.name}`}>
              <Calendar size={14} />
              Agendar Cita
              <span className="about-cta-arrow"><ArrowRight size={13} /></span>
            </Link>
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
        <Link to="/" className="about-back-link">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <span className="about-hero-eyebrow">Sobre Nosotros</span>
        <h1 className="about-hero-title">
          Conoce nuestra
          <br />
          <span style={{ color: '#1FB6B9' }}>historia y equipo</span>
        </h1>
        <div className="about-hero-ornament" aria-hidden="true">
          <span className="about-hero-ornament-line" />
          <span className="about-hero-ornament-glyph">✦</span>
          <span className="about-hero-ornament-line" />
        </div>
        <p className="about-hero-sub">
          Mas que una clinica dental, somos un equipo humano que cree en el
          poder de una sonrisa. Conoce nuestra mision, nuestro espacio y a los
          profesionales que hacen la diferencia.
        </p>
      </div>
    </header>
  );
}

/* ── Intro / Presentation Section (Misión) ─────────────────────── */
const VALUES = [
  { icon: <Heart size={22} />, title: 'Trato humano', desc: 'Cada paciente es parte de nuestra familia. Te escuchamos, te entendemos y te acompanamos.' },
  { icon: <Shield size={22} />, title: 'Seguridad total', desc: 'Protocolos de esterilidad de nivel hospitalario en cada procedimiento.' },
  { icon: <Sparkles size={22} />, title: 'Tecnologia moderna', desc: 'Equipos digitales de ultima generacion para resultados precisos y rapidos.' },
  { icon: <Users size={22} />, title: 'Equipo certificado', desc: 'Profesionales con formacion continua y certificaciones internacionales.' },
];

function IntroSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="mision" ref={ref} className="about-intro-section">
      <div className="about-intro-container">

        {/* Text block */}
        <div className={`about-intro-text${visible ? ' about-intro-vis' : ''}`}>
          <span className="about-intro-badge">Nuestra Mision</span>
          <h2 className="about-intro-title">
            Transformamos sonrisas,
            <br />
            <span style={{ color: '#1FB6B9' }}>cambiamos vidas</span>
          </h2>
          <p className="about-intro-desc">
            En Smile Factory creemos que una sonrisa saludable es la puerta a la confianza
            y el bienestar. Desde el primer dia, nuestra mision ha sido ofrecer atencion
            dental de la mas alta calidad en un ambiente calido, moderno y acogedor.
          </p>
          <p className="about-intro-desc">
            Nos comprometemos a acompanar a cada paciente en su recorrido, desde el diagnostico
            hasta el resultado final, con transparencia, empatia y excelencia clinica. No solo
            tratamos dientes; construimos relaciones de confianza que duran toda la vida.
          </p>

          {/* Values grid */}
          <div className="about-values-grid">
            {VALUES.map(({ icon, title, desc }, i) => (
              <div key={i} className="about-value-card">
                <div className="about-value-icon">{icon}</div>
                <div>
                  <h4 className="about-value-title">{title}</h4>
                  <p className="about-value-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image mosaic */}
        <div className={`about-intro-images${visible ? ' about-intro-vis' : ''}`}>
          <div className="about-mosaic">
            <div className="about-mosaic-large">
              <img
                src="/Instalaciones 1.jpeg"
                alt="Equipo Smile Factory"
                loading="lazy"
              />
            </div>
            <div className="about-mosaic-small-top">
              <img
                src="/instalaciones 2.jpeg"
                alt="Consultorio moderno"
                loading="lazy"
              />
            </div>
            <div className="about-mosaic-small-bottom">
              <img
                src="/team.jpeg"
                alt="Tratamiento dental"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Clinic Gallery Section (Instalaciones) ────────────────────── */
const GALLERY_IMAGES = [
  { src: '/espacio2.jpeg', alt: 'Sala de espera moderna' },
  { src: '/espacio1.jpeg', alt: 'Area de tratamientos' },
  { src: '/espacio3.jpeg', alt: 'Equipo profesional' },
  { src: '/espacio4.jpeg', alt: 'Tecnologia de punta' },
  { src: '/espacio5.jpeg', alt: 'Consultorios' },
  { src: '/espacio6.jpeg', alt: 'Recepcion' },
];

function ClinicGallery() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="instalaciones" ref={ref} className="about-gallery-section">
      <div className="about-gallery-container">
        <div className="about-gallery-header">
          <span className="about-intro-badge">Nuestras Instalaciones</span>
          <h2 className="about-intro-title" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
            Un espacio pensado para{' '}
            <span style={{ color: '#1FB6B9' }}>tu comodidad</span>
          </h2>
          <p className="about-intro-desc" style={{ maxWidth: '560px', margin: '0 auto' }}>
            Instalaciones modernas, limpias y equipadas con la ultima tecnologia. Desde
            la sala de espera hasta cada consultorio, todo esta disenado para que te
            sientas comodo y seguro.
          </p>
        </div>
        <div className={`about-gallery-grid${visible ? ' about-gallery-vis' : ''}`}>
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="about-gallery-item" style={{ transitionDelay: `${0.1 * i}s` }}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   STYLES
   ════════════════════════════════════════════════════════════════════ */
function AboutStyles() {
  return (
    <style>{`
      .about-page-bg { background: #F5F7F8; min-height: 100vh; }

      /* ── Hero ── */
      .about-hero { text-align: center; padding: 130px 24px 80px; position: relative; overflow: hidden; }
      .about-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 90% at 50% 120%, rgba(31,182,185,0.08) 0%, transparent 65%), #F5F7F8; z-index: 0; }
      .about-hero-content { position: relative; z-index: 1; }

      .about-back-link { display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #1FB6B9; text-decoration: none; margin-bottom: 32px; padding: 8px 18px; border-radius: 9999px; background: rgba(31,182,185,0.08); transition: background 0.2s, transform 0.2s; }
      .about-back-link:hover { background: rgba(31,182,185,0.15); transform: translateX(-2px); }

      .about-hero-eyebrow { display: block; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #1FB6B9; margin-bottom: 24px; opacity: 0; animation: about-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.15s forwards; }
      .about-hero-title { font-family: 'Poppins', sans-serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 700; color: #1E1E1E; line-height: 1.15; margin-bottom: 22px; opacity: 0; animation: about-anim-up 0.9s cubic-bezier(.22,1,.36,1) 0.28s forwards; }
      .about-hero-ornament { display: flex; align-items: center; justify-content: center; gap: 18px; margin-bottom: 28px; opacity: 0; animation: about-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.42s forwards; }
      .about-hero-ornament-line { width: 72px; height: 1px; background: linear-gradient(to right, transparent, #1FB6B9, transparent); }
      .about-hero-ornament-glyph { font-family: 'Poppins', sans-serif; font-size: 18px; color: #1FB6B9; opacity: 0.75; }
      .about-hero-sub { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: #6B7280; line-height: 1.9; max-width: 540px; margin: 0 auto; opacity: 0; animation: about-anim-up 0.9s cubic-bezier(.22,1,.36,1) 0.50s forwards; }

      /* ── Intro Section ── */
      .about-intro-section { padding: 20px 20px 80px; }
      .about-intro-container { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
      @media (max-width: 880px) { .about-intro-container { grid-template-columns: 1fr; gap: 40px; } }

      .about-intro-text { opacity: 0; transform: translateX(-30px); transition: opacity 0.8s ease, transform 0.8s ease; }
      .about-intro-text.about-intro-vis { opacity: 1; transform: none; }
      .about-intro-images { opacity: 0; transform: translateX(30px); transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s; }
      .about-intro-images.about-intro-vis { opacity: 1; transform: none; }

      .about-intro-badge { display: inline-block; background: #E8F9F9; color: #1FB6B9; font-family: 'Poppins', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.4rem 1rem; border-radius: 9999px; margin-bottom: 1.25rem; }
      .about-intro-title { font-family: 'Poppins', sans-serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: #1E1E1E; line-height: 1.2; margin-bottom: 1.5rem; }
      .about-intro-desc { font-family: 'Inter', sans-serif; font-size: 0.92rem; color: #6B7280; line-height: 1.9; margin-bottom: 1.25rem; }

      /* Values grid */
      .about-values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 2rem; }
      @media (max-width: 520px) { .about-values-grid { grid-template-columns: 1fr; } }
      .about-value-card { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: white; border-radius: 16px; box-shadow: 0 2px 12px rgba(31,182,185,0.06); transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .about-value-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(31,182,185,0.12); }
      .about-value-icon { width: 42px; height: 42px; border-radius: 12px; background: #E8F9F9; color: #1FB6B9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .about-value-title { font-family: 'Poppins', sans-serif; font-size: 0.85rem; font-weight: 600; color: #1E1E1E; margin-bottom: 4px; }
      .about-value-desc { font-family: 'Inter', sans-serif; font-size: 0.78rem; color: #9CA3AF; line-height: 1.6; }

      /* Image mosaic */
      .about-mosaic { display: grid; grid-template-columns: 1.2fr 1fr; grid-template-rows: 1fr 1fr; gap: 12px; height: 420px; }
      @media (max-width: 880px) { .about-mosaic { height: 320px; } }
      .about-mosaic-large { grid-row: 1 / 3; border-radius: 20px; overflow: hidden; }
      .about-mosaic-large img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
      .about-mosaic-large:hover img { transform: scale(1.04); }
      .about-mosaic-small-top, .about-mosaic-small-bottom { border-radius: 16px; overflow: hidden; }
      .about-mosaic-small-top img, .about-mosaic-small-bottom img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
      .about-mosaic-small-top:hover img, .about-mosaic-small-bottom:hover img { transform: scale(1.04); }

      /* ── Clinic Gallery ── */
      .about-gallery-section { padding: 40px 20px 80px; }
      .about-gallery-container { max-width: 1100px; margin: 0 auto; }
      .about-gallery-header { text-align: center; margin-bottom: 48px; }
      .about-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      @media (max-width: 768px) { .about-gallery-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 480px) { .about-gallery-grid { grid-template-columns: 1fr; } }
      .about-gallery-item { border-radius: 16px; overflow: hidden; opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; aspect-ratio: 4/3; }
      .about-gallery-vis .about-gallery-item { opacity: 1; transform: none; }
      .about-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
      .about-gallery-item:hover img { transform: scale(1.05); }

      /* ── Doctors section label ── */
      .about-doctors-header { text-align: center; padding: 60px 20px 48px; }

      /* ── Page wrap ── */
      .about-page-wrap { max-width: 1200px; margin: 0 auto; padding: 8px 20px 80px; display: flex; flex-direction: column; gap: 40px; }

      /* ── Marble card ── */
      .about-marble-card { position: relative; overflow: hidden; background-color: #ffffff; border-radius: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(31,182,185,0.06), 0 16px 48px rgba(31,182,185,0.08); transition: box-shadow 0.5s cubic-bezier(.22,1,.36,1); scroll-margin-top: 100px; }
      .about-marble-card:hover { box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(31,182,185,0.12), 0 28px 72px rgba(31,182,185,0.14); }
      .about-marble-card::before { content: ''; position: absolute; inset: 0; border-radius: 24px; background-image: repeating-linear-gradient(110deg, transparent 0, transparent 195px, rgba(31,182,185,0.025) 195px, rgba(31,182,185,0.025) 196px, transparent 196px, transparent 350px), radial-gradient(ellipse at 68% 42%, rgba(31,182,185,0.06) 0%, transparent 56%), radial-gradient(ellipse at 14% 82%, rgba(31,182,185,0.03) 0%, transparent 46%); pointer-events: none; z-index: 0; }

      .about-card-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 440px 1fr; align-items: center; min-height: 560px; }
      @media (max-width: 880px) { .about-card-inner { grid-template-columns: 1fr; min-height: unset; } }

      /* ── Photo side ── */
      .about-photo-side { padding: 52px 28px 52px 52px; display: flex; align-items: center; justify-content: center; perspective: 900px; }
      @media (max-width: 880px) { .about-photo-side { padding: 48px 48px 24px; } }
      @media (max-width: 520px) { .about-photo-side { padding: 36px 24px 20px; } }

      .about-photo-frame { position: relative; width: 100%; max-width: 380px; transform-style: preserve-3d; transition: transform 0.18s linear; opacity: 0; transform: translateX(-24px); }
      .about-card-vis .about-photo-frame { opacity: 1; transform: translateX(0) rotateY(0) rotateX(0); transition: opacity 0.9s cubic-bezier(.22,1,.36,1) 0.06s, transform 0.9s cubic-bezier(.22,1,.36,1) 0.06s; }
      @media (max-width: 880px) { .about-photo-frame { max-width: 340px; } }

      .about-photo-img { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; object-position: top center; border-radius: 18px; display: block; box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 10px 28px rgba(31,182,185,0.10), 0 24px 52px rgba(31,182,185,0.08); transition: box-shadow 0.4s cubic-bezier(.22,1,.36,1), filter 0.4s; }
      .about-marble-card:hover .about-photo-img { box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 18px 44px rgba(31,182,185,0.14), 0 40px 72px rgba(31,182,185,0.10); filter: brightness(1.03); }
      @media (max-width: 880px) { .about-photo-img { aspect-ratio: 4/3; } }
      @media (max-width: 520px) { .about-photo-img { aspect-ratio: 1/1; object-position: center 18%; } }

      .about-photo-shine { position: absolute; inset: 0; border-radius: 18px; background: linear-gradient(115deg, transparent 25%, rgba(31,182,185,0.12) 48%, transparent 72%); background-size: 250% 100%; background-position: 250% 0; transition: background-position 0.8s ease; pointer-events: none; z-index: 2; }
      .about-marble-card:hover .about-photo-shine { background-position: -250% 0; }

      .about-stamp-ring { position: absolute; top: -15px; right: -15px; width: 84px; height: 84px; pointer-events: none; z-index: 10; animation: about-spin-ring 26s linear infinite; }
      @keyframes about-spin-ring { to { transform: rotate(360deg); } }
      .about-stamp-glow { position: absolute; top: -15px; right: -15px; width: 84px; height: 84px; border-radius: 50%; background: radial-gradient(circle, rgba(31,182,185,0.22) 0%, transparent 68%); animation: about-pulse-glow 3.2s ease-in-out infinite; z-index: 9; }
      @keyframes about-pulse-glow { 0%,100% { opacity: 0.35; transform: scale(0.88); } 50% { opacity: 1; transform: scale(1.18); } }

      /* ── Info side ── */
      .about-info-side { padding: 56px 60px 56px 40px; display: flex; flex-direction: column; }
      @media (max-width: 880px) { .about-info-side { padding: 8px 48px 56px; } }
      @media (max-width: 520px) { .about-info-side { padding: 8px 24px 44px; } }

      .about-info-side > * { opacity: 0; transform: translateY(16px); transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1); }
      .about-card-vis .about-info-side > *:nth-child(1) { transition-delay: 0.10s; }
      .about-card-vis .about-info-side > *:nth-child(2) { transition-delay: 0.18s; }
      .about-card-vis .about-info-side > *:nth-child(3) { transition-delay: 0.25s; }
      .about-card-vis .about-info-side > *:nth-child(4) { transition-delay: 0.32s; }
      .about-card-vis .about-info-side > *:nth-child(5) { transition-delay: 0.39s; }
      .about-card-vis .about-info-side > *:nth-child(6) { transition-delay: 0.46s; }
      .about-card-vis .about-info-side > *:nth-child(7) { transition-delay: 0.52s; }
      .about-card-vis .about-info-side > *:nth-child(8) { transition-delay: 0.58s; }
      .about-card-vis .about-info-side > *:nth-child(9) { transition-delay: 0.64s; }
      .about-card-vis .about-info-side > * { opacity: 1; transform: none; }

      .about-doc-name { font-family: 'Poppins', sans-serif; font-size: clamp(1.6rem, 2.8vw, 2.2rem); font-weight: 700; color: #1E1E1E; line-height: 1.2; margin-bottom: 12px; position: relative; display: inline-block; }
      .about-doc-name::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 2px; background: linear-gradient(to right, #1FB6B9, transparent); border-radius: 9999px; transition: width 0.55s cubic-bezier(.22,1,.36,1); }
      .about-marble-card:hover .about-doc-name::after { width: 100%; }

      .about-doc-role { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #1FB6B9; letter-spacing: 0.10em; text-transform: uppercase; margin-bottom: 28px; }
      .about-hairline { width: 100%; height: 1px; background: linear-gradient(to right, rgba(31,182,185,0.4), rgba(31,182,185,0.08), transparent); margin-bottom: 28px; transform: scaleX(0); transform-origin: left; transition: transform 0.85s cubic-bezier(.22,1,.36,1); }
      .about-card-vis .about-hairline { transform: scaleX(1); transition-delay: 0.28s; }

      .about-doc-bio { font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 400; line-height: 1.9; color: #6B7280; margin-bottom: 28px; max-width: 560px; }
      .about-creds-label { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #9CA3AF; margin-bottom: 14px; }

      .about-creds-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }

      /* Areas of focus tags */
      .about-areas-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
      .about-area-tag { display: inline-block; font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 500; color: #0E8C8F; background: #E8F9F9; padding: 6px 14px; border-radius: 9999px; transition: background 0.2s, color 0.2s, transform 0.2s; }
      .about-area-tag:hover { background: #1FB6B9; color: white; transform: translateY(-1px); }

      .about-cred-item { display: flex; align-items: flex-start; gap: 12px; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 400; color: #6B7280; line-height: 1.6; opacity: 0; transform: translateX(-12px); transition: opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1), color 0.2s; }
      .about-card-vis .about-cred-item { opacity: 1; transform: none; }
      .about-card-vis .about-cred-item:nth-child(1) { transition-delay: 0.44s; }
      .about-card-vis .about-cred-item:nth-child(2) { transition-delay: 0.52s; }
      .about-card-vis .about-cred-item:nth-child(3) { transition-delay: 0.60s; }
      .about-card-vis .about-cred-item:nth-child(4) { transition-delay: 0.68s; }
      .about-card-vis .about-cred-item:nth-child(5) { transition-delay: 0.76s; }
      .about-cred-item:hover { color: #1E1E1E; }

      .about-cred-bullet { width: 5px; height: 5px; border-radius: 50%; background: #1FB6B9; margin-top: 8px; flex-shrink: 0; transition: transform 0.25s cubic-bezier(.34,1.56,.64,1); }
      .about-cred-item:hover .about-cred-bullet { transform: scale(1.8); }

      /* ── CTA button ── */
      .about-cta-wrap { position: relative; align-self: flex-start; display: inline-block; }
      .about-cta-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #1FB6B9, #0E8C8F); color: #fff; font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 15px 32px; border-radius: 9999px; border: none; cursor: pointer; text-decoration: none; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(31,182,185,0.35); transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s cubic-bezier(.22,1,.36,1); }
      .about-cta-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 60%, transparent 80%); background-size: 200% 100%; background-position: 200% 0; transition: background-position 0.55s ease; }
      .about-cta-btn:hover::before { background-position: -200% 0; }
      .about-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(31,182,185,0.45); }
      .about-cta-btn:active { transform: translateY(-1px); }
      .about-cta-arrow { display: inline-flex; transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
      .about-cta-btn:hover .about-cta-arrow { transform: translateX(5px); }
      .about-cta-line { position: absolute; bottom: -5px; left: 0; height: 2px; width: 0; background: linear-gradient(to right, #1FB6B9, rgba(31,182,185,0.3)); border-radius: 1px; transition: width 0.45s cubic-bezier(.22,1,.36,1); pointer-events: none; }
      .about-cta-btn:hover ~ .about-cta-line, .about-cta-wrap:hover .about-cta-line { width: 100%; }

      /* ── Divider ── */
      .about-divider-wrap { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 0; }
      .about-divider-line { flex: 1; max-width: 120px; height: 1px; background: rgba(31,182,185,0.18); transform: scaleX(0); transform-origin: center; animation: about-line-grow 0.7s cubic-bezier(.22,1,.36,1) 0.1s forwards; }
      @keyframes about-line-grow { to { transform: scaleX(1); } }
      .about-divider-gem { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(31,182,185,0.18); background: rgba(31,182,185,0.06); display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 13px; color: #1FB6B9; animation: about-fade-gem 0.6s cubic-bezier(.22,1,.36,1) 0.35s both; }
      @keyframes about-fade-gem { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }

      /* ── Scroll margin for anchors ── */
      #mision, #instalaciones { scroll-margin-top: 100px; }

      @keyframes about-anim-up { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
    `}</style>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const location = useLocation();

  /* Scroll to hash on mount or top if no hash */
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="about-page-bg">
      <AboutStyles />
      <Navbar />
      <AboutHero />

      {/* 1. Misión */}
      <IntroSection />

      {/* 2. Doctores */}
      <div className="about-doctors-header">
        <span className="about-intro-badge">Nuestros Doctores</span>
        <h2 className="about-intro-title">
          Los especialistas detras de{' '}
          <span style={{ color: '#1FB6B9' }}>tu sonrisa</span>
        </h2>
      </div>
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

      {/* 3. Instalaciones */}
      <ClinicGallery />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
