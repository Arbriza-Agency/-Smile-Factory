import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, Star, Users, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { icon: <Users size={20} />, value: '3,500+', label: 'Pacientes felices' },
  { icon: <Award size={20} />, value: '12',     label: 'Años de experiencia' },
  { icon: <Star  size={20} />, value: '4.9',    label: 'Calificación promedio' },
  { icon: <Clock size={20} />, value: '98%',    label: 'Satisfacción' },
];

export default function Hero() {
  const textRef  = useRef(null);
  const statsRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToServices = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=85&auto=format&fit=crop"
          alt="Equipo dental profesional Smile Factory"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(14,140,143,0.90) 0%, rgba(31,182,185,0.70) 40%, rgba(10,30,40,0.75) 100%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-custom pt-28 pb-16">
        <div className="max-w-3xl" ref={textRef}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold transition-all duration-700"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.1s',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#A8E6E7' }}
            />
            Clínica dental de confianza desde 2012
          </div>

          {/* Headline */}
          <h1
            className="font-black text-white mb-6 leading-none transition-all duration-700"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.2s',
            }}
          >
            Tu sonrisa perfecta,
            <br />
            <span style={{ color: '#A8E6E7' }}>nuestra pasión.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/80 mb-10 transition-all duration-700"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              maxWidth: '560px',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.35s',
            }}
          >
            Especialistas en ortodoncia e odontología general. Transformamos
            sonrisas con tecnología de vanguardia y un trato humano y cálido.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.5s',
            }}
          >
            <button onClick={() => navigate('/contacto')} className="btn-primary">
              <Calendar size={18} />
              Agendar Cita
            </button>
            <button onClick={scrollToServices} className="btn-outline">
              Conoce nuestros servicios
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '0.7s',
          }}
        >
          {STATS.map(({ icon, value, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <span style={{ color: '#A8E6E7' }}>{icon}</span>
              <div>
                <div
                  className="text-white font-bold text-xl leading-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {value}
                </div>
                <div
                  className="text-white/70 text-xs mt-0.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-700"
        style={{
          opacity: loaded ? 0.7 : 0,
          transitionDelay: '1s',
          color: 'white',
        }}
      >
        <span className="text-xs tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
          SCROLL
        </span>
        <div
          className="w-px bg-white/50"
          style={{ height: '40px', animation: 'none' }}
        />
      </div>
    </section>
  );
}
