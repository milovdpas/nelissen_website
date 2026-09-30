export type AssortimentItem = {
  /** Stable id. Used as the React key, and as the route segment when these
   *  categories grow their own pages — so it must not change once published. */
  slug: string;
  label: string;
  /** Image URL. PLACEHOLDER Unsplash stock — see the note below. */
  url: string;
  /** Describes the photo, not the category. The label is already on the card,
   *  so repeating it here would waste the slot for screen readers and image
   *  search alike. Rewrite each of these when the real photo lands. */
  alt: string;
  desc: string;
};

/**
 * The six categories Mark asked for: what a buyer actually shops for (stock,
 * format, style, finished room) rather than material categories like
 * floor/wall/outdoor.
 *
 * ⚠️ The images below are STILL PLACEHOLDERS and several do not match their
 * category — they are leftovers from the old set. Mark is supplying six real
 * photos (landscape 3:2, ≥1200×800) which land in public/images/assortiment/.
 * Do not merge this to `main` until they do: showing "Slabs" over a stock
 * bathroom is the exact mismatch this whole change exists to fix.
 */
export const assortiment: AssortimentItem[] = [
  {
    slug: "voorraad-tegels",
    label: "Voorraad tegels",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&auto=format",
    alt: "Ruimte met neutrale vloertegels",
    desc: "Direct leverbare tegels uit voorraad. Bekijk ons assortiment voor iedere stijl en toepassing.",
  },
  {
    slug: "slabs",
    label: "Slabs",
    url: "https://images.unsplash.com/photo-1564540583246-934409427776?w=600&h=400&fit=crop&auto=format",
    alt: "Hal met grote formaat tegels",
    desc: "Grote en luxe uitstraling met minimale voegen. Ontdek onze slabs voor de perfecte badkamer.",
  },
  {
    slug: "handvorm-tegels",
    label: "Handvorm tegels",
    url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=400&fit=crop&auto=format",
    alt: "Witte wandtegels als keukenachterwand",
    desc: "Karakter in iedere tegel. Ambachtelijke uitstraling met een unieke, levendige look.",
  },
  {
    slug: "visgraat-houtlook-vloeren",
    label: "Visgraat houtlook vloeren",
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop&auto=format",
    alt: "Vloertegels in een woonkamer",
    desc: "De warme uitstraling van hout, met het gemak van een tegel.",
  },
  {
    slug: "120x120-tegels",
    label: "120×120 tegels",
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop&auto=format",
    alt: "Moderne badkamer met grote grijze tegels",
    desc: "Groot formaat met rustige lijnen, voor een moderne en luxe uitstraling.",
  },
  {
    slug: "badkamers",
    label: "Badkamers",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop&auto=format",
    alt: "Badkamer met betegelde douche",
    desc: "Van vloer tot wand. Creëer een badkamer die stijl, comfort en luxe samenbrengt.",
  },
];
