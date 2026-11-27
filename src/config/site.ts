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
  roles: ["Psicólogo clínico", "Psicoterapeuta", "Terapeuta de pareja", "Terapeuta familiar", "Terapeuta sexual"],
  title: "Psicólogo y Psicoterapeuta en Santo Domingo · Julio Sánchez",
  description:
    "Psicólogo clínico y psicoterapeuta en Santo Domingo. Terapia individual, de pareja, sexual y familiar con enfoque sistémico breve. Agenda por WhatsApp.",
  locale: "es_DO",
  /** Última revisión del contenido de la home (AAAA-MM-DD). Actualízala al cambiar textos, no en cada deploy. */
  contentUpdated: "2026-11-26",
  social: {
    mediumUser: "medina.juliocesar16",
    medium: "https://medium.com/@medina.juliocesar16",
    whatsappChannel: "https://whatsapp.com/channel/0029VbCWN3L89inroLqmzc1C",
    linkedin: "https://www.linkedin.com/in/psi-julioc-sanchez-medina/",
    instagram: "https://www.instagram.com/julioc.s.m/",
  },
  contact: {
    email: "psi.juliosanchez@gmail.com",
    phone: "+1 (809) 769-1361",
  },
} as const;

export type Day = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

/** Franja de horario: días + apertura/cierre en 24 h ("09:00") */
export type OpeningHours = { days: Day[]; opens: string; closes: string };

export type BookingCenter = {
  /** Nombre visible del centro / canal de citas */
  name?: string;
  /** Línea secundaria opcional (p. ej. el centro al que pertenece) */
  label?: string;
  phone: string;
  /** Muestra el botón "Llamar ahora" (por defecto true). Pon false si el número solo atiende por WhatsApp. */
  allowCalls?: boolean;
  /** Dirección del centro (publicada con su permiso) */
  address?: {
    /** Calle, número, edificio/local */
    street: string;
    /** Sector o barrio */
    neighborhood?: string;
    postalCode?: string;
  };
  /** Nombre tal como figura en su ficha de Google (si difiere del visible); se usa en los datos estructurados */
  listingName?: string;
  /** Enlace a Google Maps ("Cómo llegar") */
  mapsUrl?: string;
  /** Coordenadas, solo si vienen de la ficha real del centro */
  geo?: { lat: number; lng: number };
  /** Horario de atención del centro (los días no listados, cerrado) */
  hours?: OpeningHours[];
  /** Días en que Julio atiende en este centro */
  julioDays?: Day[];
};

/** Centros donde se puede agendar cita (botón "Agenda tu cita"). Datos facilitados por Julio (nov. 2026). */
export const bookingCenters: BookingCenter[] = [
  {
    name: "Psicobienestar Centro Terapéutico",
    phone: "+1 (849) 629-1603",
    allowCalls: false,
    address: { street: "C. Eugenio Deschamps 40", neighborhood: "Los Prados", postalCode: "10131" },
    mapsUrl: "https://maps.app.goo.gl/SgiDaiuN9QY8KucFA",
    geo: { lat: 18.4731599, lng: -69.9600407 },
    julioDays: ["Tu", "We"],
    hours: [
      { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "20:00" },
      { days: ["Sa"], opens: "09:00", closes: "17:00" },
    ],
  },
  {
    name: "Centro Integral Lotus",
    label: "Centro Integral Lotus",
    phone: "+1 (809) 851-1386",
    address: { street: "Torre Ejecutiva Sonora, Suite 702, Av. Abraham Lincoln No. 1069", neighborhood: "Serrallés" },
    // Ficha del edificio (Torre Ejecutiva Sonora); coordenadas del edificio
    mapsUrl: "https://maps.app.goo.gl/uHbUzQEjcEtjyeDZA",
    geo: { lat: 18.4813319, lng: -69.9384818 },
    julioDays: ["Mo", "Sa"],
    hours: [
      { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "20:00" },
      { days: ["Sa"], opens: "09:00", closes: "13:00" },
    ],
  },
  {
    name: "Mentalmente",
    label: "Mentalmente",
    phone: "+1 (829) 783-8519",
    allowCalls: false,
    listingName: "Mentalmente Centro Integral de Salud Mental",
    address: { street: "Plaza Galerías Comerciales, local 309, Av. 27 de Febrero No. 54", neighborhood: "El Vergel", postalCode: "10107" },
    mapsUrl: "https://maps.app.goo.gl/BvqRkxKV56SDFXxT8",
    geo: { lat: 18.4737444, lng: -69.9172487 },
    julioDays: ["Th"],
    hours: [
      { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "19:00" },
      { days: ["Sa"], opens: "09:00", closes: "16:00" },
    ],
  },
];

const dayNames: Record<Day, string> = { Mo: "Lun", Tu: "Mar", We: "Mié", Th: "Jue", Fr: "Vie", Sa: "Sáb", Su: "Dom" };
const allDays: Day[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const time12 = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h < 12 ? "a. m." : "p. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

/** Horario legible: ["Lun–Vie: 9:00 a. m. – 8:00 p. m.", "Sáb: 9:00 a. m. – 5:00 p. m.", "Dom: cerrado"] */
export const formatHours = (hours: OpeningHours[] = []) => {
  const lines = hours.map((h) => {
    const days = h.days.length > 1 ? `${dayNames[h.days[0]]}–${dayNames[h.days.at(-1)!]}` : dayNames[h.days[0]];
    return `${days}: ${time12(h.opens)} – ${time12(h.closes)}`;
  });
  const open = new Set(hours.flatMap((h) => h.days));
  const closed = allDays.filter((d) => !open.has(d));
  if (closed.length) lines.push(`${closed.map((d) => dayNames[d]).join(", ")}: cerrado`);
  return lines;
};

const dayLong: Record<Day, string> = { Mo: "lunes", Tu: "martes", We: "miércoles", Th: "jueves", Fr: "viernes", Sa: "sábados", Su: "domingos" };

/** Días en texto: ["Mo","Sa"] → "Lunes y sábados" */
export const formatDays = (days: Day[] = []) => {
  const names = days.map((d) => dayLong[d]);
  const text = names.length > 1 ? `${names.slice(0, -1).join(", ")} y ${names.at(-1)}` : (names[0] ?? "");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/** Dirección en una línea: "Calle…, Sector, Santo Domingo" */
export const formatAddress = (a?: BookingCenter["address"]) =>
  a ? [a.street, a.neighborhood, "Santo Domingo"].filter(Boolean).join(", ") : "";

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
  { href: "/articulos/", label: "Artículos" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const BOOKING_HREF = "/#agenda";
