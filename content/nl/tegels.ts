export type TegelPhoto = {
  /** Stable id, used as the React key. */
  slug: string;
  /** Image URL. PLACEHOLDER Unsplash stock — see the note below. */
  url: string;
  /** Describes the photo for screen readers and image search. */
  alt: string;
};

/**
 * Photos for the carousel under the assortiment cards.
 *
 * These are deliberately **impressions, not products**. The showroom carries
 * 300–400 different tiles with only one or two of each, and manufacturers drop
 * a line within a year if it sells slowly — so anything that looks like a
 * catalogue would be wrong within weeks. The carousel shows breadth and style
 * without implying any specific tile is in stock, which is exactly what makes
 * it maintainable.
 *
 * Consequence: photos here need no relationship to current stock. Mark can
 * shoot whatever is standing in the showroom and swap entries freely.
 *
 * ⚠️ STILL PLACEHOLDERS. Mark is supplying 12–20 real photos (landscape 3:2,
 * ≥1200×800) which land in public/images/tegels/. Do not merge to `main` before
 * they do.
 */
export const tegels: TegelPhoto[] = [
  {
    slug: "badkamer-grijs",
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop&auto=format",
    alt: "Badkamer met grote grijze tegels",
  },
  {
    slug: "woonkamer-marmerlook",
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&auto=format",
    alt: "Woonkamer met marmerlook vloertegels",
  },
  {
    slug: "keuken-achterwand",
    url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&h=800&fit=crop&auto=format",
    alt: "Keuken met witte wandtegels als achterwand",
  },
  {
    slug: "terras-buiten",
    url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&h=800&fit=crop&auto=format",
    alt: "Terras met buitentegels",
  },
  {
    slug: "douche-mozaiek",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop&auto=format",
    alt: "Douche met mozaïektegels",
  },
  {
    slug: "hal-groot-formaat",
    url: "https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&h=800&fit=crop&auto=format",
    alt: "Hal met tegels in groot formaat",
  },
  {
    slug: "vloertegels-neutraal",
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop&auto=format",
    alt: "Ruimte met neutrale vloertegels",
  },
  {
    slug: "wandtegels-strak",
    url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&h=800&fit=crop&auto=format",
    alt: "Strakke wandtegels in een keuken",
  },
  {
    slug: "groot-formaat-woonruimte",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&auto=format",
    alt: "Woonruimte met tegels in groot formaat",
  },
  {
    slug: "badkamer-sanitair",
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop&auto=format",
    alt: "Badkamer met bad en betegelde wand",
  },
];
