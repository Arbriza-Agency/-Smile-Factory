import { CheckCircle, Heart, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const VALUES = [
  {
    icon: <Heart size={22} />,
    title: 'Trato humano',
    desc: 'Cada paciente es único. Nos tomamos el tiempo para escucharte y entender tus necesidades.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Seguridad y esterilidad',
    desc: 'Protocolos de higiene de nivel hospitalario en cada procedimiento.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Tecnología avanzada',
    desc: 'Equipos digitales de última generación para diagnósticos precisos y tratamientos eficaces.',
  },
];

const ACHIEVEMENTS = [
  { value: '3,500+', label: 'Pacientes atendidos' },
  { value: '97%',    label: 'Recomendarían la clínica' },
  { value: '12',     label: 'Años de trayectoria' },
  { value: '8',      label: 'Especialistas certificados' },
];

export default function AboutUs() {
  const ref = useScrollAnimation();

  return (
    <section id="nosotros" className="section-padding" style={{ background: '#F5F7F8' }} ref={ref}>
      <div className="container-custom">

        {/* ── Grid: image + text ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left – images collage */}
          <div className="fade-left relative">
            {/* Main image */}
            <div className="img-zoom rounded-2xl overflow-hidden shadow-2xl" style={{ borderRadius: '1.5rem' }}>
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=85&auto=format&fit=crop"
                alt="Equipo de Smile Factory"
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* Floating card – experience */}
            <div
              className="absolute -bottom-6 -right-4 card px-5 py-4 text-center"
              style={{
                borderRadius: '1.25rem',
                boxShadow: '0 12px 40px rgba(31,182,185,0.2)',
                minWidth: '150px',
              }}
            >
              <div
                className="text-3xl font-black leading-none"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#1FB6B9' }}
              >
                12+
              </div>
              <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Años cuidando<br />sonrisas
              </div>
            </div>

            {/* Floating card – rating */}
            <div
              className="absolute -top-4 -right-4 card px-4 py-3 flex items-center gap-2"
              style={{ borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
            >
              <div className="text-yellow-400 text-lg">★★★★★</div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>4.9 / 5</div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Google reviews</div>
              </div>
            </div>
          </div>

          {/* Right – text */}
          <div className="fade-right">
            <span className="section-badge">Sobre Nosotros</span>
            <h2 className="section-title">
              Más de una década<br />
              <span style={{ color: '#1FB6B9' }}>transformando sonrisas</span>
            </h2>
            <p className="section-subtitle mb-6">
              En Smile Factory combinamos experiencia clínica, tecnología de vanguardia
              y un equipo apasionado para ofrecerte la mejor atención dental. Creemos que
              una sonrisa saludable transforma vidas.
            </p>
            <p className="section-subtitle mb-8">
              Desde 2012 hemos atendido a miles de familias, siempre con el compromiso de
              brindar tratamientos seguros, efectivos y adaptados a cada persona.
            </p>

            {/* Values */}
            <div className="flex flex-col gap-4 mb-8">
              {VALUES.map(({ icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: '#E8F9F9', color: '#1FB6B9' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-sm mb-0.5"
                      style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}
                    >
                      {title}
                    </h4>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/contacto" className="btn-primary inline-flex">
              <CheckCircle size={18} />
              Agendar mi primera cita
            </Link>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {ACHIEVEMENTS.map(({ value, label }, i) => (
            <div
              key={i}
              className={`fade-up stagger-${i + 1} text-center`}
            >
              <div
                className="text-4xl font-black mb-1"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#1FB6B9' }}
              >
                {value}
              </div>
              <div className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
