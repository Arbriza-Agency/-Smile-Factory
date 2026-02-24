import { Linkedin, Award, GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TEAM = [
  {
    name:       'Dra. Sofía Ramírez',
    title:      'Directora Clínica · Ortodoncista',
    specialties: ['Ortodoncia', 'Ortopedia maxilar', 'Invisalign Certified'],
    bio:        'Especialista en ortodoncia con más de 12 años de experiencia. Formada en la UNAM y con posgrado en la Universidad de Barcelona.',
    avatar:     'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=85&auto=format&fit=crop&crop=face',
    education:  'Universidad de Barcelona · UNAM',
    linkedin:   '#',
    badge:      '🏆 Ortodoncista del Año 2023',
  },
  {
    name:       'Dr. Andrés López',
    title:      'Cirujano Oral · Implantólogo',
    specialties: ['Implantes dentales', 'Cirugía oral', 'Endodoncia'],
    bio:        'Especialista en cirugía oral e implantología con formación en la UAM y estudios de posgrado en Italia.',
    avatar:     'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=85&auto=format&fit=crop&crop=face',
    education:  'UAM · Università di Milano',
    linkedin:   '#',
    badge:      '🔬 +500 implantes colocados',
  },
  {
    name:       'Dra. Claudia Torres',
    title:      'Odontología Estética',
    specialties: ['Carillas de porcelana', 'Blanqueamiento', 'Diseño de sonrisa'],
    bio:        'Pionera en diseño digital de sonrisa en México. Experta en rehabilitación estética con tecnología CAD/CAM.',
    avatar:     'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=85&auto=format&fit=crop&crop=face',
    education:  'UNAM · Laser Institute Miami',
    linkedin:   '#',
    badge:      '✨ Smile Design Expert',
  },
  {
    name:       'Dr. Miguel Herrera',
    title:      'Odontopediatra',
    specialties: ['Odontopediatría', 'Ortopedia infantil', 'Selladores'],
    bio:        'Especialista en el cuidado dental infantil con un enfoque lúdico y sin miedo al dentista. 8 años dedicados a los pequeños.',
    avatar:     'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=85&auto=format&fit=crop&crop=face',
    education:  'IPN · UNAM Pediatría',
    linkedin:   '#',
    badge:      '👨‍⚕️ Especialista en niños',
  },
];

function DoctorCard({ doctor, delay }) {
  return (
    <div className={`fade-up stagger-${delay} card overflow-hidden group`} style={{ borderRadius: '1.25rem' }}>
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          style={{ background: 'linear-gradient(to top, rgba(14,140,143,0.85), transparent)' }}
        >
          <a
            href={doctor.linkedin}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center"
            style={{ color: '#1FB6B9' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={16} />
          </a>
        </div>
        {/* Badge */}
        <div
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.92)',
            color: '#1E1E1E',
            fontFamily: 'Inter, sans-serif',
            backdropFilter: 'blur(8px)',
          }}
        >
          {doctor.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-bold text-base mb-0.5"
          style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1E1E' }}
        >
          {doctor.name}
        </h3>
        <p
          className="text-xs font-medium mb-3"
          style={{ fontFamily: 'Poppins, sans-serif', color: '#1FB6B9' }}
        >
          {doctor.title}
        </p>
        <p
          className="text-xs text-gray-500 leading-relaxed mb-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {doctor.bio}
        </p>

        {/* Education */}
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
          <span className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            {doctor.education}
          </span>
        </div>

        {/* Specialty tags */}
        <div className="flex flex-wrap gap-1.5">
          {doctor.specialties.map((s, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-full"
              style={{
                background: '#E8F9F9',
                color: '#0E8C8F',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  const ref = useScrollAnimation();

  return (
    <section id="doctores" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <span className="section-badge">Nuestro equipo</span>
          <h2 className="section-title mx-auto">
            Especialistas que{' '}
            <span style={{ color: '#1FB6B9' }}>confiarías con tu sonrisa</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Un equipo multidisciplinario de expertos altamente certificados,
            siempre actualizados con las últimas técnicas y tecnologías.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((doctor, i) => (
            <DoctorCard key={i} doctor={doctor} delay={Math.min(i + 1, 4)} />
          ))}
        </div>

        {/* Certifications strip */}
        <div
          className="fade-up mt-14 p-6 rounded-2xl flex flex-wrap items-center justify-center gap-6 md:gap-12"
          style={{ background: '#F5F7F8' }}
        >
          {[
            { icon: <Award size={20} />, label: 'Colegio de Cirujanos Dentistas de México' },
            { icon: <GraduationCap size={20} />, label: 'Invisalign Certified Providers' },
            { icon: <Award size={20} />, label: 'Asociación Dental Mexicana' },
            { icon: <Award size={20} />, label: 'WFO – World Federation of Orthodontists' },
          ].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-2">
              <span style={{ color: '#1FB6B9' }}>{icon}</span>
              <span
                className="text-xs font-medium text-gray-500"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
