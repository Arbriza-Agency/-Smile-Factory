import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  { src: '/slides/slide1.jpeg', alt: 'Equipo Smile Factory en recepción' },
  { src: '/slides/slide2.jpeg', alt: 'Dentista atendiendo paciente' },
  { src: '/slides/slide3.jpeg', alt: 'Equipo completo Smile Factory' },
];

export default function Hero() {
  const textRef = useRef(null);
  const [loaded, setLoaded]   = useState(false);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => {
    setPrev(current);
    setCurrent(i);
  };

  const scrollToServices = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(14,140,143,0.88) 0%, rgba(31,182,185,0.68) 40%, rgba(10,30,40,0.78) 100%)',
            zIndex: 3,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-28 pb-20">
        <div className="max-w-3xl" ref={textRef}>

          {/* Badge — mejorado */}
          <div
            className="inline-flex items-center gap-3 mb-8 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.1s',
            }}
          >
            {/* Pill izquierda con año */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '999px',
              padding: '7px 16px 7px 10px',
            }}>
              {/* Dot animado */}
              <span style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1FB6B9, #0E8C8F)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 0 4px rgba(31,182,185,0.25)',
              }}>
                {/* Small tooth icon */}
                <svg viewBox="0 0 20 20" fill="white" width="13" height="13">
                  <path d="M10 2C7.5 2 5.5 3.5 5 5.5 4.5 7 4 9 4 11c0 3 1 6 2.5 6 .8 0 1.5-.8 2-2 .3-.8.5-1.5 1.5-1.5s1.2.7 1.5 1.5c.5 1.2 1.2 2 2 2C15 17 16 14 16 11c0-2-.5-4-1-5.5C14.5 3.5 12.5 2 10 2z"/>
                </svg>
              </span>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.01em',
              }}>
                Clínica dental de confianza
              </span>
            </div>

            {/* Separador */}
            <div style={{
              width: '1px', height: '20px',
              background: 'rgba(255,255,255,0.25)',
            }} />

            {/* Año destacado */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, rgba(168,230,231,0.25), rgba(31,182,185,0.15))',
              border: '1px solid rgba(168,230,231,0.35)',
              borderRadius: '999px',
              padding: '7px 14px',
            }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: '#A8E6E7',
                letterSpacing: '0.03em',
              }}>
                Desde 2012
              </span>
            </div>
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
            className="flex flex-wrap transition-all duration-700"
            style={{
              gap: '24px',
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
      </div>

      {/* Slide dots */}
      <div
        className="absolute z-10 flex gap-2.5"
        style={{
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.7s ease',
          transitionDelay: '0.8s',
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              background: i === current ? '#A8E6E7' : 'rgba(255,255,255,0.4)',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}