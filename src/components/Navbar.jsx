import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ChevronDown, Heart, User, Building2, MapPin, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import DOCTORS from '../data/doctors';

const NOSOTROS_ITEMS = [
  { label: 'Misión', href: '/sobre-nosotros#mision', icon: <Heart size={16} /> },
  { label: DOCTORS[0].name, href: `/sobre-nosotros#${DOCTORS[0].id}`, icon: <User size={16} /> },
  { label: DOCTORS[1].name, href: `/sobre-nosotros#${DOCTORS[1].id}`, icon: <User size={16} /> },
  { label: 'Instalaciones', href: '/sobre-nosotros#instalaciones', icon: <Building2 size={16} /> },
];

const CONTACTO_ITEMS = [
  {
    label: 'Mapa',
    href: 'https://maps.google.com/?q=Calle+Arturo+Ambrogi+137+Escalon+San+Salvador+El+Salvador',
    icon: <MapPin size={16} />,
    external: true,
  },
  {
    label: 'Teléfonos',
    href: 'tel:+50322724043',
    icon: <Phone size={16} />,
    external: true,
    subtitle: '2272-4043',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/50378685669?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20agendar%20una%20cita%20en%20Smile%20Factory.',
    icon: <MessageCircle size={16} />,
    external: true,
    subtitle: '7868-5669',
  },
];

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio',    type: 'scroll' },
  { label: 'Servicios', href: '#servicios', type: 'scroll' },
  { label: 'Nosotros',  href: '/sobre-nosotros', type: 'dropdown' },
  { label: 'Contacto',  href: '/contacto',  type: 'dropdown' },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeLink,     setActiveLink]     = useState('#inicio');
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const [contactoOpen,   setContactoOpen]   = useState(false);
  const [mobileNosotros, setMobileNosotros] = useState(false);
  const [mobileContacto, setMobileContacto] = useState(false);
  const dropdownRef   = useRef(null);
  const dropdownTimer = useRef(null);
  const contactoRef   = useRef(null);
  const contactoTimer = useRef(null);

  const location  = useLocation();
  const navigate  = useNavigate();
  const isLanding = location.pathname === '/';
  const isAbout   = location.pathname === '/sobre-nosotros';
  const isContact = location.pathname === '/contacto';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isLanding) return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveLink(`#${e.target.id}`); }); },
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isLanding]);

  const handleDropdownEnter = () => { clearTimeout(dropdownTimer.current); setDropdownOpen(true); };
  const handleDropdownLeave = () => { dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 200); };
  const handleContactoEnter = () => { clearTimeout(contactoTimer.current); setContactoOpen(true); };
  const handleContactoLeave = () => { contactoTimer.current = setTimeout(() => setContactoOpen(false), 200); };

  const handleDropdownItemClick = (item) => {
    setDropdownOpen(false);
    setMobileOpen(false);
    const [path, hash] = item.href.split('#');
    if (location.pathname === path) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(item.href);
    }
  };

  const handleNavClick = (link) => {
    setMobileOpen(false);
    if (link.type === 'dropdown') { navigate(link.href); return; }
    setActiveLink(link.href);
    if (isLanding) {
      const target = document.querySelector(link.href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const target = document.querySelector(link.href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isLanding) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else { navigate('/'); }
  };

  const isActive = (link) => {
    if (link.label === 'Nosotros') return isAbout;
    if (link.label === 'Contacto') return isContact;
    return isLanding && activeLink === link.href;
  };

  return (
    <>
      <style>{`
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          min-width: 260px;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(31,182,185,0.13), 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(31,182,185,0.10);
          padding: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 100;
        }
        .nav-dropdown.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        .nav-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #4B5563;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .nav-dropdown-item:hover { background: #E8F9F9; color: #1FB6B9; }
        .nav-dropdown-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: #F3FAFA; color: #1FB6B9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .nav-dropdown-item:hover .nav-dropdown-icon { background: #D1F2F3; }
        .nav-dropdown-sep { height: 1px; background: rgba(31,182,185,0.08); margin: 4px 12px; }
        .mobile-sub-items { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; }
        .mobile-sub-items.open { max-height: 300px; }

        /* Nav link styles */
        .nav-link-item {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          text-decoration: none;
          padding: 6px 2px;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: #1FB6B9;
          border-radius: 999px;
          transition: width 0.25s ease;
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after { width: 100%; }
        .nav-link-item:hover { color: #1FB6B9 !important; }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.3)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.3)' : 'none',
          boxShadow: scrolled ? '0 1px 24px rgba(31,182,185,0.10), 0 1px 4px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="container-custom">
          <nav
            className="flex items-center justify-between"
            style={{ paddingTop: '18px', paddingBottom: '18px' }}
          >

            {/* ── Logo ── */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center shrink-0 group"
              style={{ textDecoration: 'none' }}
            >
              <img
                src="/logo1.png"
                alt="Smile Factory — Ortodoncia y Estudio Dental"
                style={{
                  height: '80px',
                  width: 'auto',
                  objectFit: 'contain',
                  /* El logo tiene fondo negro — lo filtramos para que se vea
                     bien sobre el navbar transparente y el fondo blanco */
                  filter: scrolled
                    ? 'brightness(0) saturate(100%) invert(56%) sepia(72%) saturate(421%) hue-rotate(143deg) brightness(93%) contrast(92%)'
                    : 'brightness(0) invert(1)',
                  transition: 'filter 0.3s ease, transform 0.2s ease',
                  transform: 'scale(1)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </a>

            {/* ── Desktop links ── */}
            <ul className="hidden md:flex items-center gap-10" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_LINKS.map((link) => {
                const isNosotros = link.label === 'Nosotros';
                const isContacto = link.label === 'Contacto';
                const isDropdown = link.type === 'dropdown';
                const active     = isActive(link);

                return (
                  <li
                    key={link.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={isNosotros ? handleDropdownEnter : isContacto ? handleContactoEnter : undefined}
                    onMouseLeave={isNosotros ? handleDropdownLeave : isContacto ? handleContactoLeave : undefined}
                    ref={isNosotros ? dropdownRef : isContacto ? contactoRef : undefined}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); if (!isDropdown) handleNavClick(link); }}
                      className={`nav-link-item${active ? ' active' : ''}`}
                      style={{ color: active ? '#1FB6B9' : scrolled ? '#1E1E1E' : 'white' }}
                    >
                      {link.label}
                      {isDropdown && (
                        <ChevronDown
                          size={14}
                          style={{
                            transition: 'transform 0.25s ease',
                            transform: (isNosotros && dropdownOpen) || (isContacto && contactoOpen) ? 'rotate(180deg)' : 'none',
                          }}
                        />
                      )}
                    </a>

                    {/* Dropdown Nosotros */}
                    {isNosotros && (
                      <div className={`nav-dropdown${dropdownOpen ? ' open' : ''}`}>
                        {NOSOTROS_ITEMS.map((item, i) => (
                          <div key={item.label}>
                            {i === NOSOTROS_ITEMS.length - 1 && <div className="nav-dropdown-sep" />}
                            <button className="nav-dropdown-item" onClick={() => handleDropdownItemClick(item)}>
                              <span className="nav-dropdown-icon">{item.icon}</span>
                              {item.label}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dropdown Contacto */}
                    {isContacto && (
                      <div className={`nav-dropdown${contactoOpen ? ' open' : ''}`}>
                        {CONTACTO_ITEMS.map((item, i) => (
                          <div key={item.label}>
                            {i > 0 && <div className="nav-dropdown-sep" />}
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="nav-dropdown-item"
                              onClick={() => setContactoOpen(false)}
                            >
                              <span className="nav-dropdown-icon">{item.icon}</span>
                              <span>
                                {item.label}
                                {item.subtitle && (
                                  <span style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', fontWeight: 400 }}>
                                    {item.subtitle}
                                  </span>
                                )}
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="tel:+50322724043"
                className="flex items-center gap-2 text-sm font-medium transition-all hover:opacity-75"
                style={{
                  color: scrolled ? '#1FB6B9' : 'white',
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease, opacity 0.2s ease',
                }}
              >
                <Phone size={15} />
                <span>2272-4043</span>
              </a>
              <Link
                to="/contacto"
                className="btn-primary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.85rem' }}
              >
                Agendar Cita
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: mobileOpen ? '#E8F9F9' : 'rgba(255,255,255,0.15)',
                color: scrolled ? '#1E1E1E' : 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? '600px' : '0px',
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="container-custom pb-6 pt-3">
            <ul className="flex flex-col gap-1.5 mb-6" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.type === 'dropdown' && link.label === 'Nosotros' ? (
                    <>
                      <button
                        onClick={() => setMobileNosotros(!mobileNosotros)}
                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-medium"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          background: isActive(link) ? '#E8F9F9' : 'transparent',
                          color: isActive(link) ? '#1FB6B9' : '#1E1E1E',
                          border: 'none', cursor: 'pointer',
                        }}
                      >
                        {link.label}
                        <ChevronDown size={16} style={{ transition: 'transform 0.25s', transform: mobileNosotros ? 'rotate(180deg)' : 'none' }} />
                      </button>
                      <div className={`mobile-sub-items${mobileNosotros ? ' open' : ''}`}>
                        {NOSOTROS_ITEMS.map((item) => (
                          <button key={item.label} onClick={() => handleDropdownItemClick(item)}
                            className="flex items-center gap-3 w-full px-8 py-3 text-sm"
                            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                          >
                            <span style={{ color: '#1FB6B9' }}>{item.icon}</span>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : link.type === 'dropdown' && link.label === 'Contacto' ? (
                    <>
                      <button
                        onClick={() => setMobileContacto(!mobileContacto)}
                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-medium"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          background: isActive(link) ? '#E8F9F9' : 'transparent',
                          color: isActive(link) ? '#1FB6B9' : '#1E1E1E',
                          border: 'none', cursor: 'pointer',
                        }}
                      >
                        {link.label}
                        <ChevronDown size={16} style={{ transition: 'transform 0.25s', transform: mobileContacto ? 'rotate(180deg)' : 'none' }} />
                      </button>
                      <div className={`mobile-sub-items${mobileContacto ? ' open' : ''}`}>
                        {CONTACTO_ITEMS.map((item) => (
                          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 w-full px-8 py-3 text-sm"
                            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', textDecoration: 'none' }}
                          >
                            <span style={{ color: '#1FB6B9' }}>{item.icon}</span>
                            <span>
                              {item.label}
                              {item.subtitle && (
                                <span style={{ marginLeft: '6px', fontSize: '12px', color: '#9CA3AF' }}>{item.subtitle}</span>
                              )}
                            </span>
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                      className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: isActive(link) ? '#E8F9F9' : 'transparent',
                        color: isActive(link) ? '#1FB6B9' : '#1E1E1E',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <Link to="/contacto" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
              Agendar Cita
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}