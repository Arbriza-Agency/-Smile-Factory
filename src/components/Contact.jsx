import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CONTACT_INFO = [
  {
    icon: <MapPin size={20} />,
    title: 'Dirección',
    lines: ['Av. Insurgentes Sur 1234, Piso 3', 'Col. Del Valle, CDMX, CP 03100'],
  },
  {
    icon: <Phone size={20} />,
    title: 'Teléfono',
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
    lines: ['Lun – Vie: 9:00 – 20:00', 'Sáb: 9:00 – 14:00'],
  },
];

const SERVICES_OPTIONS = [
  'Ortodoncia – Brackets',
  'Invisalign®',
  'Blanqueamiento dental',
  'Limpieza profesional',
  'Implantes dentales',
  'Carillas de porcelana',
  'Primera consulta / Diagnóstico',
  'Otro',
];

export default function Contact() {
  const ref = useScrollAnimation();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none
    focus:border-[#1FB6B9] focus:ring-2 focus:ring-[#1FB6B9]/20
  `;
  const inputStyle = {
    fontFamily: 'Inter, sans-serif',
    borderColor: '#E5E7EB',
    color: '#1E1E1E',
    background: '#FAFAFA',
  };

  return (
    <section id="contacto" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span className="section-badge">Contáctanos</span>
          <h2 className="section-title mx-auto">
            ¿Listo para tu{' '}
            <span style={{ color: '#1FB6B9' }}>nueva sonrisa?</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Agenda tu consulta de diagnóstico sin costo. Nuestro equipo te
            contactará en menos de 2 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left – Form ── */}
          <div className="fade-left">
            <div className="card p-8" style={{ borderRadius: '1.5rem' }}>
              {sent ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: '#E8F9F9' }}
                  >
                    <CheckCircle size={32} style={{ color: '#1FB6B9' }} />
                  </div>
                  <h3 className="font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}>
                    ¡Mensaje recibido!
                  </h3>
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Gracias por contactarnos. Un miembro del equipo se comunicará
                    contigo muy pronto para confirmar tu cita.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', service:'', message:'' }); }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}
                  >
                    Agenda tu cita
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Nombre completo *
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="María García"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Teléfono *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="55 1234-5678"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Correo electrónico *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="maria@ejemplo.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Servicio de interés
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="">Selecciona un servicio...</option>
                      {SERVICES_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Mensaje (opcional)
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Cuéntanos sobre tu caso o cualquier duda que tengas..."
                      value={form.message}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary justify-center w-full"
                    style={{ opacity: loading ? 0.8 : 1 }}
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

                  <p className="text-xs text-gray-400 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Primera consulta de diagnóstico sin costo · Respuesta en &lt;2h
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ── Right – Map + info ── */}
          <div className="fade-right flex flex-col gap-6">

            {/* Map embed */}
            <div
              className="overflow-hidden rounded-2xl shadow-lg"
              style={{ height: '280px', position: 'relative' }}
            >
              <iframe
                title="Ubicación Smile Factory"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.078!2d-99.1677!3d19.3909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3a1234%3A0x5678!2sAv.+Insurgentes+Sur%2C+Ciudad+de+M%C3%A9xico!5e0!3m2!1ses!2smx!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'saturate(0.8)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            {/* Contact info grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_INFO.map(({ icon, title, lines }, i) => (
                <div
                  key={i}
                  className="card p-5 flex items-start gap-3"
                  style={{ borderRadius: '1rem' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: '#E8F9F9', color: '#1FB6B9' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      className="font-semibold text-xs mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}
                    >
                      {title}
                    </div>
                    {lines.map((l, j) => (
                      <div key={j} className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency notice */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-xl"
              style={{ background: '#E8F9F9', border: '1px solid #A8E6E7' }}
            >
              <span className="text-2xl">🚨</span>
              <div>
                <div className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#0E8C8F' }}>
                  Urgencias dentales
                </div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Atención de emergencias mismo día. Llama ahora al 55 1234-5678.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
