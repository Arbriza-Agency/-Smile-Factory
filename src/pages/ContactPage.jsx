import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  ArrowLeft, Instagram, Facebook,
  MessageCircle, ArrowRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SERVICES_OPTIONS = [
  'Limpiezas',
  'Carillas',
  'Brackets',
  'Rellenos',
  'Blanqueamientos',
  'Diagnostico general',
  'Endodoncia',
  'Protesis fija',
  'Protesis removible',
  'Otro',
];

function ContactStyles() {
  return (
    <style>{`
      .contact-page-bg { background: #F5F7F8; min-height: 100vh; }

      /* ── Hero compacto ── */
      .contact-hero {
        text-align: center;
        padding: 140px 24px 80px;
        position: relative;
        overflow: hidden;
      }
      .contact-hero-bg {
        position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(14,140,143,0.88) 0%, rgba(31,182,185,0.72) 40%, rgba(10,30,40,0.80) 100%);
        z-index: 1;
      }
      .contact-hero-img {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        object-fit: cover; object-position: center center;
        z-index: 0;
      }
      .contact-hero-content { position: relative; z-index: 2; }

      .contact-back-link {
        display: inline-flex; align-items: center; gap: 6px;
        font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
        color: rgba(255,255,255,0.85); text-decoration: none; margin-bottom: 28px;
        padding: 8px 18px; border-radius: 9999px;
        background: rgba(255,255,255,0.15);
        transition: background 0.2s, transform 0.2s;
      }
      .contact-back-link:hover { background: rgba(255,255,255,0.25); transform: translateX(-2px); }

      .contact-hero-title {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(1.8rem, 4vw, 2.8rem);
        font-weight: 700; color: white;
        line-height: 1.15; margin-bottom: 16px;
        opacity: 0; animation: contact-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.15s forwards;
      }
      .contact-hero-sub {
        font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400;
        color: rgba(255,255,255,0.85); line-height: 1.8;
        max-width: 480px; margin: 0 auto 20px;
        opacity: 0; animation: contact-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.3s forwards;
      }
      .contact-hero-phone {
        display: inline-flex; align-items: center; gap: 10px;
        font-family: 'Poppins', sans-serif; font-size: 1.15rem; font-weight: 700;
        color: white; text-decoration: none;
        background: rgba(255,255,255,0.18); padding: 12px 28px;
        border-radius: 9999px; backdrop-filter: blur(8px);
        transition: background 0.2s, transform 0.2s;
        opacity: 0; animation: contact-anim-up 0.7s cubic-bezier(.22,1,.36,1) 0.45s forwards;
      }
      .contact-hero-phone:hover { background: rgba(255,255,255,0.3); transform: scale(1.03); }

      /* ── Form section ── */
      .contact-form-section {
        max-width: 680px; margin: 0 auto; padding: 48px 24px 56px;
      }
      .contact-form-card {
        background: white; border-radius: 24px; padding: 48px;
        box-shadow: 0 4px 24px rgba(31,182,185,0.08), 0 1px 4px rgba(0,0,0,0.04);
      }
      @media (max-width: 520px) { .contact-form-card { padding: 32px 24px; } }

      .contact-form-title {
        font-family: 'Poppins', sans-serif; font-size: 1.35rem;
        font-weight: 700; color: #1E1E1E; margin-bottom: 0.5rem;
      }
      .contact-form-sub {
        font-family: 'Inter', sans-serif; font-size: 0.88rem;
        color: #9CA3AF; margin-bottom: 2rem; line-height: 1.7;
      }
      .contact-label {
        display: block; font-family: 'Inter', sans-serif;
        font-size: 0.78rem; font-weight: 600; color: #6B7280; margin-bottom: 0.5rem;
      }
      .contact-input {
        width: 100%; padding: 0.85rem 1rem; border-radius: 12px;
        border: 1.5px solid #E5E7EB; font-family: 'Inter', sans-serif;
        font-size: 0.9rem; color: #1E1E1E; background: #FAFAFA;
        outline: none; transition: border-color 0.2s, box-shadow 0.2s;
      }
      .contact-input:focus { border-color: #1FB6B9; box-shadow: 0 0 0 3px rgba(31,182,185,0.12); }
      .contact-input::placeholder { color: #C4C9D0; }

      .contact-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 520px) { .contact-input-grid { grid-template-columns: 1fr; } }
      .contact-field { margin-bottom: 20px; }

      /* ── WhatsApp CTA ── */
      .contact-wa-cta {
        display: flex; align-items: center; gap: 16px;
        padding: 20px 24px; border-radius: 16px;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        margin-top: 24px; text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 20px rgba(37,211,102,0.25);
      }
      .contact-wa-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.35); }
      .contact-wa-icon {
        width: 48px; height: 48px; border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .contact-wa-title {
        font-family: 'Poppins', sans-serif; font-size: 0.95rem;
        font-weight: 700; color: white; margin-bottom: 2px;
      }
      .contact-wa-sub {
        font-family: 'Inter', sans-serif; font-size: 0.8rem;
        color: rgba(255,255,255,0.85); line-height: 1.5;
      }

      /* ── Success state ── */
      .contact-success {
        display: flex; flex-direction: column; align-items: center;
        text-align: center; padding: 48px 24px; gap: 20px;
      }
      .contact-success-icon {
        width: 72px; height: 72px; border-radius: 50%;
        background: #E8F9F9; display: flex; align-items: center; justify-content: center;
      }
      .contact-success-title {
        font-family: 'Poppins', sans-serif; font-size: 1.4rem;
        font-weight: 700; color: #1E1E1E;
      }
      .contact-success-text {
        font-family: 'Inter', sans-serif; font-size: 0.92rem;
        color: #6B7280; line-height: 1.8; max-width: 380px;
      }

      /* ── Info + Map section ── */
      .contact-info-section {
        max-width: 1100px; margin: 0 auto;
        padding: 0 24px 80px;
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 48px; align-items: stretch;
      }
      @media (max-width: 880px) { .contact-info-section { grid-template-columns: 1fr; gap: 32px; } }

      .contact-map-wrap {
        border-radius: 20px; overflow: hidden;
        box-shadow: 0 4px 24px rgba(31,182,185,0.08);
        min-height: 400px;
      }
      .contact-map-wrap iframe { width: 100%; height: 100%; border: 0; filter: saturate(0.85); }

      .contact-info-list { display: flex; flex-direction: column; gap: 20px; }
      .contact-info-card {
        background: white; border-radius: 16px; padding: 20px;
        box-shadow: 0 2px 12px rgba(31,182,185,0.06);
        display: flex; align-items: flex-start; gap: 14px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .contact-info-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(31,182,185,0.12); }
      .contact-info-icon {
        width: 40px; height: 40px; border-radius: 12px;
        background: #E8F9F9; color: #1FB6B9;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .contact-info-title {
        font-family: 'Poppins', sans-serif; font-size: 0.82rem;
        font-weight: 600; color: #1E1E1E; margin-bottom: 4px;
      }
      .contact-info-line {
        font-family: 'Inter', sans-serif; font-size: 0.8rem;
        color: #6B7280; line-height: 1.6;
      }
      .contact-info-link {
        font-family: 'Inter', sans-serif; font-size: 0.8rem;
        color: #1FB6B9; line-height: 1.6; text-decoration: none;
        transition: opacity 0.2s;
      }
      .contact-info-link:hover { opacity: 0.75; }

      .contact-social-row {
        display: flex; gap: 12px; margin-top: 4px;
      }
      .contact-social-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 8px 16px; border-radius: 9999px;
        font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 600;
        text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
      }
      .contact-social-btn:hover { transform: translateY(-1px); }

      /* ── Interactive enhancements ── */
      .contact-btn-press:active { transform: scale(0.97) !important; }

      .contact-submit-glow {
        transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
      }
      .contact-submit-glow:hover {
        box-shadow: 0 6px 28px rgba(31,182,185,0.45);
      }

      .contact-wa-cta:hover .contact-wa-arrow {
        animation: contact-arrow-bounce 0.6s ease infinite;
      }
      @keyframes contact-arrow-bounce {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(5px); }
      }

      .contact-social-btn {
        transition: transform 0.25s, box-shadow 0.25s;
      }
      .contact-social-btn:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      }

      .contact-info-icon { transition: transform 0.3s, background 0.3s; }
      .contact-info-card:hover .contact-info-icon {
        transform: scale(1.1);
        background: #D1F5F5;
      }

      .contact-form-accent { position: relative; overflow: hidden; }
      .contact-form-accent::before {
        content: '';
        position: absolute; top: 0; left: 50%; transform: translateX(-50%);
        width: 60px; height: 3px; border-radius: 9999px;
        background: linear-gradient(90deg, #1FB6B9, #0E8C8F);
      }

      .contact-input {
        transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
      }
      .contact-input:focus {
        border-color: #1FB6B9;
        box-shadow: 0 0 0 3px rgba(31,182,185,0.12);
        transform: translateY(-1px);
      }

      @keyframes contact-anim-up {
        from { opacity: 0; transform: translateY(22px); }
        to { opacity: 1; transform: none; }
      }
    `}</style>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

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

      {/* ── 1. Hero compacto ── */}
      <header className="contact-hero">
        <img
          src="/Cita.jpeg"
          alt="Clinica dental Smile Factory"
          className="contact-hero-img"
          loading="eager"
        />
        <div className="contact-hero-bg" />
        <div className="contact-hero-content">
          <Link to="/" className="contact-back-link">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <h1 className="contact-hero-title">
            Agenda tu cita y transforma tu sonrisa
          </h1>
          <p className="contact-hero-sub">
            Estamos listos para atenderte. Da el primer paso
            hacia tu mejor sonrisa.
          </p>
          <a href="tel:+50322724043" className="contact-hero-phone">
            <Phone size={20} />
            2272-4043
          </a>
        </div>
      </header>

      {/* ── 2. Formulario + WhatsApp CTA ── */}
      <div className="contact-form-section" ref={formRef}>
        <div className="contact-form-card contact-form-accent fade-up">
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
                className="btn-primary contact-btn-press"
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
                    placeholder="7868-5669"
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
                className="btn-primary contact-btn-press contact-submit-glow justify-center w-full"
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
            </form>
          )}
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/50378685669?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20agendar%20una%20cita%20en%20Smile%20Factory."
          target="_blank"
          rel="noopener noreferrer"
          className="contact-wa-cta fade-up stagger-2"
        >
          <div className="contact-wa-icon">
            <MessageCircle size={24} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="contact-wa-title">
              Contacta por WhatsApp
            </div>
            <div className="contact-wa-sub">
              Metodo de contacto preferido y mas rapido. Escribenos al 7868-5669 y te atendemos de inmediato.
            </div>
          </div>
          <ArrowRight size={20} color="white" className="contact-wa-arrow" style={{ flexShrink: 0 }} />
        </a>
      </div>

      {/* ── 3. Info + Mapa ── */}
      <div className="contact-info-section" ref={infoRef}>
        {/* Map */}
        <div className="contact-map-wrap fade-left">
          <iframe
            title="Ubicacion Smile Factory"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2!2d-89.2534!3d13.7002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633067b0dfffff%3A0x0!2sCalle+Arturo+Ambrogi+137%2C+San+Salvador!5e0!3m2!1ses!2ssv!4v1700000000000"
            allowFullScreen=""
            loading="lazy"
          />
        </div>

        {/* Info cards */}
        <div className="contact-info-list">
          {/* Direccion */}
          <div className="contact-info-card fade-right stagger-1">
            <div className="contact-info-icon"><MapPin size={20} /></div>
            <div>
              <div className="contact-info-title">Direccion</div>
              <div className="contact-info-line">Final Paseo Escalon, Calle Arturo Ambrogi #137</div>
              <div className="contact-info-line">Escalon, San Salvador, El Salvador</div>
            </div>
          </div>

          {/* Horarios */}
          <div className="contact-info-card fade-right stagger-2">
            <div className="contact-info-icon"><Clock size={20} /></div>
            <div>
              <div className="contact-info-title">Horarios</div>
              <div className="contact-info-line">Lunes a Viernes: 8:00 a.m. - 5:00 p.m.</div>
              <div className="contact-info-line">Sabado: 8:00 a.m. - 2:00 p.m.</div>
            </div>
          </div>

          {/* Telefonos */}
          <div className="contact-info-card fade-right stagger-3">
            <div className="contact-info-icon"><Phone size={20} /></div>
            <div>
              <div className="contact-info-title">Telefonos</div>
              <a href="tel:+50322724043" className="contact-info-link" style={{ display: 'block' }}>
                Oficina: 2272-4043
              </a>
              <a href="https://wa.me/50378685669" target="_blank" rel="noopener noreferrer" className="contact-info-link" style={{ display: 'block' }}>
                WhatsApp: 7868-5669
              </a>
            </div>
          </div>

          {/* Correo */}
          <div className="contact-info-card fade-right stagger-4">
            <div className="contact-info-icon"><Mail size={20} /></div>
            <div>
              <div className="contact-info-title">Correo</div>
              <a href="mailto:smilefactorysv@gmail.com" className="contact-info-link">
                smilefactorysv@gmail.com
              </a>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="contact-info-card fade-right stagger-5">
            <div className="contact-info-icon"><Instagram size={20} /></div>
            <div>
              <div className="contact-info-title">Redes sociales</div>
              <div className="contact-social-row">
                <a
                  href="https://instagram.com/smilefactorysv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  style={{ background: '#FCE4EC', color: '#E1306C' }}
                >
                  <Instagram size={14} />
                  @smilefactorysv
                </a>
                <a
                  href="https://www.facebook.com/SmileFactorySv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  style={{ background: '#E3F2FD', color: '#1877F2' }}
                >
                  <Facebook size={14} />
                  Facebook
                </a>
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
