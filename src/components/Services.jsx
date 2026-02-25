import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const icons = {
  ortodoncia: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <rect x="8" y="10" width="32" height="28" rx="8" fill="#E0F7F7" stroke="#1FB6B9" strokeWidth="2"/>
      <circle cx="17" cy="22" r="3" fill="#1FB6B9"/>
      <circle cx="24" cy="22" r="3" fill="#0E8C8F"/>
      <circle cx="31" cy="22" r="3" fill="#1FB6B9"/>
      <line x1="14" y1="22" x2="34" y2="22" stroke="#A8E6E7" strokeWidth="1.5" strokeDasharray="2 2"/>
      <rect x="13" y="30" width="22" height="3" rx="1.5" fill="#A8E6E7"/>
    </svg>
  ),
  limpieza: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <ellipse cx="24" cy="30" rx="12" ry="10" fill="#E0F7F7" stroke="#1FB6B9" strokeWidth="2"/>
      <path d="M18 20 Q24 10 30 20" stroke="#1FB6B9" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M21 30 Q24 26 27 30" stroke="#0E8C8F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="32" cy="14" r="4" fill="#A8E6E7" stroke="#1FB6B9" strokeWidth="1.5"/>
      <path d="M32 11 v6 M29 14 h6" stroke="#1FB6B9" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  relleno: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <path d="M16 12 Q24 8 32 12 L34 32 Q24 38 14 32 Z" fill="#E0F7F7" stroke="#1FB6B9" strokeWidth="2"/>
      <path d="M20 20 Q24 17 28 20 L29 28 Q24 31 19 28 Z" fill="#1FB6B9" opacity="0.6"/>
      <circle cx="36" cy="10" r="5" fill="#FFD166" stroke="#F59E0B" strokeWidth="1.5"/>
      <path d="M34 10 h4 M36 8 v4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  blanqueamiento: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <ellipse cx="24" cy="28" rx="13" ry="11" fill="#FFF9E6" stroke="#F59E0B" strokeWidth="2"/>
      <ellipse cx="24" cy="28" rx="8" ry="7" fill="#FFD166" opacity="0.5"/>
      <circle cx="24" cy="16" r="5" fill="#FFD166" stroke="#F59E0B" strokeWidth="1.5"/>
      <line x1="24" y1="8" x2="24" y2="5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="10" x2="32" y2="8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="10" x2="16" y2="8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="32" y1="16" x2="35" y2="16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="16" x2="13" y2="16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  protesis: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <path d="M10 22 Q10 14 18 14 L30 14 Q38 14 38 22 L36 36 Q30 40 24 40 Q18 40 12 36 Z" fill="#E0F7F7" stroke="#1FB6B9" strokeWidth="2"/>
      <rect x="15" y="18" width="5" height="10" rx="2" fill="#1FB6B9"/>
      <rect x="21.5" y="17" width="5" height="12" rx="2" fill="#0E8C8F"/>
      <rect x="28" y="18" width="5" height="10" rx="2" fill="#1FB6B9"/>
      <path d="M10 22 Q8 26 10 30" stroke="#A8E6E7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M38 22 Q40 26 38 30" stroke="#A8E6E7" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  extraccion: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <path d="M20 10 Q24 8 28 10 L30 22 Q28 26 24 26 Q20 26 18 22 Z" fill="#FFE8E8" stroke="#EF4444" strokeWidth="2"/>
      <path d="M21 26 L19 38 Q24 40 26 38 L28 30 L24 28 L20 30 Z" fill="#FFE8E8" stroke="#EF4444" strokeWidth="1.5"/>
      <line x1="34" y1="30" x2="40" y2="36" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="40" y1="30" x2="34" y2="36" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="37" cy="33" r="6" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
    </svg>
  ),
  evaluacion: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <rect x="10" y="8" width="28" height="32" rx="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2"/>
      <line x1="16" y1="18" x2="32" y2="18" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="24" x2="32" y2="24" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="30" x2="26" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="35" cy="35" r="6" fill="#6366F1"/>
      <path d="M32 35 l2 2 l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  integral: (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      <circle cx="24" cy="24" r="16" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
      <path d="M24 14 Q30 18 30 24 Q30 30 24 34 Q18 30 18 24 Q18 18 24 14 Z" fill="#22C55E" opacity="0.3"/>
      <circle cx="24" cy="24" r="5" fill="#22C55E"/>
      <path d="M24 8 v4 M24 36 v4 M8 24 h4 M36 24 h4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M13 13 l2.8 2.8 M32.2 32.2 l2.8 2.8 M35 13 l-2.8 2.8 M15.8 32.2 l-2.8 2.8" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const COLORS = {
  ortodoncia:     { bg: '#E0F7F7', accent: '#1FB6B9', hover: 'rgba(31,182,185,0.08)' },
  limpieza:       { bg: '#E0F7F7', accent: '#0E8C8F', hover: 'rgba(14,140,143,0.08)' },
  relleno:        { bg: '#E0F7F7', accent: '#1FB6B9', hover: 'rgba(31,182,185,0.08)' },
  blanqueamiento: { bg: '#FFF9E6', accent: '#D97706', hover: 'rgba(217,119,6,0.08)'  },
  protesis:       { bg: '#E0F7F7', accent: '#0E8C8F', hover: 'rgba(14,140,143,0.08)' },
  extraccion:     { bg: '#FFE8E8', accent: '#EF4444', hover: 'rgba(239,68,68,0.08)'  },
  evaluacion:     { bg: '#EEF2FF', accent: '#6366F1', hover: 'rgba(99,102,241,0.08)' },
  integral:       { bg: '#F0FDF4', accent: '#22C55E', hover: 'rgba(34,197,94,0.08)'  },
};

