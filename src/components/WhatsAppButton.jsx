import { useState } from 'react';

const WA_NUMBER = '50378685669';
const WA_MESSAGE = encodeURIComponent(
  '¡Hola! Me gustaría agendar una cita en Smile Factory. ¿Podrían ayudarme?'
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .wa-widget {
          position: fixed;
          bottom: 5.5rem;
          right: 1.75rem;
          z-index: 998;
          width: 340px;
          max-width: calc(100vw - 2rem);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(37,211,102,0.2);
          transform-origin: bottom right;
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .wa-widget.closed {
          opacity: 0;
          transform: scale(0.85) translateY(12px);
          pointer-events: none;
        }
        .wa-widget.open {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .wa-widget-header {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          padding: 20px 20px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .wa-widget-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wa-widget-name {
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
        }
        .wa-widget-status {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .wa-widget-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #90EE90;
        }
        .wa-widget-body {
          background: #E5DDD5;
          padding: 24px 16px;
          min-height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc6' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .wa-widget-bubble {
          background: white;
          border-radius: 0 12px 12px 12px;
          padding: 12px 16px;
          max-width: 260px;
          position: relative;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        .wa-widget-bubble::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid white;
        }
        .wa-widget-bubble-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: #1E1E1E;
          line-height: 1.55;
        }
        .wa-widget-bubble-time {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: #9CA3AF;
          text-align: right;
          margin-top: 4px;
        }
        .wa-widget-footer {
          background: white;
          padding: 14px 16px;
        }
        .wa-widget-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: #25D366;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .wa-widget-btn:hover {
          background: #1dad52;
          transform: scale(1.02);
        }
        .wa-fab {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(37,211,102,0.45);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .wa-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 32px rgba(37,211,102,0.55);
        }
      `}</style>

      {/* Chat widget */}
      <div className={`wa-widget ${open ? 'open' : 'closed'}`}>
        <div className="wa-widget-header">
          <div className="wa-widget-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 24, height: 24 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <div className="wa-widget-name">Smile Factory</div>
            <div className="wa-widget-status">
              <span className="wa-widget-dot" />
              En linea
            </div>
          </div>
        </div>

        <div className="wa-widget-body">
          <div className="wa-widget-bubble">
            <div className="wa-widget-bubble-text">
              Hola! 👋 Listo para agendar tu cita? Escribenos y te atendemos de inmediato.
            </div>
            <div className="wa-widget-bubble-time">Ahora</div>
          </div>
        </div>

        <div className="wa-widget-footer">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-widget-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Iniciar conversacion
          </a>
        </div>
      </div>

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="wa-fab"
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 26, height: 26 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </button>
    </>
  );
}
