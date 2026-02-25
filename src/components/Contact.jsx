import { Phone, Mail, MapPin, Clock, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CONTACT_INFO = [
  {
    icon: <MapPin size={20} />,
    title: 'Direccion',
    text: 'Final Paseo Escalón, Calle Arturo Ambrogi #137, Escalón, San Salvador',
  },
  {
    icon: <Phone size={20} />,
    title: 'Telefono',
    text: 'Oficina: 2272-4043 · WhatsApp: 7868-5669',
  },
  {
    icon: <Mail size={20} />,
    title: 'Correo',
    text: 'smilefactorysv@gmail.com',
  },
  {
    icon: <Clock size={20} />,
    title: 'Horario',
    text: 'Lun-Vie: 8:00-5:00 · Sab: 8:00-2:00',
  },
];

export default function Contact() {
  const ref = useScrollAnimation();

  return (
    <section id="contacto" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span className="section-badge">Contactanos</span>
          <h2 className="section-title mx-auto">
            ¿Listo para tu{' '}
            <span style={{ color: '#1FB6B9' }}>nueva sonrisa?</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', lineHeight: 1.85 }}>
            Agenda tu consulta de diagnostico sin costo. Nuestro equipo te
            contactara en menos de 2 horas.
          </p>
        </div>

        {/* Content */}
        <div className="fade-up stagger-2">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '1.75rem',
              background: 'white',
              boxShadow: '0 8px 48px rgba(31,182,185,0.10), 0 2px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div className="grid md:grid-cols-2 items-stretch">

              {/* Left – Map */}
              <div className="relative overflow-hidden" style={{ minHeight: '360px' }}>
                <iframe
                  title="Ubicacion Smile Factory"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2!2d-89.2534!3d13.7002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633067b0dfffff%3A0x0!2sCalle+Arturo+Ambrogi+137%2C+San+Salvador!5e0!3m2!1ses!2ssv!4v1700000000000"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    filter: 'saturate(0.85)',
                  }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              {/* Right – Info + CTA */}
              <div
                className="flex flex-col justify-center"
                style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                <h3
                  className="font-bold"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                    color: '#1E1E1E',
                    lineHeight: 1.2,
                    marginBottom: '1.5rem',
                  }}
                >
                  Visitanos o agenda tu cita
                </h3>

                {/* Info items */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    marginBottom: '2rem',
                  }}
                >
                  {CONTACT_INFO.map(({ icon, title, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: '#E8F9F9',
                          color: '#1FB6B9',
                        }}
                      >
                        {icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#1E1E1E',
                            marginBottom: '2px',
                          }}
                        >
                          {title}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.85rem',
                            color: '#6B7280',
                            lineHeight: 1.6,
                          }}
                        >
                          {text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to="/contacto"
                  className="btn-primary inline-flex self-start"
                  style={{ padding: '0.85rem 2.2rem', gap: '10px' }}
                >
                  <Calendar size={16} />
                  Agendar mi cita gratis
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
