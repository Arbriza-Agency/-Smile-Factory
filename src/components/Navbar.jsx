import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ChevronDown, Heart, User, Building2 } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import DOCTORS from '../data/doctors';

const NOSOTROS_ITEMS = [
  { label: 'Misión', href: '/sobre-nosotros#mision', icon: <Heart size={16} /> },
  { label: DOCTORS[0].name, href: `/sobre-nosotros#${DOCTORS[0].id}`, icon: <User size={16} /> },
  { label: DOCTORS[1].name, href: `/sobre-nosotros#${DOCTORS[1].id}`, icon: <User size={16} /> },
  { label: 'Instalaciones', href: '/sobre-nosotros#instalaciones', icon: <Building2 size={16} /> },
];

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio',    type: 'scroll' },
  { label: 'Servicios', href: '#servicios', type: 'scroll' },
  { label: 'Nosotros',  href: '/sobre-nosotros', type: 'dropdown' },
  { label: 'Contacto',  href: '/contacto',  type: 'route' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState('#inicio');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNosotros, setMobileNosotros] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimer = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const isAbout   = location.pathname === '/sobre-nosotros';
  const isContact = location.pathname === '/contacto';

  /* ── Detect scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Active link via IntersectionObserver (only on landing) ── */
  useEffect(() => {
    if (!isLanding) return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isLanding]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 200);
  };

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

    if (link.type === 'route') {
      navigate(link.href);
      return;
    }

    if (link.type === 'dropdown') {
      navigate(link.href);
      return;
    }

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
    if (isLanding) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const isActive = (link) => {
    if (link.type === 'dropdown') return isAbout;
    if (link.type === 'route' && link.href === '/contacto') return isContact;
    return isLanding && activeLink === link.href;
  };

  return (
    <>
      <style>{`
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          min-width: 260px;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(31,182,185,0.12), 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid rgba(31,182,185,0.08);
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
        .nav-dropdown-item:hover {
          background: #E8F9F9;
          color: #1FB6B9;
        }
        .nav-dropdown-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #F3FAFA;
          color: #1FB6B9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .nav-dropdown-item:hover .nav-dropdown-icon {
          background: #D1F2F3;
        }
        .nav-dropdown-sep {
          height: 1px;
          background: rgba(31,182,185,0.08);
          margin: 4px 12px;
        }
        .mobile-sub-items {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }
        .mobile-sub-items.open {
          max-height: 300px;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          boxShadow: scrolled ? '0 1px 20px rgba(31,182,185,0.08)' : 'none',
        }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between py-5">

            {/* ── Logo ── */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-black shadow-md transition-transform duration-200 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)' }}
              >
                ✦
              </div>
              <span
                className="font-black text-xl tracking-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span style={{ color: '#1FB6B9' }}>Smile</span>
                <span style={{ color: '#1E1E1E' }}> Factory</span>
              </span>
            </a>

            {/* ── Desktop links ── */}
            <ul className="hidden md:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={link.type === 'dropdown' ? handleDropdownEnter : undefined}
                  onMouseLeave={link.type === 'dropdown' ? handleDropdownLeave : undefined}
                  ref={link.type === 'dropdown' ? dropdownRef : undefined}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                    className="nav-link"
                    style={{
                      color: isActive(link) ? '#1FB6B9' : '#1E1E1E',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {link.label}
                    {link.type === 'dropdown' && (
                      <ChevronDown
                        size={14}
                        style={{
                          transition: 'transform 0.25s ease',
                          transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                        }}
                      />
                    )}
                    {isActive(link) && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: '#1FB6B9',
                          borderRadius: '9999px',
                        }}
                      />
                    )}
                  </a>

                  {/* Dropdown for Nosotros */}
                  {link.type === 'dropdown' && (
                    <div className={`nav-dropdown${dropdownOpen ? ' open' : ''}`}>
                      {NOSOTROS_ITEMS.map((item, i) => (
                        <div key={item.label}>
                          {i === NOSOTROS_ITEMS.length - 1 && <div className="nav-dropdown-sep" />}
                          <button
                            className="nav-dropdown-item"
                            onClick={() => handleDropdownItemClick(item)}
                          >
                            <span className="nav-dropdown-icon">{item.icon}</span>
                            {item.label}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="tel:+525512345678"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: '#1FB6B9', fontFamily: 'Inter, sans-serif' }}
              >
                <Phone size={15} />
                <span>55 1234-5678</span>
              </a>
              <Link
                to="/contacto"
                className="btn-primary text-sm"
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
                background: mobileOpen ? '#E8F9F9' : 'transparent',
                color: '#1E1E1E',
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
            <ul className="flex flex-col gap-1.5 mb-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.type === 'dropdown' ? (
                    <>
                      <button
                        onClick={() => setMobileNosotros(!mobileNosotros)}
                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          background: isActive(link) ? '#E8F9F9' : 'transparent',
                          color: isActive(link) ? '#1FB6B9' : '#1E1E1E',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          style={{
                            transition: 'transform 0.25s',
                            transform: mobileNosotros ? 'rotate(180deg)' : 'none',
                          }}
                        />
                      </button>
                      <div className={`mobile-sub-items${mobileNosotros ? ' open' : ''}`}>
                        {NOSOTROS_ITEMS.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleDropdownItemClick(item)}
                            className="flex items-center gap-3 w-full px-8 py-3 text-sm transition-all"
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              color: '#6B7280',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <span style={{ color: '#1FB6B9' }}>{item.icon}</span>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link);
                      }}
                      className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: isActive(link) ? '#E8F9F9' : 'transparent',
                        color: isActive(link) ? '#1FB6B9' : '#1E1E1E',
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to="/contacto"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
