/**
 * Datos centrales del sitio. Edita aquí teléfonos, centros y textos de contacto;
 * todos los componentes leen de este archivo.
 */

/** Convierte "+1 (849) 629-1603" → "18496291603" (formato wa.me / tel:). */
export const digitsOnly = (phone: string) => phone.replace(/\D/g, "");

export const BOOKING_MESSAGE =
  "Hola, me gustaría agendar una cita con el psicoterapeuta Julio Cesar Sánchez.";

export const whatsappUrl = (phone: string, message = BOOKING_MESSAGE) =>
  `https://wa.me/${digitsOnly(phone)}?text=${encodeURIComponent(message)}`;

export const telUrl = (phone: string) => `tel:+${digitsOnly(phone)}`;

/** Formato E.164 para datos estructurados: "+1 (809) 769-1361" → "+18097691361". */
export const e164 = (phone: string) => `+${digitsOnly(phone)}`;

export const site = {
  name: "Julio Cesar Sánchez Medina",
  shortName: "Julio Cesar Sánchez",
  /** Variantes del nombre usadas en otros perfiles (p. ej. Medium) — ayudan a Google a unir la identidad */
  alternateNames: ["Julio Cesar Sánchez", "Julio Sánchez", "Julio Sánchez Medina", "Julio Sanchez Medina"],
  role: "Psicólogo clínico",
  /** Cómo se presenta Julio (y cómo lo buscan): se usan en textos y datos estructurados */
  roles: ["Psicólogo clínico", "Psicoterapeuta", "Terapeuta de pareja", "Terapeuta familiar", "Terapeuta sexual", "Sexólogo"],
  title: "Psicólogo y Psicoterapeuta en Santo Domingo · Julio Sánchez",
  description:
    "Psicólogo clínico y psicoterapeuta en Santo Domingo. Terapia individual, de pareja, sexual y familiar con enfoque sistémico breve. Agenda por WhatsApp.",
  locale: "es_DO",
  social: {
    mediumUser: "medina.juliocesar16",
    medium: "https://medium.com/@medina.juliocesar16",
    whatsappChannel: "https://whatsapp.com/channel/0029VbCWN3L89inroLqmzc1C",
    linkedin: "https://www.linkedin.com/in/psi-julioc-sanchez-medina/",
  },
  contact: {
    email: "psi.juliosanchez@gmail.com",
    phone: "+1 (809) 769-1361",
  },
} as const;

export type BookingCenter = {
  /** Nombre visible del centro / canal de citas */
  name?: string;
  /** Línea secundaria opcional (p. ej. el centro al que pertenece) */
  label?: string;
  phone: string;
  /** Muestra el botón "Llamar ahora" (por defecto true). Pon false si el número solo atiende por WhatsApp. */
  allowCalls?: boolean;
};

/** Centros donde se puede agendar cita (botón "Agenda tu cita"). */
export const bookingCenters: BookingCenter[] = [
  { name: "Psicobienestar Centro Terapéutico", phone: "+1 (849) 629-1603", allowCalls: false },
  { name: "Centro Integral Lotus", label: "Centro Integral Lotus", phone: "+1 (809) 851-1386" },
  { name: "Mentalmente", label: "Mentalmente", phone: "+1 (829) 783-8519", allowCalls: false },
];

/**
 * Formación y credenciales, confirmadas por Julio (nov. 2026). Se muestran en "Sobre mí"
 * y en los datos estructurados.
 */
export const credentials = {
  exequatur: "13016",
  codopsi: "20-15839",
  /** Psicoterapeuta familiar y de pareja desde diciembre de 2020 (sin experiencia clínica previa) */
  practiceSince: 2020,
  approach: "Sistémico breve, orientado a la construcción de soluciones",
  education: [
    { kind: "degree", title: "Psicólogo clínico", institution: "Universidad Católica de Santo Domingo", short: "UCSD", year: 2019 },
    { kind: "degree", title: "Maestría en Terapia Familiar y de Pareja", institution: "Universidad Católica de Santo Domingo", short: "UCSD" },
    { kind: "degree", title: "Maestría en Psicología de la Salud", institution: "Universidad Europea del Atlántico" },
    { kind: "degree", title: "Máster en Sexualidad Humana y Terapia de Pareja", institution: "Universidad Autónoma de Santo Domingo", short: "UASD" },
    { kind: "certificate", title: "Certificación en Terapia Breve de Resolución de Problemas", institution: "Brief Therapy Center México" },
    { kind: "certificate", title: "Certificación en Coordinación y Psicoterapia de Grupo", institution: "Escuela Sistémica de Argentina" },
  ],
} as const;

/** Modalidad y honorarios (se muestran en "Agenda tu cita" y en los datos estructurados). */
export const bookingInfo = {
  modality: "Sesiones presenciales y online, coordinadas a través de cada centro.",
  fees: "Los honorarios y la facturación los gestiona cada centro: al escribir te informarán de tarifas y disponibilidad.",
} as const;

export type ServiceSlug = "individual" | "pareja" | "sexual" | "familiar";

/** Servicios (se muestran en "Servicios" y en los datos estructurados). */
/** `path`: página propia del servicio (contenido en @/data/servicios). */
export const services: { slug: ServiceSlug; path: string; title: string; text: string }[] = [
  {
    slug: "individual",
    path: "/terapia-individual/",
    title: "Terapia individual",
    text: "Un acompañamiento personalizado para comprender tus dificultades y afrontar la ansiedad, la tristeza, el estrés, el duelo o una ruptura.",
  },
  {
    slug: "pareja",
    path: "/terapia-de-pareja/",
    title: "Terapia de pareja",
    text: "Para comprender los patrones que generan distancia o conflicto, y trabajar la comunicación, la confianza y las decisiones sobre la relación.",
  },
  {
    slug: "sexual",
    path: "/terapia-sexual/",
    title: "Terapia sexual",
    text: "Un espacio respetuoso y libre de juicios para conversar sobre la intimidad, las diferencias de deseo y los cambios en la vida sexual.",
  },
  {
    slug: "familiar",
    path: "/terapia-familiar/",
    title: "Terapia familiar",
    text: "Para familias con hijos adultos que desean comunicarse mejor, comprender sus conflictos y relacionarse de forma más clara.",
  },
];

export const navLinks = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#articulos", label: "Artículos" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const BOOKING_HREF = "/#agenda";
