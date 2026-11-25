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
  /** Meta descripción (≤160 caracteres) */
  description: string;
  h1: string;
  lead: string;
  /** "¿Cuándo puede ayudarte?" */
  whenIntro: string;
  when: string[];
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
  image: "julio-de-pie" | "julio-sonrisa" | "julio-bn";
  imageAlt: string;
  /** Mostrar artículos de Medium relacionados */
  showArticles?: boolean;
};

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
    seoTitle: "Terapia Sexual en Santo Domingo · Julio Sánchez, Psicólogo",
    description:
      "Terapia sexual en Santo Domingo con un psicólogo clínico formado en sexualidad humana. Individual o en pareja, presencial u online y confidencial.",
    h1: "Terapia sexual en Santo Domingo",
    lead: "Un espacio confidencial y sin juicios para hablar de tu sexualidad, comprender lo que te preocupa y encontrar soluciones, a solas o en pareja.",
    whenIntro:
      "La sexualidad forma parte de nuestro bienestar, y es normal que en algún momento aparezcan dudas o dificultades. Hablarlo con un profesional suele ser el primer paso para recuperar la tranquilidad. La terapia sexual puede ayudarte si vives, por ejemplo:",
    when: [
      "Bajo deseo sexual, o diferencias de deseo que generan tensión en la pareja.",
      "Dificultades de erección o de eyaculación (precoz o retardada).",
      "Dificultad para alcanzar el orgasmo o para disfrutar de los encuentros.",
      "Dolor o incomodidad en las relaciones sexuales (trabajado junto a una valoración médica).",
      "Ansiedad, vergüenza o culpa relacionadas con la sexualidad.",
      "Problemas para hablar de intimidad en pareja, o cambios en la vida sexual tras una infidelidad, un embarazo o una etapa difícil.",
      "Dudas sobre tu vida sexual, tu orientación o tu identidad que quieras explorar con calma.",
    ],
    approach: [
      "La terapia sexual es una forma de psicoterapia: se trabaja conversando. No hay exploraciones físicas ni ejercicios que te hagan sentir incómodo o incómoda; todo se hace a tu ritmo y con tu consentimiento.",
      "Trabajo desde un enfoque sistémico breve, orientado a la construcción de soluciones. Más que quedarnos solo en el problema, buscamos entender cómo se mantiene la dificultad en tu vida y en tu relación, y construimos pasos concretos para cambiarla. Cuando ayuda, propongo pequeñas tareas para practicar entre sesiones.",
      "Si una dificultad puede tener un origen físico u hormonal, te recomendaré una valoración médica (por ejemplo, con urología o ginecología) para abordarla de forma integral y en paralelo.",
    ],
    relevantCredentials: [
      "Formación en Sexualidad Humana y Terapia de Pareja",
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
        "Lo que hablas en consulta es confidencial, de acuerdo con el código de ética profesional del psicólogo.",
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
        a: "No. La terapia sexual es psicoterapia: se trabaja conversando y, cuando ayuda, con tareas que realizas en tu intimidad entre sesiones.",
      },
      {
        q: "¿Es confidencial?",
        a: "Sí. Todo lo que compartes en consulta está protegido por el secreto profesional.",
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
    whatsappMessage: "Hola, me gustaría agendar una cita de terapia sexual con el psicólogo Julio Cesar Sánchez.",
    image: "julio-de-pie",
    imageAlt: "Julio Cesar Sánchez Medina, psicólogo y terapeuta sexual en Santo Domingo",
  },

  pareja: {
    slug: "pareja",
    seoTitle: "Terapia de Pareja en Santo Domingo · Julio Sánchez, Psicólogo",
    description:
      "Terapia de pareja en Santo Domingo con un psicólogo con maestría en Terapia Familiar y de Pareja. Comunicación, celos, infidelidad. Presencial u online.",
    h1: "Terapia de pareja en Santo Domingo",
    lead: "Herramientas para mejorar la comunicación, resolver conflictos y fortalecer el vínculo, de la mano de un psicoterapeuta con maestría en Terapia Familiar y de Pareja.",
    whenIntro:
      "Toda relación atraviesa etapas difíciles. Pedir ayuda no significa que la relación haya fracasado: muchas parejas llegan a terapia precisamente porque quieren cuidarla. Puede ayudarles si, por ejemplo:",
    when: [
      "Discuten a menudo por los mismos temas y sienten que no llegan a nada.",
      "Notan distancia emocional, poco tiempo de calidad o que viven «como compañeros de piso».",
      "Hay celos, inseguridad o desconfianza que desgastan la relación.",
      "Atraviesan una infidelidad y quieren decidir cómo seguir, o reconstruir la confianza.",
      "Les cuesta ponerse de acuerdo en decisiones importantes: convivencia, hijos, familia, dinero.",
      "La intimidad o la vida sexual se ha vuelto un tema difícil de hablar.",
      "Están considerando separarse y quieren hacerlo con respeto, especialmente si hay hijos.",
    ],
    approach: [
      "Trabajo desde un enfoque sistémico breve: miramos la relación como un sistema. Más que buscar culpables, observamos los patrones que se repiten entre ustedes —cómo discuten, cómo se piden las cosas, qué pasa cuando uno se aleja— y buscamos juntos formas nuevas de relacionarse.",
      "Mi papel no es tomar partido ni decirles si deben seguir juntos. Es ayudarles a comunicarse mejor, a entender lo que cada uno necesita y a construir soluciones que funcionen para los dos.",
      "En la mayoría de los procesos combinamos sesiones conjuntas y, cuando hace falta, algún encuentro individual.",
    ],
    relevantCredentials: [
      "Maestría en Terapia Familiar y de Pareja",
      "Formación en Sexualidad Humana y Terapia de Pareja",
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
        "Lo que se habla en consulta es confidencial, de acuerdo con el código de ética profesional del psicólogo.",
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
        a: "No. Esa decisión les corresponde a ustedes. Mi trabajo es ayudarles a verla con claridad y a tomarla de la mejor manera posible.",
      },
      {
        q: "¿Sirve la terapia después de una infidelidad?",
        a: "Sí. Puede ayudarles a entender lo ocurrido, a gestionar el dolor y a decidir si quieren reconstruir la confianza, sin prisas y respetando los tiempos de cada uno.",
      },
      {
        q: "¿También atiendes a parejas que se están separando?",
        a: "Sí. La terapia puede ayudar a separarse con respeto, reducir el conflicto y organizar la crianza compartida cuando hay hijos.",
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
    seoTitle: "Psicólogo en Santo Domingo · Terapia Individual · Julio Sánchez",
    description:
      "Terapia psicológica individual en Santo Domingo con un psicólogo clínico. Ansiedad, estrés, autoestima, duelo y relaciones. Presencial u online.",
    h1: "Terapia psicológica individual en Santo Domingo",
    lead: "Un proceso para conocerte mejor, fortalecer tus recursos y construir la vida que deseas, acompañado por un psicólogo clínico.",
    whenIntro:
      "No hace falta estar «muy mal» para ir a terapia. Muchas personas consultan porque algo les pesa, porque quieren entenderse mejor o porque atraviesan un cambio. Puede ayudarte si, por ejemplo:",
    when: [
      "Sientes ansiedad, estrés o preocupación constante que te cuesta manejar.",
      "Te notas triste, desmotivado o desmotivada, o sin ganas de las cosas que antes disfrutabas.",
      "Tu autoestima o la forma en que te hablas a ti mismo o misma te hace daño.",
      "Atraviesas un duelo o una pérdida, incluida una ruptura de pareja.",
      "Hay conflictos que se repiten con tu familia, tu pareja o en el trabajo.",
      "Enfrentas una decisión o un cambio importante en tu vida.",
      "Quieres conocerte mejor y crecer a nivel personal.",
    ],
    approach: [
      "Trabajo desde un enfoque sistémico breve, orientado a la construcción de soluciones. Eso significa que, además de entender lo que te ocurre, ponemos el foco en tus recursos, en lo que ya funciona y en los pasos concretos que puedes dar.",
      "Tu historia, tus relaciones y tu contexto importan: no eres solo «el problema». Por eso miramos cómo influye tu entorno y qué pequeños cambios pueden tener un gran efecto.",
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
        "Lo que hablas en consulta es confidencial, de acuerdo con el código de ética profesional del psicólogo.",
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
        a: "Sí. Todo lo que compartes en consulta está protegido por el secreto profesional.",
      },
      modalityFaq,
      feesFaq,
    ],
    whatsappMessage: "Hola, me gustaría agendar una cita de terapia individual con el psicólogo Julio Cesar Sánchez.",
    image: "julio-bn",
    imageAlt: "Retrato de Julio Cesar Sánchez Medina, psicólogo clínico en Santo Domingo",
  },
};
