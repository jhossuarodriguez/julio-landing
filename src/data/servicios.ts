/**
 * Contenido de las páginas de servicio (/terapia-sexual/, /terapia-de-pareja/, /terapia-individual/).
 *
 * ⚠️ Contenido de salud: redactado a partir de los servicios, el enfoque y la formación de Julio.
 * Debe revisarlo él antes de publicarse. Reglas: no prometer resultados, no inventar cifras
 * (duración, número de sesiones, precios) y derivar a evaluación médica/psiquiátrica cuando proceda.
 */
import type { ServiceSlug } from "@/config/site";

export type Faq = { q: string; a: string };

export type ServicePage = {
  slug: ServiceSlug;
  /** <title> (≈60 caracteres) */
  seoTitle: string;
  /** Última revisión del contenido (AAAA-MM-DD): se muestra y va en dateModified */
  updated: string;
  /** Meta descripción (≤160 caracteres) */
  description: string;
  h1: string;
  lead: string;
  /** "¿Cuándo puede ayudarte?" */
  whenIntro: string;
  when: string[];
  /** Experiencia propia de Julio (primera persona), destacada al inicio de "Cómo trabajo" */
  practice: string;
  /** "Cómo trabajo" */
  approach: string[];
  /** Credenciales más relevantes para este servicio (títulos de @/config/site → credentials.education) */
  relevantCredentials: string[];
  /** "Cómo es el proceso" */
  steps: { title: string; text: string }[];
  /** Bloque de confidencialidad / notas importantes */
  privacy: { title: string; text: string[] };
  faqs: Faq[];
  /** Mensaje prellenado de WhatsApp para este servicio */
  whatsappMessage: string;
  /** Imagen del encabezado (nombre en src/assets/images) */
  image: "julio-de-pie" | "julio-sonrisa" | "julio-bn" | "julio-sentado";
  imageAlt: string;
  /** Mostrar artículos de Medium relacionados */
  showArticles?: boolean;
};

/** Confidencialidad: texto de Julio (Código de Ética y Disciplina del CODOPSI). */
const CONFIDENCIALIDAD =
  "La información que compartes en consulta se maneja de forma confidencial. Puede compartirse con tu consentimiento escrito o, sin este, cuando exista un peligro inminente para ti o para otras personas, conforme al Código de Ética y Disciplina del CODOPSI y a las normas aplicables.";
/** Misma idea, dirigida a varias personas (pareja, familia). */
const CONFIDENCIALIDAD_USTEDES =
  "La información que comparten en consulta se maneja de forma confidencial. Puede compartirse con su consentimiento escrito o, sin este, cuando exista un peligro inminente para ustedes o para otras personas, conforme al Código de Ética y Disciplina del CODOPSI y a las normas aplicables.";

const modalityFaq: Faq = {
  q: "¿Puedo hacer la terapia online?",
  a: "Sí. Las sesiones pueden ser presenciales u online, y se coordinan a través de cada centro. Al escribir por WhatsApp te indicarán la disponibilidad de cada modalidad.",
};

const feesFaq: Faq = {
  q: "¿Cuánto cuesta una sesión?",
  a: "Los honorarios y la facturación los gestiona cada centro. Al escribir por WhatsApp te informarán de las tarifas y la disponibilidad.",
};

