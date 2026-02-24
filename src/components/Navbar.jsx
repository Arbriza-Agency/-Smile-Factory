import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Inicio',       href: '#inicio' },
  { label: 'Nosotros',     href: '#nosotros' },
  { label: 'Servicios',    href: '#servicios' },
  { label: 'Galería',      href: '#galeria' },
  { label: 'Testimonios',  href: '#testimonios' },
  { label: 'Contacto',     href: '#contacto' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeLink,   setActiveLink]   = useState('#inicio');

  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  /* ── Detect scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
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
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isLanding]);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMobileOpen(false);

    if (isLanding) {
      // On landing page: smooth scroll to section
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On other pages: navigate home then scroll
      navigate('/');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 150);
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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.92)'
          : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(31,182,185,0.10)' : 'none',
      }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-18 py-4">

          {/* ── Logo ── */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 shrink-0"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg font-black shadow-md"
              style={{ background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)' }}
            >
              ✦
            </div>
            <span className="font-black text-xl tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span style={{ color: '#1FB6B9' }}>Smile</span>
              <span style={{ color: '#1E1E1E' }}> Factory</span>
            </span>
          </a>

          {/* ── Desktop links ── */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="nav-link"
                  style={{
                    color: (isLanding && activeLink === href) ? '#1FB6B9' : '#1E1E1E',
                  }}
                >
                  {label}
                  {isLanding && activeLink === href && (
                    <span
                      style={{
                        position: 'absolute', bottom: '-2px', left: 0,
                        width: '100%', height: '2px',
                        background: '#1FB6B9', borderRadius: '9999px',
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+525512345678"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: '#1FB6B9', fontFamily: 'Inter, sans-serif' }}
            >
              <Phone size={15} />
              <span>55 1234-5678</span>
            </a>
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contacto'); }}
              className="btn-primary text-sm"
              style={{ padding: '0.6rem 1.4rem' }}
            >
              Agendar Cita
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: mobileOpen ? '#E8F9F9' : 'transparent',
              color: '#1E1E1E',
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
          maxHeight: mobileOpen ? '480px' : '0px',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="container-custom pb-6 pt-2">
          <ul className="flex flex-col gap-1 mb-5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    background: (isLanding && activeLink === href) ? '#E8F9F9' : 'transparent',
                    color: (isLanding && activeLink === href) ? '#1FB6B9' : '#1E1E1E',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contacto'); }}
            className="btn-primary w-full justify-center"
          >
            Agendar Cita
          </a>
        </div>
      </div>
    </header>
  );
}
