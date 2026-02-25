import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSingleScrollAnimation } from '../hooks/useScrollAnimation';

export default function CtaBanner() {
  const ref = useSingleScrollAnimation();

  return (
    <section
      ref={ref}
      className="fade-up"
      style={{ padding: '0 0' }}
    >
      <style>{`
        @keyframes cta-float-1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-22px) scale(1.05); }
        }
        @keyframes cta-float-2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(16px) scale(0.96); }
        }
        @keyframes cta-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(12px, -14px) rotate(3deg); }
        }
        @keyframes cta-pulse-ring {
          0% { transform: scale(1); opacity: 0.12; }
          50% { transform: scale(1.12); opacity: 0.04; }
          100% { transform: scale(1); opacity: 0.12; }
        }
        @keyframes cta-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cta-dot-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.8); }
        }
        @keyframes cta-line-grow {
          0% { width: 0; opacity: 0; }
          100% { width: 60px; opacity: 1; }
        }
        @keyframes cta-text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(168,230,231,0.3); }
          50% { text-shadow: 0 0 35px rgba(168,230,231,0.6), 0 0 60px rgba(31,182,185,0.2); }
        }
        @keyframes cta-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cta-banner-bg {
          background: linear-gradient(135deg, #0a7c7f 0%, #0E8C8F 25%, #1FB6B9 50%, #17a3a6 75%, #0E8C8F 100%);
          background-size: 200% 200%;
          animation: cta-gradient-shift 12s ease-in-out infinite;
        }
        .cta-btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .cta-btn-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255,255,255,0.3) 50%,
            transparent 65%
          );
          background-size: 200% 100%;
          animation: cta-shimmer 2.5s ease-in-out infinite;
          border-radius: inherit;
          pointer-events: none;
        }
        .cta-dot-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .cta-title-line {
          display: inline-block;
          width: 60px;
          height: 3px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.5);
          animation: cta-line-grow 1s cubic-bezier(.22,1,.36,1) 0.3s both;
        }
        .cta-highlight {
          color: #A8E6E7;
          animation: cta-text-glow 4s ease-in-out infinite;
        }
        .cta-highlight-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #A8E6E7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="container-custom">
        <div
          className="cta-banner-bg relative overflow-hidden flex items-center justify-center"
          style={{
            borderRadius: '1.5rem',
            padding: 'clamp(4.5rem, 8vw, 7rem) clamp(2rem, 5vw, 4rem)',
            boxShadow: '0 12px 40px rgba(14,140,143,0.25)',
          }}
        >
          {/* ── Dot pattern overlay ── */}
          <div className="cta-dot-pattern" />

          {/* ── Animated background elements ── */}

          {/* Large floating glow top-right */}
          <div
            className="absolute"
            style={{
              width: '480px',
              height: '480px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 55%)',
              top: '-200px',
              right: '-120px',
              animation: 'cta-float-1 8s ease-in-out infinite',
            }}
          />

          {/* Medium floating glow bottom-left */}
          <div
            className="absolute"
            style={{
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 55%)',
              bottom: '-160px',
              left: '-80px',
              animation: 'cta-float-2 10s ease-in-out infinite',
            }}
          />

          {/* Small floating accent center-right */}
          <div
            className="absolute"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)',
              top: '15%',
              right: '20%',
              animation: 'cta-float-3 7s ease-in-out infinite',
            }}
          />

          {/* Small floating accent left */}
          <div
            className="absolute"
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
              bottom: '10%',
              left: '15%',
              animation: 'cta-float-1 9s ease-in-out infinite 3s',
            }}
          />

          {/* Pulsing ring right */}
          <div
            className="absolute"
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.12)',
              top: '-60px',
              right: '2%',
              animation: 'cta-pulse-ring 6s ease-in-out infinite',
            }}
          />

          {/* Pulsing ring left */}
          <div
            className="absolute"
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              bottom: '-70px',
              left: '8%',
              animation: 'cta-pulse-ring 8s ease-in-out infinite 2s',
            }}
          />

          {/* Pulsing ring center */}
          <div
            className="absolute"
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.06)',
              top: '50%',
              left: '50%',
              marginTop: '-80px',
              marginLeft: '-80px',
              animation: 'cta-pulse-ring 7s ease-in-out infinite 1s',
            }}
          />

          {/* Animated dots */}
          <div className="absolute" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', top: '18%', right: '12%', animation: 'cta-dot-pulse 3.5s ease-in-out infinite' }} />
          <div className="absolute" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', bottom: '22%', left: '18%', animation: 'cta-dot-pulse 4.5s ease-in-out infinite 0.8s' }} />
          <div className="absolute" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', top: '60%', right: '28%', animation: 'cta-dot-pulse 4s ease-in-out infinite 1.5s' }} />
          <div className="absolute" style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', top: '30%', left: '30%', animation: 'cta-dot-pulse 5s ease-in-out infinite 2s' }} />
          <div className="absolute" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', bottom: '35%', right: '40%', animation: 'cta-dot-pulse 3.8s ease-in-out infinite 0.3s' }} />
          <div className="absolute" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.22)', top: '45%', left: '8%', animation: 'cta-dot-pulse 4.2s ease-in-out infinite 1.2s' }} />

          {/* ── Content ── */}
          <div className="relative z-10 text-center flex flex-col items-center">

            {/* Decorative line above title */}
            <span className="cta-title-line mb-6" />

            {/* Title */}
            <h2
              className="text-white font-bold"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.7rem, 3.8vw, 2.8rem)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Tu <span className="cta-highlight">sonrisa perfecta</span> está<br />
              <span className="cta-highlight-gradient">a una cita de distancia</span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                lineHeight: 1.7,
                maxWidth: '420px',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '2.5rem',
              }}
            >
              Agenda tu <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>consulta sin costo</span> y
              da el primer paso.
            </p>

            {/* CTA button with shimmer */}
            <Link
              to="/contacto"
              className="cta-btn-shimmer inline-flex items-center gap-2.5 font-semibold transition-all hover:scale-105"
              style={{
                background: 'white',
                color: '#0E8C8F',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.95rem',
                padding: '1rem 2.8rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              }}
            >
              Agendar mi cita
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