const SERVICES = [
  {
    key: 'ortodoncia',
    title: 'Ortodoncia',
    short: 'Corregimos posición y mordida para una sonrisa perfecta.',
    desc: 'Tratamientos especializados en corregir la posición de los dientes y la mordida para mejorar tanto la estética como la funcionalidad de la sonrisa. Incluye evaluaciones completas y seguimiento constante con especialista.',
    popular: true,
  },
  {
    key: 'limpieza',
    title: 'Limpiezas Dentales',
    short: 'Profilaxis profunda para dientes sanos y brillantes.',
    desc: 'Limpieza profunda que elimina placa y sarro, previniendo caries y enfermedades de encías. Dejamos tus dientes más sanos, limpios y brillantes desde la primera sesión.',
    popular: false,
  },
  {
    key: 'relleno',
    title: 'Rellenos de Resina',
    short: 'Restauramos dientes con materiales del color natural.',
    desc: 'Tratamientos restaurativos que reparan dientes con caries o fracturas usando materiales del color del diente. Resultados estéticos y funcionales que nadie notará.',
    popular: false,
  },
  {
    key: 'blanqueamiento',
    title: 'Blanqueamiento Dental',
    short: 'Hasta 8 tonos más blanco en una sola sesión.',
    desc: 'Tratamiento estético que aclara el tono de los dientes para una sonrisa más radiante. Técnicas y materiales seguros con resultados visibles y naturales desde la primera cita.',
    popular: true,
  },
  {
    key: 'protesis',
    title: 'Prótesis Dentales',
    short: 'Soluciones fijas y removibles para dientes perdidos.',
    desc: 'Sustituimos piezas dentales ausentes o dañadas con prótesis fijas o removibles de alta calidad, mejorando la función masticatoria y la estética dental de forma natural.',
    popular: false,
  },
  {
    key: 'extraccion',
    title: 'Extracciones Dentales',
    short: 'Procedimiento seguro, rápido y sin dolor.',
    desc: 'Extracción de dientes que ya no pueden ser salvados, realizada con técnicas modernas de anestesia para garantizar la comodidad total del paciente durante y después del procedimiento.',
    popular: false,
  },
  {
    key: 'evaluacion',
    title: 'Evaluaciones Dentales',
    short: 'Diagnóstico completo y plan de tratamiento a medida.',
    desc: 'Consultas completas donde analizamos la salud bucal del paciente para definir el tratamiento más adecuado. Incluye examen clínico detallado, radiografías y plan personalizado.',
    popular: false,
  },
  {
    key: 'integral',
    title: 'Atención Integral',
    short: 'Cuidado personalizado pensado para cada paciente.',
    desc: 'Cuidado dental integral enfocado en la comodidad y bienestar de cada paciente. Trato humano, cálido y profesional en cada visita, con soluciones adaptadas a cada necesidad bucal.',
    popular: false,
  },
];

