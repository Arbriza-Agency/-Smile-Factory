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

  /* Fade-in inicial */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Precargar TODAS las imágenes al montar — fix clave */
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  /* Slideshow automático cada 5 s */
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

        {/* Gradient overlay encima de todas las imágenes */}
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
          bottom: '56px',
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

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 0.7 : 0,
          transition: 'opacity 0.7s ease',
          transitionDelay: '1s',
          color: 'white',
        }}
      >
        <span className="text-xs tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
          SCROLL
        </span>
        <div className="w-px bg-white/50" style={{ height: '36px' }} />
      </div>
    </section>
  );
}