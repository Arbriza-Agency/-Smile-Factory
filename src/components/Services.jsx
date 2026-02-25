import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const ORTHODONTICS = [
  {
    emoji: '🦷',
    title: 'Brackets Metálicos',
    desc: 'La solución clásica y más económica. Alta efectividad para todo tipo de mal oclusiones.',
    features: ['Acero inoxidable de alta calidad', 'Ajustes periódicos precisos', 'Ideal para casos complejos'],
    popular: false,
  },
  {
    emoji: '✨',
    title: 'Brackets Estéticos',
    desc: 'Brackets de cerámica o zafiro casi invisibles. Discreción sin comprometer resultados.',
    features: ['Color diente o translúcidos', 'Alta resistencia', 'Estética superior'],
    popular: true,
  },
  {
    emoji: '💎',
    title: 'Invisalign®',
    desc: 'Alineadores transparentes removibles. Corrige tu sonrisa sin que nadie lo note.',
    features: ['Alineadores 100% transparentes', 'Removibles para comer y limpiar', 'Planificación digital 3D'],
    popular: false,
  },
  {
    emoji: '🔮',
    title: 'Ortodoncia Lingual',
    desc: 'Brackets colocados en la cara interna de los dientes. Completamente invisibles por fuera.',
    features: ['Totalmente ocultos al hablar', 'Resultados iguales a los tradicionales', 'Para el mayor nivel de discreción'],
    popular: false,
  },
  {
    emoji: '⚡',
    title: 'Retenedores',
    desc: 'Mantenimiento post-tratamiento para conservar tu sonrisa perfecta a largo plazo.',
    features: ['Fijos y removibles', 'Control de seguimiento incluido', 'Material duradero y confortable'],
    popular: false,
  },
  {
    emoji: '🌟',
    title: 'Ortopedia Maxilar',
    desc: 'Corrección del desarrollo óseo facial en niños y adolescentes.',
    features: ['Aparatos funcionales', 'Expansores palatinos', 'Tratamiento preventivo'],
    popular: false,
  },
];

const GENERAL = [
  {
    emoji: '🪥',
    title: 'Limpieza Dental',
    desc: 'Profilaxis profesional para eliminar sarro y manchas. La base de una buena salud oral.',
    features: ['Ultrasonido y pulido', 'Revisión completa incluida', 'Recomendada cada 6 meses'],
    popular: true,
  },
  {
    emoji: '🔆',
    title: 'Blanqueamiento',
    desc: 'Recupera el blanco natural de tus dientes con tecnología LED de última generación.',
    features: ['Resultado en 1 sesión', 'Hasta 8 tonos más claro', 'Tratamiento personalizado'],
    popular: false,
  },
  {
    emoji: '🛡️',
    title: 'Resinas y Restauraciones',
    desc: 'Reconstrucción de dientes dañados con materiales del color del diente.',
    features: ['Materiales de alta resistencia', 'Resultado natural e invisible', 'En una sola cita'],
    popular: false,
  },
  {
    emoji: '👑',
    title: 'Coronas y Carillas',
    desc: 'Rehabilitación estética y funcional con porcelana de alta resistencia.',
    features: ['Porcelana libre de metal', 'Diseño digital de sonrisa', 'Durabilidad garantizada'],
    popular: false,
  },
  {
    emoji: '🔩',
    title: 'Implantes Dentales',
    desc: 'La solución definitiva para dientes perdidos. Raíces artificiales de titanio.',
    features: ['Titanio biocompatible', 'Se siente como tu diente natural', 'De por vida con buen cuidado'],
    popular: false,
  },
  {
    emoji: '🩺',
    title: 'Endodoncia',
    desc: 'Tratamiento de conductos sin dolor para salvar tu diente natural.',
    features: ['Técnicas rotatorias modernas', 'Anestesia avanzada', 'Mínimas molestias'],
    popular: false,
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */
function ServiceCard({ emoji, title, desc, features, popular, delay, onContact }) {
  return (
    <div
      className={`fade-up stagger-${delay} card relative p-6 flex flex-col gap-3`}
      style={{ borderRadius: '1.25rem' }}
    >
      {popular && (
        <span
          className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
          style={{
            background: 'linear-gradient(135deg,#1FB6B9,#0E8C8F)',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Popular
        </span>
      )}
      <div className="text-3xl">{emoji}</div>
      <h3
        className="font-bold text-lg"
        style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        {desc}
      </p>
      <ul className="flex flex-col gap-1.5 mt-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            <CheckCircle size={13} style={{ color: '#1FB6B9', flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>
      <button
        className="mt-auto flex items-center gap-1.5 text-sm font-semibold pt-2 transition-all group"
        style={{ color: '#1FB6B9', fontFamily: 'Poppins, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        onClick={onContact}
      >
        Saber más
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function Services() {
  const [activeTab, setActiveTab] = useState('ortodoncia');
  const ref = useScrollAnimation();
  const navigate = useNavigate();

  const goContact = () => navigate('/contacto');

  const currentServices = activeTab === 'ortodoncia' ? ORTHODONTICS : GENERAL;

  return (
    <section id="servicios" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-12 fade-up">
          <span className="section-badge">Nuestros Servicios</span>
          <h2 className="section-title mx-auto">
            Soluciones para{' '}
            <span style={{ color: '#1FB6B9' }}>cada sonrisa</span>
          </h2>
          <p className="section-subtitle mx-auto text-center" style={{ maxWidth: '560px', margin: '0 auto' }}>
            Ofrecemos tratamientos personalizados de ortodoncia y odontología general
            adaptados a tus metas y estilo de vida.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 fade-up stagger-2">
          <div
            className="inline-flex p-1 rounded-2xl gap-1"
            style={{ background: '#F5F7F8' }}
          >
            {[
              { key: 'ortodoncia', label: '🦷 Ortodoncia' },
              { key: 'general',   label: '🩺 Odontología General' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  background: activeTab === key
                    ? 'linear-gradient(135deg,#1FB6B9,#0E8C8F)'
                    : 'transparent',
                  color: activeTab === key ? 'white' : '#6B7280',
                  boxShadow: activeTab === key
                    ? '0 4px 16px rgba(31,182,185,0.35)'
                    : 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((service, i) => (
            <ServiceCard
              key={`${activeTab}-${i}`}
              {...service}
              delay={Math.min(i + 1, 6)}
              onContact={goContact}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 fade-up">
          <p className="text-gray-500 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            ¿Tienes dudas sobre cuál tratamiento es el adecuado para ti?
          </p>
          <button
            className="btn-primary"
            onClick={goContact}
          >
            <CheckCircle size={18} />
            Agenda una consulta gratuita
          </button>
        </div>

      </div>
    </section>
  );
}
