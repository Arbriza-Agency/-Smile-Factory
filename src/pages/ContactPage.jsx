import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowLeft, Calendar, ArrowRight, Shield, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const CONTACT_INFO = [
  {
    icon: <MapPin size={20} />,
    title: 'Direccion',
    lines: ['Av. Insurgentes Sur 1234, Piso 3', 'Col. Del Valle, CDMX, CP 03100'],
  },
  {
    icon: <Phone size={20} />,
    title: 'Telefono',
    lines: ['55 1234-5678', '55 9876-5432'],
  },
  {
    icon: <Mail size={20} />,
    title: 'Correo',
    lines: ['citas@smilefactory.mx', 'info@smilefactory.mx'],
  },
  {
    icon: <Clock size={20} />,
    title: 'Horario',
    lines: ['Lun - Vie: 9:00 - 20:00', 'Sab: 9:00 - 14:00'],
  },
];

const SERVICES_OPTIONS = [
  'Ortodoncia - Brackets',
  'Invisalign',
  'Blanqueamiento dental',
  'Limpieza profesional',
  'Implantes dentales',
  'Carillas de porcelana',
  'Primera consulta / Diagnostico',
  'Otro',
];

const TRUST_ITEMS = [
  { icon: <Shield size={18} />, text: 'Primera consulta sin costo' },
  { icon: <Clock size={18} />, text: 'Respuesta en menos de 2 horas' },
  { icon: <Sparkles size={18} />, text: 'Planes de pago flexibles' },
];

