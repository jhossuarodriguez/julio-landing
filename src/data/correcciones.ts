/**
 * Correcciones ortográficas de los artículos de Julio, aplicadas sobre el texto que llega de
 * Medium (feed + archivo) al construir el sitio. Así no se pierden al sincronizar.
 *
 * - `title`: título corregido (la URL del artículo no cambia: el slug está congelado).
 * - `replace`: pares [texto en Medium, texto corregido] para el cuerpo y el extracto.
 *
 * Ojo: Medium usa espacios especiales (\u00a0 no separable, \u200a fino alrededor de "—").
 * Si Julio corrige el texto en Medium, el build avisa de que la corrección ya no hace falta
 * y se puede borrar de aquí. Solo ortografía y gramática: nunca cambiar el contenido clínico.
 */
export const correcciones: Record<string, { title?: string; replace?: [string, string][] }> = {
  // Dos comportamientos que matan tu matrimonio
  a13c5fa45264: { title: "Dos comportamientos que matan tu matrimonio" },

  // La naturaleza del tiempo para sanar tras la traición en una relación
  "23b0bceafff2": {
    replace: [
      ["discusiones, y reproches", "discusiones y reproches"],
      ["el otro\u200a—\u200a, bloqueamos", "el otro—, bloqueamos"],
    ],
  },

  // El tiempo de calidad en pareja
  e0ce1524c5cf: {
    title: "El tiempo de calidad en pareja: esa verdad incómoda de la que poco se habla",
    replace: [["experiencia terapeutica", "experiencia terapéutica"]],
  },

  // Lo que esconde la búsqueda de la razón
  "6f7f19214bdb": { title: "Lo que esconde la búsqueda de la razón en las relaciones de pareja" },

  // Celos e inseguridad en la pareja
  "774b52700111": {
    title: "Celos e inseguridad en la pareja: cómo romper el ciclo de la duda y el miedo",
    // Números con emoji incompleto ("1️") → "1."
    replace: ["1", "2", "3", "4"].map((n): [string, string] => [`${n}️ <strong>`, `${n}. <strong>`]),
  },

  // Cuánto me cuesta terminar esa relación de pareja
  ff597bb5aca6: {
    title: "Cuánto me cuesta terminar esa relación de pareja",
    replace: [
      // Subtítulo que repetía el título al inicio del artículo
      ["<h2>Cuanto me cuesta terminar esa relación de\u00a0pareja</h2>", ""],
      [
        "Lo más característico de estas personas su <strong>fobia al dolor que les genera el rechazo, es tan intensa</strong> que",
        "Lo más característico de estas personas es su <strong>fobia al dolor que les genera el rechazo: es tan intensa</strong> que",
      ],
    ],
  },

  // Infidelidad
  "97d077a8fc76": {
    title: "Infidelidad: lo que realmente ocurre en una relación después de la traición",
    replace: [
      ["nos permitia verlo, mas alla del ámbito sexual, asi podremos", "nos permite ir más allá del ámbito sexual; así podremos"],
      ["de la relación, (por ejemplo", "de la relación (por ejemplo"],
      ["la opinion de", "la opinión de"],
      ["para escuchar, y comprender", "para escuchar y comprender"],
    ],
  },
};
