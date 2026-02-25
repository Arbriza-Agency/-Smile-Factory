import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Inicio',      href: '#inicio',          type: 'scroll' },
  { label: 'Nosotros',    href: '/sobre-nosotros',  type: 'route'  },
  { label: 'Servicios',   href: '#servicios',       type: 'scroll' },
  { label: 'Contacto',    href: '/contacto',        type: 'route'  },
];

const SERVICES_LINKS = [
  { label: 'Brackets metálicos',  href: '#servicios' },
  { label: 'Invisalign®',         href: '#servicios' },
  { label: 'Brackets estéticos',  href: '#servicios' },
  { label: 'Blanqueamiento',      href: '#servicios' },
  { label: 'Implantes dentales',  href: '#servicios' },
  { label: 'Limpieza dental',     href: '#servicios' },
];

const SOCIAL = [
  {
    icon: <Instagram size={18} />,
    href: 'https://instagram.com',
    label: 'Instagram',
    color: '#E1306C',
  },
  {
    icon: <Facebook size={18} />,
    href: 'https://facebook.com',
    label: 'Facebook',
    color: '#1877F2',
  },
  {
    icon: <Youtube size={18} />,
    href: 'https://youtube.com',
    label: 'YouTube',
    color: '#FF0000',
  },
];

const scroll = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

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

  return (
    <footer style={{ background: '#0D1117', color: '#E5E7EB' }}>

      {/* ── Main footer content ── */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); scroll('#inicio'); }}
              className="flex items-center gap-2 mb-4"
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
              className="text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
            >
              Clínica dental especializada en ortodoncia y odontología general.
              Transformamos sonrisas con tecnología y corazón desde 2012.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    color: '#9CA3AF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = color + '22';
                    e.currentTarget.style.color = color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = '#9CA3AF';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-bold text-sm mb-5 tracking-wide"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              Navegación
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link); }}
                    className="text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-sm mb-5 tracking-wide"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              Servicios
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scroll(href); }}
                    className="text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4
              className="font-bold text-sm mb-5 tracking-wide"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#1FB6B9' }} />
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>
                  Av. Insurgentes Sur 1234, Piso 3<br />Col. Del Valle, CDMX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#1FB6B9' }} />
                <a
                  href="tel:+525512345678"
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
                >
                  55 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: '#1FB6B9' }} />
                <a
                  href="mailto:citas@smilefactory.mx"
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
                >
                  citas@smilefactory.mx
                </a>
              </li>
            </ul>

            {/* CTA */}
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)',
                color: 'white',
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0 4px 16px rgba(31,182,185,0.35)',
                textDecoration: 'none',
              }}
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />

      {/* ── Bottom bar ── */}
      <div className="container-custom py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p
            className="text-xs"
            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}
          >
            © {year} Smile Factory. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['Aviso de Privacidad', 'Términos de Uso'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}
              >
                {l}
              </a>
            ))}
          </div>
          <p
            className="text-xs"
            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}
          >
            Hecho con ❤️ en México
          </p>
        </div>
      </div>
    </footer>
  );
}