function ContactStyles() {
  return (
    <style>{`
      .contact-page-bg { background: #F5F7F8; min-height: 100vh; }

      /* ── Hero ── */
      .contact-hero { text-align: center; padding: 130px 24px 70px; position: relative; overflow: hidden; }
      .contact-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 90% at 50% 120%, rgba(31,182,185,0.08) 0%, transparent 65%), #F5F7F8; z-index: 0; }
      .contact-hero-content { position: relative; z-index: 1; }

      .contact-back-link { display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #1FB6B9; text-decoration: none; margin-bottom: 32px; padding: 8px 18px; border-radius: 9999px; background: rgba(31,182,185,0.08); transition: background 0.2s, transform 0.2s; }
      .contact-back-link:hover { background: rgba(31,182,185,0.15); transform: translateX(-2px); }

      .contact-hero-eyebrow { display: block; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #1FB6B9; margin-bottom: 24px; opacity: 0; animation: contact-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.15s forwards; }
      .contact-hero-title { font-family: 'Poppins', sans-serif; font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 700; color: #1E1E1E; line-height: 1.15; margin-bottom: 22px; opacity: 0; animation: contact-anim-up 0.9s cubic-bezier(.22,1,.36,1) 0.28s forwards; }
      .contact-hero-ornament { display: flex; align-items: center; justify-content: center; gap: 18px; margin-bottom: 28px; opacity: 0; animation: contact-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.42s forwards; }
      .contact-hero-ornament-line { width: 72px; height: 1px; background: linear-gradient(to right, transparent, #1FB6B9, transparent); }
      .contact-hero-ornament-glyph { font-family: 'Poppins', sans-serif; font-size: 18px; color: #1FB6B9; opacity: 0.75; }
      .contact-hero-sub { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: #6B7280; line-height: 1.9; max-width: 500px; margin: 0 auto; opacity: 0; animation: contact-anim-up 0.9s cubic-bezier(.22,1,.36,1) 0.50s forwards; }

      /* ── Trust bar ── */
      .contact-trust-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; padding: 0 24px 48px; opacity: 0; animation: contact-anim-up 0.7s ease 0.6s forwards; }
      .contact-trust-item { display: flex; align-items: center; gap: 10px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #4B5563; }
      .contact-trust-icon { width: 36px; height: 36px; border-radius: 10px; background: #E8F9F9; color: #1FB6B9; display: flex; align-items: center; justify-content: center; }

      /* ── Main content ── */
      .contact-main { max-width: 1100px; margin: 0 auto; padding: 0 24px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
      @media (max-width: 880px) { .contact-main { grid-template-columns: 1fr; gap: 40px; } }

      /* ── Form card ── */
      .contact-form-card { background: white; border-radius: 24px; padding: 48px; box-shadow: 0 4px 24px rgba(31,182,185,0.08), 0 1px 4px rgba(0,0,0,0.04); }
      @media (max-width: 520px) { .contact-form-card { padding: 32px 24px; } }

      .contact-form-title { font-family: 'Poppins', sans-serif; font-size: 1.35rem; font-weight: 700; color: #1E1E1E; margin-bottom: 0.5rem; }
      .contact-form-sub { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: #9CA3AF; margin-bottom: 2rem; line-height: 1.7; }

      .contact-label { display: block; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 600; color: #6B7280; margin-bottom: 0.5rem; }
      .contact-input { width: 100%; padding: 0.85rem 1rem; border-radius: 12px; border: 1.5px solid #E5E7EB; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #1E1E1E; background: #FAFAFA; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
      .contact-input:focus { border-color: #1FB6B9; box-shadow: 0 0 0 3px rgba(31,182,185,0.12); }
      .contact-input::placeholder { color: #C4C9D0; }

      .contact-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 520px) { .contact-input-grid { grid-template-columns: 1fr; } }

      .contact-field { margin-bottom: 20px; }

      /* ── Right side ── */
      .contact-right { display: flex; flex-direction: column; gap: 24px; }

      .contact-map-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(31,182,185,0.08); height: 280px; }
      .contact-map-wrap iframe { width: 100%; height: 100%; border: 0; filter: saturate(0.8); }

      .contact-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 520px) { .contact-info-grid { grid-template-columns: 1fr; } }

      .contact-info-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 12px rgba(31,182,185,0.06); display: flex; align-items: flex-start; gap: 14px; transition: transform 0.2s, box-shadow 0.2s; }
      .contact-info-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(31,182,185,0.12); }
      .contact-info-icon { width: 40px; height: 40px; border-radius: 12px; background: #E8F9F9; color: #1FB6B9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .contact-info-title { font-family: 'Poppins', sans-serif; font-size: 0.82rem; font-weight: 600; color: #1E1E1E; margin-bottom: 4px; }
      .contact-info-line { font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #6B7280; line-height: 1.6; }

      .contact-emergency { display: flex; align-items: center; gap: 16px; padding: 20px 24px; border-radius: 16px; background: #E8F9F9; border: 1px solid #A8E6E7; }
      .contact-emergency-title { font-family: 'Poppins', sans-serif; font-size: 0.88rem; font-weight: 600; color: #0E8C8F; margin-bottom: 2px; }
      .contact-emergency-text { font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #6B7280; }

      /* ── Success state ── */
      .contact-success { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 48px 24px; gap: 20px; }
      .contact-success-icon { width: 72px; height: 72px; border-radius: 50%; background: #E8F9F9; display: flex; align-items: center; justify-content: center; }
      .contact-success-title { font-family: 'Poppins', sans-serif; font-size: 1.4rem; font-weight: 700; color: #1E1E1E; }
      .contact-success-text { font-family: 'Inter', sans-serif; font-size: 0.92rem; color: #6B7280; line-height: 1.8; max-width: 380px; }

      @keyframes contact-anim-up { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
    `}</style>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  return (
    <div className="contact-page-bg">
      <ContactStyles />
      <Navbar />

      {/* Hero */}
      <header className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-content">
          <Link to="/" className="contact-back-link">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <span className="contact-hero-eyebrow">Contacto</span>
          <h1 className="contact-hero-title">
            Agenda tu cita y
            <br />
            <span style={{ color: '#1FB6B9' }}>transforma tu sonrisa</span>
          </h1>
          <div className="contact-hero-ornament">
            <span className="contact-hero-ornament-line" />
            <span className="contact-hero-ornament-glyph">✦</span>
            <span className="contact-hero-ornament-line" />
          </div>
          <p className="contact-hero-sub">
            Completa el formulario y nuestro equipo se pondra en contacto contigo
            para confirmar tu cita. La primera consulta de diagnostico es sin costo.
          </p>
        </div>
      </header>

      {/* Trust bar */}
      <div className="contact-trust-bar">
        {TRUST_ITEMS.map(({ icon, text }, i) => (
          <div key={i} className="contact-trust-item">
            <span className="contact-trust-icon">{icon}</span>
            {text}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="contact-main">

        {/* Form */}
        <div className="contact-form-card">
          {sent ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <CheckCircle size={36} style={{ color: '#1FB6B9' }} />
              </div>
              <h3 className="contact-success-title">Mensaje recibido</h3>
              <p className="contact-success-text">
                Gracias por contactarnos. Un miembro del equipo se comunicara
                contigo muy pronto para confirmar tu cita.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', phone: '', service: '', message: '' });
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="contact-form-title">Agenda tu cita</h3>
              <p className="contact-form-sub">
                Llena tus datos y te contactaremos para confirmar tu cita.
              </p>

              <div className="contact-input-grid">
                <div className="contact-field">
                  <label className="contact-label">Nombre completo *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Maria Garcia"
                    value={form.name}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label">Telefono *</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="55 1234-5678"
                    value={form.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label">Correo electronico *</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="maria@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div className="contact-field">
                <label className="contact-label">Servicio de interes</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="contact-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Selecciona un servicio...</option>
                  {SERVICES_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="contact-field">
                <label className="contact-label">Mensaje (opcional)</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Cuentanos sobre tu caso o cualquier duda que tengas..."
                  value={form.message}
                  onChange={handleChange}
                  className="contact-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center w-full"
                style={{ opacity: loading ? 0.8 : 1, marginTop: '0.5rem' }}
              >
                {loading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar solicitud
                  </>
                )}
              </button>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  color: '#9CA3AF',
                  textAlign: 'center',
                  marginTop: '1rem',
                }}
              >
                Primera consulta de diagnostico sin costo · Respuesta en menos de 2h
              </p>
            </form>
          )}
        </div>

        {/* Right side */}
        <div className="contact-right">
          <div className="contact-map-wrap">
            <iframe
              title="Ubicacion Smile Factory"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.078!2d-99.1677!3d19.3909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3a1234%3A0x5678!2sAv.+Insurgentes+Sur%2C+Ciudad+de+M%C3%A9xico!5e0!3m2!1ses!2smx!4v1700000000000"
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          <div className="contact-info-grid">
            {CONTACT_INFO.map(({ icon, title, lines }, i) => (
              <div key={i} className="contact-info-card">
                <div className="contact-info-icon">{icon}</div>
                <div>
                  <div className="contact-info-title">{title}</div>
                  {lines.map((l, j) => (
                    <div key={j} className="contact-info-line">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-emergency">
            <span style={{ fontSize: '1.75rem' }}>🚨</span>
            <div>
              <div className="contact-emergency-title">Urgencias dentales</div>
              <div className="contact-emergency-text">
                Atencion de emergencias mismo dia. Llama ahora al 55 1234-5678.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
