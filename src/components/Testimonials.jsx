import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TESTIMONIALS = [
  {
    name:      'María González',
    age:       32,
    treatment: 'Invisalign®',
    rating:    5,
    text:      'Quedé completamente sorprendida con los resultados. En menos de un año tengo la sonrisa que siempre soñé. El equipo es increíblemente profesional y siempre me hicieron sentir en casa. ¡100% recomendados!',
    avatar:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&crop=face',
    before:    'Tenía apiñamiento severo',
    verified:  true,
  },
  {
    name:      'Carlos Mendez',
    age:       28,
    treatment: 'Brackets metálicos',
    rating:    5,
    text:      'El Dr. siempre estuvo al pendiente de mi tratamiento. Las instalaciones son de primer nivel y el trato amable hace que olvides que estás en el dentista. Mi sonrisa cambió por completo en 20 meses.',
    avatar:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=face',
    before:    'Mordida cruzada y espacios',
    verified:  true,
  },
  {
    name:      'Laura Pérez',
    age:       45,
    treatment: 'Implantes + Blanqueamiento',
    rating:    5,
    text:      'Después de perder dos dientes perdí la confianza para sonreír. Smile Factory me devolvió no solo los dientes sino mi autoestima. Los implantes se sienten totalmente naturales y el blanqueamiento fue espectacular.',
    avatar:    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop&crop=face',
    before:    'Dientes faltantes',
    verified:  true,
  },
  {
    name:      'Roberto Sánchez',
    age:       36,
    treatment: 'Carillas de porcelana',
    rating:    5,
    text:      'Llegué con una consulta de curiosidad y salí con el plan de tratamiento más claro que imaginé. Las carillas quedaron perfectas, nadie puede creer que no son mis dientes naturales. ¡El antes y después es brutal!',
    avatar:    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop&crop=face',
    before:    'Dientes descoloridos y fracturados',
    verified:  true,
  },
  {
    name:      'Ana Torres',
    age:       14,
    treatment: 'Ortodoncia infantil',
    rating:    5,
    text:      'Mi hija tenía miedo de los dientes, pero desde el primer día el equipo la trató con tanta dulzura que ahora llega contenta a cada cita. Los resultados son increíbles y ella está feliz con su nueva sonrisa.',
    avatar:    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop&crop=face',
    before:    'Dientes muy separados',
    verified:  true,
  },
  {
    name:      'Diego Ramírez',
    age:       29,
    treatment: 'Limpieza + Resinas',
    rating:    5,
    text:      'Nunca había ido al dentista con tanta tranquilidad. El ambiente de la clínica es moderno, limpio y muy agradable. Me explicaron cada paso del tratamiento y el resultado fue mejor de lo esperado.',
    avatar:    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&auto=format&fit=crop&crop=face',
    before:    'Sarro acumulado y caries',
    verified:  true,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'star-filled' : ''}
          fill={i < rating ? '#F59E0B' : 'none'}
          stroke={i < rating ? '#F59E0B' : '#D1D5DB'}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useScrollAnimation();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const featured = TESTIMONIALS[current];

  return (
    <section id="testimonios" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span className="section-badge">Testimonios</span>
          <h2 className="section-title mx-auto">
            Lo que dicen{' '}
            <span style={{ color: '#1FB6B9' }}>nuestros pacientes</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Miles de pacientes ya transformaron su sonrisa con nosotros.
            Aquí, sus historias reales.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="fade-up stagger-2 max-w-3xl mx-auto mb-14">
          <div
            className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)',
              boxShadow: '0 20px 60px rgba(31,182,185,0.3)',
            }}
          >
            {/* Quote icon */}
            <Quote
              size={64}
              className="absolute top-6 right-8 opacity-20"
              style={{ color: 'white' }}
            />

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="white" stroke="white" />
              ))}
            </div>

            {/* Text */}
            <blockquote
              className="text-white text-lg md:text-xl leading-relaxed mb-8 relative z-10"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              &ldquo;{featured.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={featured.avatar}
                alt={featured.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {featured.name}
                  </span>
                  {featured.verified && (
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ✓ Verificado
                    </span>
                  )}
                </div>
                <div className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {featured.treatment} · {featured.age} años
                </div>
              </div>

              {/* Navigation */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all rounded-full"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid of remaining testimonials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`fade-up stagger-${Math.min(i + 1, 6)}`}>
              <div
                className={`card p-6 cursor-pointer transition-all duration-200 ${i === current ? 'ring-2' : ''}`}
                style={{
                  borderRadius: '1.25rem',
                  ringColor: '#1FB6B9',
                  outline: i === current ? '2px solid #1FB6B9' : 'none',
                  outlineOffset: '0px',
                }}
                onClick={() => setCurrent(i)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}>
                      {t.name}
                    </div>
                    <StarRating rating={t.rating} />
                  </div>
                </div>
                <p
                  className="text-sm text-gray-500 leading-relaxed line-clamp-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.text}
                </p>
                <div
                  className="mt-3 text-xs font-medium"
                  style={{ color: '#1FB6B9', fontFamily: 'Poppins, sans-serif' }}
                >
                  {t.treatment}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating CTA */}
        <div className="text-center mt-12 fade-up">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{ background: '#F5F7F8' }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" stroke="#F59E0B" />
              ))}
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}>
              4.9 de 5
            </span>
            <span className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              basado en +230 reseñas en Google
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
