/**
 * Datos estructurados (JSON-LD) del sitio, generados a partir de los mismos datos que se
 * muestran en la página (@/config/site y los artículos de Medium), para que nunca se
 * desincronicen. Solo usa hechos visibles en la web: no añadir credenciales, reseñas ni
 * direcciones que no estén publicadas.
 *
 * Tipos: WebSite · WebPage · Person · ProfessionalService (+3 Service) · 3 Organization (centros)
 *        · Blog con BlogPosting (artículos de Medium).
 */
import { site, services, bookingCenters, bookingInfo, e164 } from "@/config/site";
import type { Article } from "@/lib/medium";

type Options = {
  /** Convierte una ruta en URL absoluta (depende de `site` en astro.config) */
  abs: (path: string) => string;
  pageUrl: string;
  pageTitle: string;
  imageUrl: string;
  articles: Article[];
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function buildJsonLd({ abs, pageUrl, pageTitle, imageUrl, articles }: Options) {
  const id = {
    site: abs("/#sitio"),
    page: abs("/#pagina"),
    person: abs("/#persona"),
    service: abs("/#servicio"),
    blog: abs("/#blog"),
  };
  const santoDomingo = {
    "@type": "City",
    name: "Santo Domingo",
    containedInPlace: { "@type": "Country", name: "República Dominicana" },
  };
  const centers = bookingCenters
    .filter((c) => c.name)
    .map((c) => ({
      "@type": "Organization",
      "@id": abs(`/#centro-${slugify(c.name!)}`),
      name: c.name,
      telephone: e164(c.phone),
      areaServed: santoDomingo,
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": id.site,
        url: abs("/"),
        name: site.name,
        inLanguage: "es",
        publisher: { "@id": id.person },
      },
      {
        "@type": "WebPage",
        "@id": id.page,
        url: pageUrl,
        name: pageTitle,
        inLanguage: "es",
        isPartOf: { "@id": id.site },
        about: { "@id": id.person },
        primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
      },
      {
        "@type": "Person",
        "@id": id.person,
        name: site.name,
        alternateName: site.alternateNames,
        jobTitle: site.role,
        description: site.description,
        url: abs("/"),
        image: imageUrl,
        email: site.contact.email,
        telephone: e164(site.contact.phone),
        knowsLanguage: "es",
        knowsAbout: ["Psicoterapia", ...services.map((s) => s.title), "Salud mental", "Educación emocional"],
        hasOccupation: { "@type": "Occupation", name: site.role, occupationLocation: santoDomingo },
        affiliation: centers.map((c) => ({ "@id": c["@id"] })),
        areaServed: santoDomingo,
        address: { "@type": "PostalAddress", addressLocality: "Santo Domingo", addressCountry: "DO" },
        sameAs: [site.social.medium, site.social.whatsappChannel],
      },
      {
        "@type": "ProfessionalService",
        "@id": id.service,
        name: `Psicoterapia con ${site.name}`,
        url: abs("/"),
        image: imageUrl,
        description: `${site.description} ${bookingInfo.modality}`,
        provider: { "@id": id.person },
        telephone: e164(site.contact.phone),
        email: site.contact.email,
        areaServed: santoDomingo,
        availableLanguage: "es",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de psicoterapia",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              serviceType: "Psicoterapia",
              description: s.text,
              provider: { "@id": id.person },
              areaServed: santoDomingo,
            },
          })),
        },
      },
      ...centers,
      ...(articles.length
        ? [
            {
              "@type": "Blog",
              "@id": id.blog,
              name: `Artículos de ${site.name}`,
              url: site.social.medium,
              inLanguage: "es",
              author: { "@id": id.person },
              blogPost: articles.map((a) => ({
                "@type": "BlogPosting",
                headline: a.title,
                url: a.url,
                datePublished: a.date,
                inLanguage: "es",
                author: { "@id": id.person },
                ...(a.image ? { image: a.image } : {}),
              })),
            },
          ]
        : []),
    ],
  };
}
