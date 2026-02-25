import { Calendar, Shield, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSingleScrollAnimation } from '../hooks/useScrollAnimation';

const PERKS = [
  { icon: <Calendar size={18} />, text: 'Primera consulta sin costo' },
  { icon: <Clock size={18} />,    text: 'Respuesta en menos de 2 horas' },
  { icon: <Shield size={18} />,   text: 'Planes de pago flexibles' },
  { icon: <Sparkles size={18} />, text: 'Tecnologia de vanguardia' },
];

export default function CtaBanner() {
  const ref = useSingleScrollAnimation();

  return (
    <section
      ref={ref}
      className="fade-up"
      style={{ padding: '0 0' }}
    >
      <div className="container-custom">
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '2rem',
            background: 'linear-gradient(135deg, #1FB6B9 0%, #0E8C8F 100%)',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 4rem)',
            boxShadow: '0 16px 48px rgba(31,182,185,0.30)',
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              top: '-60px',
              right: '-40px',
            }}
          />
          <div
            className="absolute"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              bottom: '-30px',
              left: '10%',
            }}
          />

          <div className="relative z-10 text-center">
            <h2
              className="text-white font-bold mb-4"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                lineHeight: 1.2,
              }}
            >
              Tu sonrisa perfecta esta a una cita de distancia
            </h2>
            <p
              className="text-white/80 mb-8 mx-auto"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                maxWidth: '520px',
              }}
            >
              Agenda tu consulta de diagnostico sin costo y descubre el tratamiento
              ideal para ti. Nuestro equipo te esta esperando.
            </p>

            {/* Perks row */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
              {PERKS.map(({ icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {icon}
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 font-semibold transition-all hover:scale-105"
              style={{
                background: 'white',
                color: '#0E8C8F',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.95rem',
                padding: '0.9rem 2.4rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <Calendar size={18} />
              Agendar mi cita gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
