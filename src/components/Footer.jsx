import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PRACTICA_LINKS = [
  { label: 'Inicio',        href: '#inicio',         type: 'scroll' },
  { label: 'Sobre Nosotros', href: '/sobre-nosotros', type: 'route'  },
  { label: 'Servicios',     href: '#servicios',      type: 'scroll' },
  { label: 'Equipo',        href: '#equipo',         type: 'scroll' },
  { label: 'Agendar Cita',  href: '/contacto',       type: 'route'  },
];

const SERVICIOS_LINKS = [
  'Ortodoncia',
  'Cirugía Dental',
  'Blanqueamiento',
  'Limpieza Dental',
  'Carillas',
];

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (link) => {
    if (link.type === 'route') {
      navigate(link.href);
      return;
    }
    if (location.pathname === '/') {
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const handleServiceClick = () => {
    if (location.pathname === '/') {
      document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <footer style={{ background: '#1E1E1E', color: '#E5E7EB' }}>
      <div className="container-custom" style={{ padding: '80px 24px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-16 gap-y-12">

          {/* ── Col 1: Logo / Marca ── */}
          <div className="lg:col-span-1">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick({ href: '#inicio', type: 'scroll' });
              }}
              className="flex items-center gap-2 mb-6"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg font-black"
                style={{ background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)' }}
              >
                ✦
              </div>
              <span className="font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span style={{ color: '#1FB6B9' }}>Smile</span>
                <span style={{ color: '#E5E7EB' }}> Factory</span>
              </span>
            </a>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
            >
              Tu sonrisa, nuestra pasión.
            </p>
          </div>

          {/* ── Col 2: Práctica ── */}
          <div>
            <h4
              className="font-bold text-sm mb-7 tracking-wide"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#E5E7EB',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Práctica
            </h4>
            <ul className="flex flex-col gap-3.5">
              {PRACTICA_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link); }}
                    className="text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Servicios ── */}
          <div>
            <h4
              className="font-bold text-sm mb-7 tracking-wide"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#E5E7EB',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Servicios
            </h4>
            <ul className="flex flex-col gap-3.5">
              {SERVICIOS_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#servicios"
                    onClick={(e) => { e.preventDefault(); handleServiceClick(); }}
                    className="text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', textDecoration: 'none' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Oficina ── */}
          <div>
            <h4
              className="font-bold text-sm mb-7 tracking-wide"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#E5E7EB',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Oficina
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#1FB6B9' }} />
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>
                  Final Paseo Escalón, Calle Arturo Ambrogi #137, San Salvador
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: '#1FB6B9' }} />
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>
                  Lunes a Viernes: 8:00 - 5:00<br />
                  Sábado: 8:00 - 2:00
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#1FB6B9' }} />
                <a
                  href="tel:+50322724043"
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  2272-4043
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#1FB6B9"
                  className="shrink-0"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/50378685669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', textDecoration: 'none' }}
                >
                  7868-5669
                </a>
              </li>
            </ul>
          </div>

          {/* ── Col 5: Social ── */}
          <div>
            <h4
              className="font-bold text-sm mb-7 tracking-wide"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#E5E7EB',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Social
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/SmileFactorySv/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#9CA3AF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(31,182,185,0.15)';
                  e.currentTarget.style.color = '#1FB6B9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#9CA3AF';
                }}
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/smilefactorysv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#9CA3AF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(31,182,185,0.15)';
                  e.currentTarget.style.color = '#1FB6B9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#9CA3AF';
                }}
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

      {/* ── Bottom bar ── */}
      <div className="container-custom py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p
            className="text-xs"
            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}
          >
            &copy; Smile Factory {year} | Todos los derechos reservados
          </p>
          <a
            href="mailto:smilefactorysv@gmail.com"
            className="text-xs transition-colors hover:text-white"
            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', textDecoration: 'none' }}
          >
            smilefactorysv@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