export const servicePages: Record<ServiceSlug, ServicePage> = {
  sexual: {
    slug: "sexual",
    updated: "2026-11-26",
    seoTitle: "Terapia Sexual en Santo Domingo · Julio Sánchez, Psicólogo",
    description:
      "Terapia sexual en Santo Domingo: comunicación sobre la intimidad, diferencias de deseo y cambios en la vida sexual. Individual o en pareja, sin juicios.",
    h1: "Terapia sexual en Santo Domingo",
    lead: "Un espacio de acompañamiento respetuoso, libre de juicios y discriminación, para conversar sobre inquietudes relacionadas con la sexualidad y la intimidad.",
    whenIntro:
      "El proceso se adapta a las necesidades de cada persona o pareja y busca comprender cómo estas preocupaciones se manifiestan en el presente y qué factores personales, emocionales o relacionales pueden estar relacionados. En las sesiones pueden explorar:",
    when: [
      "Dificultades para comunicarse sobre la intimidad.",
      "Diferencias en las necesidades o el deseo.",
      "Cambios en la vida sexual.",
      "Otras preocupaciones que estén afectando el bienestar o la relación.",
    ],
    practice:
      "Ofrezco un espacio respetuoso, sin juicios ni discriminación, para conversar sobre inquietudes relacionadas con la sexualidad y la intimidad. El acompañamiento se ajusta a las necesidades de cada persona o pareja y a los objetivos que acuerden en consulta.",
    approach: [
      "La terapia sexual es una forma de psicoterapia: se trabaja conversando. No hay exploraciones físicas ni ejercicios que te hagan sentir incómodo o incómoda; todo se hace a tu ritmo y con tu consentimiento.",
      "Trabajo desde un enfoque sistémico breve, orientado a la construcción de soluciones. Más que quedarnos solo en el problema, buscamos entender cómo se mantiene la dificultad en tu vida y en tu relación, y construimos pasos concretos para cambiarla. Juntos definiremos metas de trabajo realistas y respuestas acordes con sus circunstancias.",
      "Si una dificultad puede tener un origen físico u hormonal, te recomendaré una valoración médica (por ejemplo, con urología o ginecología) para abordarla de forma integral y en paralelo.",
    ],
    relevantCredentials: [
      "Máster en Sexualidad Humana y Terapia de Pareja",
      "Maestría en Terapia Familiar y de Pareja",
      "Psicólogo clínico",
    ],
    steps: [
      {
        title: "Escribe al centro que prefieras",
        text: "Por WhatsApp, con total discreción. No necesitas explicar el motivo en el mensaje: basta con pedir una cita.",
      },
      {
        title: "Primera sesión",
        text: "Conversamos sobre lo que te trae y lo que te gustaría que cambiara. No tienes que contarlo todo el primer día.",
      },
      {
        title: "Definimos un plan",
        text: "Acordamos objetivos, si conviene trabajar de forma individual, en pareja o combinando ambas, y la frecuencia de las sesiones.",
      },
      {
        title: "Seguimiento",
        text: "Revisamos juntos los avances y ajustamos el proceso según lo que vaya funcionando para ti.",
      },
    ],
    privacy: {
      title: "Tu privacidad, primero",
      text: [
        CONFIDENCIALIDAD,
        "Puedes venir solo o sola aunque el tema involucre a tu pareja, y si te resulta más cómodo, la sesión puede ser online.",
      ],
    },
    faqs: [
      {
        q: "¿Tengo que ir con mi pareja?",
        a: "No. Puedes empezar de forma individual aunque la dificultad se viva en pareja. Si es útil, más adelante podemos incluir sesiones conjuntas.",
      },
      {
        q: "¿Hay algún tipo de contacto físico o exploración?",
        a: "No. La terapia sexual es psicoterapia: se trabaja conversando, a tu ritmo y con tu consentimiento.",
      },
      {
        q: "¿Es confidencial?",
        a: CONFIDENCIALIDAD,
      },
      {
        q: "¿Y si el problema tiene una causa médica?",
        a: "Te orientaré para que hagas una valoración médica con el especialista adecuado. Muchas dificultades sexuales tienen componentes físicos y emocionales a la vez, y lo ideal es trabajarlas en conjunto.",
      },
      {
        q: "¿Cuántas sesiones voy a necesitar?",
        a: "Depende de cada persona y de cada situación. El enfoque breve busca generar cambios en el menor tiempo posible, y revisamos los avances juntos para decidir cómo seguir.",
      },
      modalityFaq,
      feesFaq,
    ],
    // Neutro a propósito: el mensaje lo leen recepciones de terceros y la página promete discreción
    whatsappMessage: "Hola, me gustaría agendar una cita con el psicólogo Julio Cesar Sánchez.",
    image: "julio-de-pie",
    imageAlt: "Julio Cesar Sánchez Medina, psicólogo y terapeuta sexual en Santo Domingo",
  },

  pareja: {
    slug: "pareja",
    updated: "2026-11-26",
    seoTitle: "Terapia de Pareja en Santo Domingo · Julio Sánchez",
    description:
      "Terapia de pareja en Santo Domingo con un psicólogo con maestría en Terapia Familiar y de Pareja: comunicación, conflictos y crisis de confianza.",
    h1: "Terapia de pareja en Santo Domingo",
    lead: "Un espacio de acompañamiento para comprender cómo se manifiestan las dificultades de la relación en el presente y reconocer los patrones que pueden estar generando distancia, conflicto o malestar.",
    whenIntro:
      "El proceso se adapta a las necesidades de ambos y busca construir formas de comunicarse y responder que sean coherentes con sus circunstancias. En las sesiones pueden trabajar:",
    when: [
      "La comunicación.",
      "Los conflictos recurrentes.",
      "Las crisis de confianza.",
      "Las decisiones importantes sobre la relación.",
      "Continuar juntos después de una infidelidad o una traición: explorar lo ocurrido, comprender cómo les ha afectado y abordar la reconstrucción de la confianza.",
    ],
    practice:
      "Acompaño a parejas que desean comprender sus dificultades, mejorar la comunicación y decidir cómo continuar su relación. También trabajo con quienes han decidido seguir juntos después de una infidelidad o una traición, ofreciendo un espacio para abordar lo ocurrido y explorar cómo reconstruir la confianza.",
    approach: [
      "Trabajo desde un enfoque sistémico breve: miramos la relación como un sistema. Más que buscar culpables, observamos los patrones que se repiten entre ustedes —cómo discuten, cómo se piden las cosas, qué pasa cuando uno se aleja— y buscamos juntos formas nuevas de relacionarse.",
      "La terapia no busca imponer una decisión ni asignar culpables. Ofrece un espacio para que ambos puedan expresar lo que necesitan y avanzar hacia una mayor claridad sobre cómo desean continuar.",
    ],
    relevantCredentials: [
      "Maestría en Terapia Familiar y de Pareja",
      "Máster en Sexualidad Humana y Terapia de Pareja",
      "Certificación en Terapia Breve de Resolución de Problemas",
    ],
    steps: [
      {
        title: "Escriban al centro que prefieran",
        text: "Por WhatsApp. Puede escribir uno de los dos; en el mensaje basta con pedir una cita de terapia de pareja.",
      },
      {
        title: "Primera sesión juntos",
        text: "Cada uno cuenta cómo ve la situación y qué le gustaría que cambiara. Es un espacio seguro para ambos.",
      },
      {
        title: "Objetivos en común",
        text: "Acordamos qué quieren trabajar, cómo vamos a hacerlo y con qué frecuencia.",
      },
      {
        title: "Cambios en el día a día",
        text: "Entre sesiones practican pequeños cambios concretos, y revisamos juntos qué está funcionando.",
      },
    ],
    privacy: {
      title: "Un espacio neutral y confidencial",
      text: [
        CONFIDENCIALIDAD_USTEDES,
        "Ninguno de los dos tiene que sentirse juzgado: el foco es la relación, no quién tiene la razón.",
      ],
    },
    faqs: [
      {
        q: "¿Y si mi pareja no quiere venir?",
        a: "Puedes empezar tú. Los cambios en una persona influyen en la dinámica de la relación, y a veces, al ver esos cambios, la otra persona decide sumarse.",
      },
      {
        q: "¿Vas a decirnos si debemos separarnos?",
        a: "No. La terapia no busca imponer una decisión ni asignar culpables: ofrece un espacio para que ambos expresen lo que necesitan y ganen claridad sobre cómo desean continuar.",
      },
      {
        q: "¿Sirve la terapia después de una infidelidad?",
        a: "Sí, si deciden continuar juntos. El proceso les permite explorar lo ocurrido, comprender cómo les ha afectado y abordar la reconstrucción de la confianza, respetando los tiempos de cada uno.",
      },
      {
        q: "¿Es confidencial?",
        a: CONFIDENCIALIDAD_USTEDES,
      },
      {
        q: "¿Cuántas sesiones vamos a necesitar?",
        a: "Depende de cada pareja. El enfoque breve busca cambios concretos en el menor tiempo posible, y revisamos los avances juntos para decidir cómo seguir.",
      },
      modalityFaq,
      feesFaq,
    ],
    whatsappMessage: "Hola, nos gustaría agendar una cita de terapia de pareja con el psicólogo Julio Cesar Sánchez.",
    image: "julio-sonrisa",
    imageAlt: "Julio Cesar Sánchez Medina, psicólogo y terapeuta de pareja en Santo Domingo",
    showArticles: true,
  },

  individual: {
    slug: "individual",
    updated: "2026-11-26",
    seoTitle: "Terapia Psicológica en Santo Domingo · Julio Sánchez",
    description:
      "Terapia individual en Santo Domingo con un psicólogo clínico: ansiedad, tristeza, estrés, duelo, rupturas y condiciones crónicas. Presencial u online.",
    h1: "Terapia psicológica individual en Santo Domingo",
    lead: "Un espacio de acompañamiento personalizado para comprender cómo se manifiestan tus dificultades en el presente y desarrollar respuestas coherentes con tus habilidades, necesidades y circunstancias.",
    whenIntro:
      "La terapia también puede ayudarte a reconocer patrones, fortalecer tus recursos personales y explorar alternativas para avanzar con mayor claridad. No tienes que tener todas las respuestas antes de empezar; podemos comenzar por aquello que hoy te preocupa. En las sesiones podemos abordar temas como:",
    when: [
      "Ansiedad.",
      "Tristeza.",
      "Estrés.",
      "Duelo.",
      "Dificultades en las relaciones.",
      "Rupturas amorosas.",
      "Los retos emocionales que pueden surgir al vivir con una condición crónica.",
    ],
    practice:
      "En mi práctica ofrezco un acompañamiento personalizado, enfocado en comprender cómo se manifiestan las dificultades en el presente y en construir respuestas acordes con las habilidades y necesidades de cada persona. Trabajo junto a quien consulta para reconocer sus recursos y definir objetivos que tengan sentido para su situación.",
    approach: [
      "Trabajo desde un enfoque sistémico breve, orientado a la construcción de soluciones. Eso significa que, además de entender lo que te ocurre, ponemos el foco en tus recursos, en lo que ya funciona y en los pasos concretos que puedes dar.",
      "El proceso se adapta a tus necesidades y a los objetivos que definamos juntos, respetando tu ritmo y tu historia.",
      "Como psicólogo no receto medicación. Si en algún momento puede ayudarte una valoración psiquiátrica, te lo diré y podemos trabajar de forma coordinada.",
    ],
    relevantCredentials: [
      "Psicólogo clínico",
      "Maestría en Psicología de la Salud",
      "Certificación en Terapia Breve de Resolución de Problemas",
    ],
    steps: [
      {
        title: "Escribe al centro que prefieras",
        text: "Por WhatsApp. En el mensaje basta con pedir una cita; no necesitas explicar el motivo.",
      },
      {
        title: "Primera sesión",
        text: "Conversamos sobre lo que te trae, cómo te afecta y qué te gustaría que cambiara. Vamos a tu ritmo.",
      },
      {
        title: "Objetivos claros",
        text: "Definimos juntos hacia dónde quieres ir y cómo vamos a trabajar, con la frecuencia que mejor se adapte a ti.",
      },
      {
        title: "Avances concretos",
        text: "Revisamos lo que va funcionando en tu día a día y ajustamos el proceso cuando hace falta.",
      },
    ],
    privacy: {
      title: "Un espacio seguro",
      text: [
        CONFIDENCIALIDAD,
        "Aquí no hay juicios: puedes hablar de lo que sientes con tranquilidad y a tu ritmo.",
      ],
    },
    faqs: [
      {
        q: "¿Cómo sé si necesito ir al psicólogo?",
        a: "Si algo te preocupa, te quita energía o se repite aunque intentes cambiarlo, vale la pena consultarlo. No tienes que esperar a que sea «grave».",
      },
      {
        q: "¿Qué diferencia hay entre psicólogo y psiquiatra?",
        a: "El psicólogo trabaja a través de la psicoterapia; el psiquiatra es médico y puede recetar medicación. En algunos casos lo ideal es combinar ambos, y te orientaré si es tu caso.",
      },
      {
        q: "¿Cuántas sesiones voy a necesitar?",
        a: "Depende de cada persona y de lo que quieras trabajar. El enfoque breve busca cambios concretos en el menor tiempo posible, y revisamos los avances juntos.",
      },
      {
        q: "¿Es confidencial?",
        a: CONFIDENCIALIDAD,
      },
      modalityFaq,
      feesFaq,
    ],
    whatsappMessage: "Hola, me gustaría agendar una cita de terapia individual con el psicólogo Julio Cesar Sánchez.",
    image: "julio-bn",
    imageAlt: "Retrato de Julio Cesar Sánchez Medina, psicólogo clínico en Santo Domingo",
  },

  familiar: {
    slug: "familiar",
    updated: "2026-11-26",
    seoTitle: "Terapia Familiar en Santo Domingo · Julio Sánchez, Psicólogo",
    description:
      "Terapia familiar en Santo Domingo para familias con hijos adultos: comunicación, conflictos recurrentes y relaciones más claras. Presencial u online.",
    h1: "Terapia familiar en Santo Domingo",
    lead: "Para familias con hijos adultos que desean mejorar la comunicación, comprender conflictos recurrentes o encontrar maneras más claras de relacionarse y apoyarse.",
    whenIntro:
      "Cuando los hijos crecen, la familia cambia: aparecen nuevas formas de relacionarse, nuevas expectativas y, a veces, tensiones que se repiten. La terapia familiar ofrece un espacio para hablarlo con ayuda profesional. Puede ayudarles si, por ejemplo:",
    when: [
      "Les cuesta comunicarse con claridad entre padres e hijos adultos.",
      "Hay conflictos que se repiten y quieren comprender por qué ocurren.",
      "Quieren encontrar maneras más claras de relacionarse y de apoyarse como familia.",
      "Necesitan que cada integrante pueda expresar su perspectiva y sentirse escuchado.",
      "Buscan un equilibrio entre el apoyo familiar y la autonomía de cada persona adulta.",
    ],
    practice:
      "Acompaño a familias con hijos adultos que desean comprender sus dinámicas, abordar conflictos y mejorar la comunicación. El proceso toma en cuenta la perspectiva de cada integrante y busca construir formas de relacionarse que respondan a las necesidades de la familia.",
    approach: [
      "Trabajo desde un enfoque sistémico breve: miramos a la familia como un sistema en el que lo que hace cada integrante influye en los demás. Más que buscar culpables, observamos los patrones que se repiten y buscamos juntos formas nuevas de relacionarse.",
    ],
    relevantCredentials: [
      "Maestría en Terapia Familiar y de Pareja",
      "Certificación en Coordinación y Psicoterapia de Grupo",
      "Psicólogo clínico",
    ],
    steps: [
      {
        title: "Escriban al centro que prefieran",
        text: "Por WhatsApp. Puede escribir cualquier integrante de la familia; basta con pedir una cita de terapia familiar.",
      },
      {
        title: "Primera sesión",
        text: "Asisten quienes consideren apropiados. Conversamos sobre lo que les trae y lo que cada uno quisiera que cambiara.",
      },
      {
        title: "Objetivos en común",
        text: "Acordamos qué quieren trabajar como familia. El propio proceso irá determinando quiénes deben participar y en qué momento.",
      },
      {
        title: "Seguimiento",
        text: "Revisamos juntos los avances y ajustamos el proceso según lo que vaya funcionando.",
      },
    ],
    privacy: {
      title: "Un espacio respetuoso para cada integrante",
      text: [
        CONFIDENCIALIDAD_USTEDES,
        "Nadie tiene que sentirse juzgado: el foco es la relación entre ustedes, respetando las necesidades de cada persona adulta.",
      ],
    },
    faqs: [
      {
        q: "¿A qué familias está dirigida?",
        a: "A familias con hijos adultos que desean mejorar la comunicación, comprender conflictos recurrentes o encontrar maneras más claras de relacionarse y apoyarse. No atiendo familias con hijos menores de edad.",
      },
      {
        q: "¿Tienen que asistir todos los miembros de la familia?",
        a: "No necesariamente. A la primera sesión es apropiado que asistan quienes consideren adecuados, y el propio proceso irá determinando quiénes deben participar y en qué momento, según se requiera en consulta. La terapia familiar —igual que la de pareja— no se define por el número de personas que asisten, sino por un método de trabajo con su propio marco teórico, orientado a resolver los problemas que motivan la consulta.",
      },
      {
        q: "¿Tomas partido por alguien de la familia?",
        a: "No. El trabajo considera la perspectiva de cada integrante y la dinámica familiar en conjunto, respetando la autonomía de cada persona adulta.",
      },
      {
        q: "¿Es confidencial?",
        a: CONFIDENCIALIDAD_USTEDES,
      },
      modalityFaq,
      feesFaq,
    ],
    whatsappMessage: "Hola, nos gustaría agendar una cita de terapia familiar con el psicólogo Julio Cesar Sánchez.",
    image: "julio-sentado",
    imageAlt: "Julio Cesar Sánchez Medina, psicólogo y terapeuta familiar en Santo Domingo",
  },
};
