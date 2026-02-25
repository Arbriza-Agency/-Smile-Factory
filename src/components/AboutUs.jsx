import { CheckCircle, Heart, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState, useEffect, useRef } from 'react';

const VALUES = [
  {
    icon: <Heart size={20} />,
    title: 'Trato humano',
    desc: 'Cada paciente es único. Nos tomamos el tiempo para escucharte y entender tus necesidades.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Seguridad y esterilidad',
    desc: 'Protocolos de higiene de nivel hospitalario en cada procedimiento.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Tecnología avanzada',
    desc: 'Equipos digitales de última generación para diagnósticos precisos y tratamientos eficaces.',
  },
];

const GALLERY = [
  { src: '/imagen6.jpeg', alt: 'Instalaciones Smile Factory' },
  { src: '/imagen7.jpeg', alt: 'Equipo dental profesional' },
  { src: '/imagen8.jpeg', alt: 'Atención al paciente' },
  { src: '/imagen9.jpeg', alt: 'Clínica Smile Factory' },
];

function CinematicGallery() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [phase, setPhase]     = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => {
    GALLERY.forEach(({ src }) => { const i = new Image(); i.src = src; });
  }, []);

  const goNext = () => {
    if (phase !== 'idle') return;
    setPhase('fadeout');
    setTimeout(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % GALLERY.length);
      setPhase('fadein');
      setTimeout(() => setPhase('idle'), 900);
    }, 500);
  };

  useEffect(() => {
    timerRef.current = setInterval(goNext, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, phase]);

  return (
    <>
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1) translateX(0%) translateY(0%); }
          100% { transform: scale(1.10) translateX(-1.5%) translateY(-1.5%); }
        }
        .gallery-wrapper {
          position: relative;
          width: 100%;
          /* deja espacio abajo para que el badge no se corte */
          padding-bottom: 60px;
        }
        .gallery-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 64px rgba(14,140,143,0.22), 0 8px 24px rgba(0,0,0,0.10);
        }
        @media (max-width: 768px) {
          .gallery-frame {
            aspect-ratio: 4/3;
            border-radius: 18px;
          }
          .gallery-wrapper {
            padding-bottom: 50px;
            /* sin padding-left en mobile */
            padding-left: 0 !important;
          }
        }
        .floating-badge {
          position: absolute;
          bottom: 0;          /* siempre dentro del wrapper */
          left: 16px;
          background: linear-gradient(135deg, #0E8C8F, #1FB6B9);
          border-radius: 18px;
          padding: 14px 20px;
          box-shadow: 0 12px 32px rgba(14,140,143,0.38);
          z-index: 10;
          color: white;
          text-align: center;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .floating-badge {
            left: 12px;
            padding: 10px 16px;
            border-radius: 14px;
          }
          .floating-badge .badge-num  { font-size: 22px !important; }
          .floating-badge .badge-text { font-size: 10px !important; }
        }
      `}</style>

      <div className="gallery-wrapper">
        {/* Frame con imágenes */}
        <div className="gallery-frame">
          {GALLERY.map(({ src, alt }, i) => {
            const isActive = i === current;
            const isPrev   = i === prev;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  zIndex: isActive ? 2 : isPrev ? 1 : 0,
                  opacity: isActive ? (phase === 'fadeout' ? 0 : 1) : isPrev ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              >
                <img
                  src={src} alt={alt}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    display: 'block',
                    animation: isActive ? 'kenburns 6s ease-out forwards' : 'none',
                  }}
                />
              </div>
            );
          })}

          {/* Gradient bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to top, rgba(8,24,34,0.55) 0%, transparent 100%)',
            zIndex: 3, pointerEvents: 'none',
          }} />

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: '14px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: '6px', zIndex: 4,
          }}>
            {GALLERY.map((_, i) => (
              <div key={i} style={{
                width: i === current ? '20px' : '6px', height: '6px',
                borderRadius: '999px',
                background: i === current ? '#A8E6E7' : 'rgba(255,255,255,0.45)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
        </div>

        {/* Badge — fuera del frame, dentro del wrapper */}
        <div className="floating-badge">
          <div className="badge-num" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '30px', lineHeight: 1 }}>12+</div>
          <div className="badge-text" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', opacity: 0.88, marginTop: '4px', lineHeight: 1.4 }}>
            Años cuidando<br />sonrisas
          </div>
        </div>
      </div>
    </>
  );
}

export default function AboutUs() {
  const ref = useScrollAnimation();

  return (
    <section
      id="nosotros"
      className="section-padding"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #F0FAFA 0%, #F5F7F8 55%, #EAF6F6 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
          .about-text-col { padding-left: 0 !important; }
          .about-cta {
            width: 100% !important;
            justify-content: center !important;
          }
          .about-section-title {
            font-size: clamp(1.5rem, 6vw, 2.2rem) !important;
          }
        }
      `}</style>

      {/* Blobs decorativos */}
      <div style={{
        position: 'absolute', top: '-140px', right: '-140px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(31,182,185,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '340px', height: '340px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,140,143,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-12 fade-up">
          <span className="section-badge">Sobre Nosotros</span>
          <h2 className="section-title about-section-title" style={{ marginTop: '8px' }}>
            Más de una década<br />
            <span style={{ color: '#1FB6B9' }}>transformando sonrisas</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="about-grid grid lg:grid-cols-2 gap-16 items-start">

          {/* Galería */}
          <div className="fade-left" style={{ paddingLeft: '24px' }}>
            <CinematicGallery />
          </div>

          {/* Texto */}
          <div className="fade-right about-text-col">
            <p className="section-subtitle mb-5" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.78 }}>
              En Smile Factory combinamos experiencia clínica, tecnología de vanguardia
              y un equipo apasionado para ofrecerte la mejor atención dental. Creemos que
              una sonrisa saludable transforma vidas.
            </p>
            <p className="section-subtitle mb-10" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.78 }}>
              Desde 2012 hemos atendido a miles de familias, siempre con el compromiso de
              brindar tratamientos seguros, efectivos y adaptados a cada persona.
            </p>

            {/* Values */}
            <div className="flex flex-col gap-4 mb-12">
              {VALUES.map(({ icon, title, desc }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.72)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    border: '1px solid rgba(31,182,185,0.12)',
                    boxShadow: '0 2px 12px rgba(14,140,143,0.06)',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,140,143,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(14,140,143,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '13px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #E0F7F7, #C4EEEE)',
                    color: '#0E8C8F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px', color: '#1E1E1E', marginBottom: '4px' }}>
                      {title}
                    </h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280', lineHeight: 1.65 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/contacto"
              className="btn-primary inline-flex about-cta"
              style={{ gap: '10px', padding: '16px 32px', fontSize: '15px' }}
            >
              <CheckCircle size={18} />
              Agendar mi primera cita
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}