import { useState, useRef, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/* ─── Gallery Data ──────────────────────────────────────────────────────── */
const CASES = [
  {
    id: 1,
    treatment: 'Ortodoncia con brackets',
    duration: '18 meses',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80&auto=format&fit=crop&sat=-100',
    after:  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80&auto=format&fit=crop',
    desc: 'Corrección de apiñamiento severo y mordida cruzada.',
  },
  {
    id: 2,
    treatment: 'Invisalign®',
    duration: '12 meses',
    before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80&auto=format&fit=crop&sat=-100',
    after:  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80&auto=format&fit=crop',
    desc: 'Cierre de espacios y corrección de mordida abierta.',
  },
  {
    id: 3,
    treatment: 'Blanqueamiento + Carillas',
    duration: '3 sesiones',
    before: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80&auto=format&fit=crop&sat=-100',
    after:  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80&auto=format&fit=crop',
    desc: 'Rehabilitación estética completa con carillas de porcelana.',
  },
  {
    id: 4,
    treatment: 'Brackets Estéticos',
    duration: '20 meses',
    before: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop&sat=-80',
    after:  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
    desc: 'Corrección de protrusion y espacios entre los dientes.',
  },
  {
    id: 5,
    treatment: 'Implantes Dentales',
    duration: '4 meses',
    before: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&auto=format&fit=crop&sat=-100',
    after:  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&auto=format&fit=crop',
    desc: 'Reemplazo de piezas faltantes con implantes de titanio.',
  },
  {
    id: 6,
    treatment: 'Diseño de Sonrisa',
    duration: '2 semanas',
    before: 'https://images.unsplash.com/photo-1551069613-1904dbdcda11?w=600&q=80&auto=format&fit=crop&sat=-100',
    after:  'https://images.unsplash.com/photo-1551069613-1904dbdcda11?w=600&q=80&auto=format&fit=crop',
    desc: 'Transformación completa con diseño digital de sonrisa.',
  },
];

/* ─── Before-After Card with hover slider ─────────────────────────────── */
function BACard({ caseItem, onZoom }) {
  const [sliderX, setSliderX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  }, []);

  const onMouseMove  = (e) => { if (dragging) updateSlider(e.clientX); };
  const onMouseDown  = (e) => { setDragging(true); updateSlider(e.clientX); };
  const onMouseUp    = ()  => setDragging(false);
  const onTouchMove  = (e) => updateSlider(e.touches[0].clientX);

  return (
    <div className="card overflow-hidden" style={{ borderRadius: '1.25rem' }}>
      {/* Image comparison */}
      <div
        ref={containerRef}
        className="relative select-none"
        style={{ height: '240px', cursor: dragging ? 'ew-resize' : 'col-resize' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
      >
        {/* After (base layer) */}
        <img
          src={caseItem.after}
          alt={`Después - ${caseItem.treatment}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Before (clip layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
        >
          <img
            src={caseItem.before}
            alt={`Antes - ${caseItem.treatment}`}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.4) brightness(0.9)' }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{ left: `${sliderX}%`, background: 'white', boxShadow: '0 0 8px rgba(0,0,0,0.4)', zIndex: 2 }}
        />
        {/* Drag handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xl"
          style={{ left: `${sliderX}%`, zIndex: 3 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 9H1m0 0l3-3M1 9l3 3M13 9h4m0 0l-3-3m3 3l-3 3" stroke="#1FB6B9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Labels */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'white', fontFamily: 'Poppins, sans-serif', zIndex: 2 }}
        >
          Antes
        </span>
        <span
          className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: 'rgba(31,182,185,0.85)', color: 'white', fontFamily: 'Poppins, sans-serif', zIndex: 2 }}
        >
          Después
        </span>

        {/* Zoom button */}
        <button
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
          style={{ zIndex: 3 }}
          onClick={(e) => { e.stopPropagation(); onZoom(caseItem); }}
        >
          <ZoomIn size={14} style={{ color: '#1E1E1E' }} />
        </button>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}>
            {caseItem.treatment}
          </h3>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-medium"
            style={{ background: '#E8F9F9', color: '#0E8C8F', fontFamily: 'Inter, sans-serif' }}
          >
            {caseItem.duration}
          </span>
        </div>
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
          {caseItem.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function BeforeAfter() {
  const ref = useScrollAnimation();
  const [page, setPage]         = useState(0);
  const [zoomed, setZoomed]     = useState(null);
  const perPage                 = 3;
  const totalPages              = Math.ceil(CASES.length / perPage);
  const visible                 = CASES.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="galeria" className="section-padding" style={{ background: '#F5F7F8' }} ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="fade-left">
            <span className="section-badge">Galería</span>
            <h2 className="section-title">
              Resultados que{' '}
              <span style={{ color: '#1FB6B9' }}>hablan por sí solos</span>
            </h2>
            <p className="section-subtitle">
              Arrastra el divisor para comparar cada transformación real.
            </p>
          </div>
          {/* Pagination arrows */}
          <div className="fade-right flex items-center gap-3">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: page === 0 ? '#E5E7EB' : 'linear-gradient(135deg,#1FB6B9,#0E8C8F)',
                color: page === 0 ? '#9CA3AF' : 'white',
                border: 'none', cursor: page === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: page === totalPages - 1 ? '#E5E7EB' : 'linear-gradient(135deg,#1FB6B9,#0E8C8F)',
                color: page === totalPages - 1 ? '#9CA3AF' : 'white',
                border: 'none', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((c, i) => (
            <div key={c.id} className={`fade-up stagger-${i + 1}`}>
              <BACard caseItem={c} onZoom={setZoomed} />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {zoomed && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setZoomed(null)}
          >
            <div
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-2">
                <div>
                  <img src={zoomed.before} alt="Antes" className="w-full h-64 object-cover" />
                  <div className="text-center py-2 text-sm font-semibold" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>Antes</div>
                </div>
                <div>
                  <img src={zoomed.after} alt="Después" className="w-full h-64 object-cover" />
                  <div className="text-center py-2 text-sm font-semibold" style={{ color: '#1FB6B9', fontFamily: 'Poppins, sans-serif' }}>Después</div>
                </div>
              </div>
              <div className="p-5 border-t">
                <h3 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{zoomed.treatment}</h3>
                <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{zoomed.desc}</p>
                <button className="mt-3 text-xs text-gray-400" onClick={() => setZoomed(null)}>✕ Cerrar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
