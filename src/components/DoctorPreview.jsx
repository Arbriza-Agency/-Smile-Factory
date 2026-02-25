import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import DOCTORS from '../data/doctors';

export default function DoctorPreview() {
  const ref = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  const doctor = DOCTORS[current];

  const goTo = useCallback(
    (idx, dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const prev = () =>
    goTo(current === 0 ? DOCTORS.length - 1 : current - 1, 'left');
  const next = () =>
    goTo(current === DOCTORS.length - 1 ? 0 : current + 1, 'right');

  /* Auto-advance every 8s */
  useEffect(() => {
    const timer = setInterval(() => next(), 8000);
    return () => clearInterval(timer);
  }, [current]);

  const slideTransform = animating
    ? direction === 'right'
      ? 'translateX(-50px)'
      : 'translateX(50px)'
    : 'translateX(0)';
  const slideOpacity = animating ? 0 : 1;

  return (
    <section
      id="doctores"
      className="section-padding"
      style={{ background: '#F5F7F8' }}
      ref={ref}
    >
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="section-badge">Nuestro Equipo</span>
          <h2 className="section-title mx-auto" style={{ marginBottom: '1.25rem' }}>
            Conoce a nuestros{' '}
            <span style={{ color: '#1FB6B9' }}>especialistas</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', lineHeight: 1.85 }}>
            Un equipo de profesionales altamente capacitados, comprometidos con
            tu salud bucal y la confianza de tu sonrisa.
          </p>
        </div>

        {/* Doctor card carousel — bigger */}
        <div className="fade-up stagger-2">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '1.75rem',
              background: 'white',
              boxShadow:
                '0 8px 48px rgba(31,182,185,0.10), 0 2px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div
              className="grid md:grid-cols-2 items-stretch"
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                opacity: slideOpacity,
                transform: slideTransform,
                gap: '0 40px',
              }}
            >
              {/* ── Photo side ── */}
              <div
                className="relative flex items-center justify-center"
                style={{ padding: '32px 16px 32px 32px' }}
              >
                {/* Professional photo frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '360px',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    background: 'linear-gradient(160deg, #E8F9F9 0%, #F0FCFC 40%, #F5F7F8 100%)',
                    boxShadow:
                      '0 8px 32px rgba(31,182,185,0.12), 0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    style={{
                      width: '100%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* ── Info side ── */}
              <div className="flex flex-col justify-center px-10 py-14 md:px-16 md:py-20">
                {/* Role */}
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#1FB6B9',
                    letterSpacing: '0.14em',
                    marginBottom: '1.25rem',
                  }}
                >
                  {doctor.role}
                </span>

                {/* Name */}
                <h3
                  className="font-bold"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                    color: '#1E1E1E',
                    lineHeight: 1.2,
                    marginBottom: '1.75rem',
                  }}
                >
                  {doctor.name}
                </h3>

                {/* Hairline */}
                <div
                  style={{
                    width: '100%',
                    height: '2px',
                    background:
                      'linear-gradient(to right, #1FB6B9, #E8F9F9, transparent)',
                    borderRadius: '9999px',
                    marginBottom: '2rem',
                  }}
                />

                {/* Short bio */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    color: '#6B7280',
                    lineHeight: 2,
                    maxWidth: '440px',
                    marginBottom: '2.5rem',
                  }}
                >
                  {doctor.shortBio}
                </p>

                {/* CTA – Sobre Nosotros */}
                <Link
                  to="/sobre-nosotros"
                  className="btn-primary inline-flex self-start"
                  style={{ padding: '0.85rem 2.2rem' }}
                >
                  Sobre Nosotros
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* ── Navigation controls ── */}
            <div className="absolute bottom-7 right-7 flex items-center gap-3 z-10">
              {/* Dots */}
              <div className="flex gap-2 mr-3">
                {DOCTORS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 'right' : 'left')}
                    className="transition-all rounded-full"
                    style={{
                      width: i === current ? '24px' : '8px',
                      height: '8px',
                      background:
                        i === current
                          ? 'linear-gradient(135deg,#1FB6B9,#0E8C8F)'
                          : '#D1D5DB',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    aria-label={`Ir al doctor ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev */}
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  color: '#1E1E1E',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
                aria-label="Doctor anterior"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next */}
              <button
                onClick={next}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(31,182,185,0.35)',
                }}
                aria-label="Siguiente doctor"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Counter */}
            <div
              className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(255,255,255,0.92)',
                color: '#6B7280',
                fontFamily: 'Poppins, sans-serif',
                backdropFilter: 'blur(4px)',
              }}
            >
              {current + 1} / {DOCTORS.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