function ServiceCard({ service, delay, onContact }) {
  const [hovered, setHovered] = useState(false);
  const col = COLORS[service.key];

  return (
    <div
      className={`fade-up stagger-${delay}`}
      style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onContact}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          border: `1.5px solid ${hovered ? col.accent : 'rgba(0,0,0,0.06)'}`,
          boxShadow: hovered
            ? `0 20px 48px ${col.hover.replace('0.08', '0.18')}, 0 4px 16px rgba(0,0,0,0.08)`
            : '0 2px 16px rgba(0,0,0,0.06)',
          transition: 'all 0.35s cubic-bezier(0.34,1.26,0.64,1)',
          transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <div style={{
          background: col.bg,
          padding: '28px 28px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px ${col.hover.replace('0.08','0.2')}`,
          }}>
            {icons[service.key]}
          </div>
          {service.popular && (
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '4px 10px',
              borderRadius: '999px', fontFamily: 'Poppins, sans-serif',
              background: `linear-gradient(135deg, ${col.accent}, #0E8C8F)`,
              color: 'white', letterSpacing: '0.03em',
            }}>
              Popular
            </span>
          )}
        </div>

        <div style={{ padding: '20px 24px 24px' }}>
          <h3 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 700,
            fontSize: '16px', color: '#1E1E1E', marginBottom: '8px',
          }}>
            {service.title}
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
            color: '#6B7280', lineHeight: 1.65,
          }}>
            {service.short}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginTop: '16px', color: col.accent,
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px',
          }}>
            Ver más
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
              viewBox="0 0 24 24" style={{
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.25s ease',
              }}>
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>

        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: `linear-gradient(160deg, ${col.accent}F0 0%, #0a1e28F5 100%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '32px 28px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.32s ease, transform 0.32s ease',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px',
            backdropFilter: 'blur(4px)',
          }}>
            {icons[service.key]}
          </div>
          <h3 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: '17px', color: 'white', marginBottom: '12px', lineHeight: 1.2,
          }}>
            {service.title}
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
            color: 'rgba(255,255,255,0.88)', lineHeight: 1.7,
            marginBottom: '24px',
          }}>
            {service.desc}
          </p>
          <button
            style={{
              background: 'white',
              color: col.accent,
              border: 'none',
              borderRadius: '999px',
              padding: '10px 22px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={e => { e.stopPropagation(); onContact(); }}
          >
            <CheckCircle size={15} />
            Agendar cita
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useScrollAnimation();
  const navigate = useNavigate();
  const goContact = () => navigate('/contacto');

  return (
    <section id="servicios" className="section-padding" ref={ref}
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F5F7F8 100%)', position: 'relative' }}
    >
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <span className="section-badge">Nuestros Servicios</span>
          <h2 className="section-title mx-auto" style={{ marginTop: '8px' }}>
            Soluciones para{' '}
            <span style={{ color: '#1FB6B9' }}>cada sonrisa</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', color: '#6B7280',
            maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '15px',
          }}>
            Ofrecemos tratamientos personalizados de ortodoncia y odontología general.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.key}
              service={service}
              delay={Math.min(i + 1, 6)}
              onContact={goContact}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24 fade-up">
          <p style={{
            fontFamily: 'Inter, sans-serif', color: '#9CA3AF',
            fontSize: '14px', marginBottom: '20px',
          }}>
            ¿No sabes cuál tratamiento necesitas?
          </p>
          <button
            className="btn-primary"
            onClick={goContact}
            style={{ padding: '16px 36px', fontSize: '15px', gap: '10px' }}
          >
            <CheckCircle size={18} />
            Agenda una consulta gratuita
          </button>
        </div>

      </div>
    </section>
  );
}