/**
 * Datos compartidos de los doctores de Smile Factory.
 * Se usan tanto en el DoctorPreview (landing) como en AboutPage.
 */

const DOCTORS = [
  {
    id: 'dra-lisselot-mixco',
    name: 'Dra. Lisselot Mixco de Brito',
    role: 'Ortodoncista Certificada',
    specialty: 'Ortodoncia',
    shortBio:
      'Ortodoncista certificada con más de 10 años de experiencia transformando sonrisas. Experta en tratamientos con Invisalign y ortodoncia correctiva de alta precisión.',
    fullBio:
      'La Dra. Lisselot Mixco de Brito es una ortodoncista certificada con más de una década de experiencia dedicada a transformar sonrisas. Su enfoque combina técnicas clásicas de ortodoncia con las últimas innovaciones en alineación dental, ofreciendo a cada paciente un plan de tratamiento personalizado y resultados excepcionales. Reconocida por su atención al detalle y su trato cálido, la Dra. Mixco se ha convertido en una referencia en el campo de la ortodoncia.',
    credentials: [
      'Ortodoncista certificada',
      'Miembro de la Asociación Salvadoreña de Ortodoncia',
      'Certificada oficialmente por Invisalign — Invisalign Doctor',
      'Más de 10 años de experiencia clínica',
    ],
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=85&auto=format&fit=crop&crop=face',
    stampText: 'Certificada · Invisalign · ASO · +10 años · ',
    stampIcon: '★',
    badge: 'Invisalign Certified',
  },
  {
    id: 'dr-jose-mixco',
    name: 'Dr. José Mauricio Mixco',
    role: 'Odontólogo General',
    specialty: 'Odontología General',
    shortBio:
      'Odontólogo general comprometido con la salud bucal integral. Especialista en tratamientos restaurativos, preventivos y estéticos con un enfoque humano y profesional.',
    fullBio:
      'El Dr. José Mauricio Mixco es un odontólogo general con amplia experiencia en el cuidado integral de la salud bucal. Su práctica abarca desde tratamientos preventivos y restaurativos hasta procedimientos estéticos, siempre con un enfoque en la comodidad del paciente y resultados duraderos. Su dedicación a la educación continua le permite ofrecer las técnicas más actualizadas en odontología moderna.',
    credentials: [
      'Odontólogo general titulado',
      'Especialista en restauraciones dentales',
      'Experiencia en odontología preventiva y estética',
      'Formación continua en nuevas técnicas y tecnologías',
    ],
    avatar:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85&auto=format&fit=crop&crop=face',
    stampText: 'Odontología · Restaurativa · Estética · ',
    stampIcon: '◆',
    badge: 'Odontólogo General',
  },
];

export default DOCTORS;
