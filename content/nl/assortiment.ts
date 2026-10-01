import type { Focus } from "./image-focus";

export type AssortimentItem = {
  /** Stable id. Used as the React key, and as the route segment when these
   *  categories grow their own pages — so it must not change once published. */
  slug: string;
  label: string;
  /** Photo of the company's own work, in public/images/<category>/. */
  url: string;
  /** Which part of the photo to keep when the landscape card crops it. */
  focus?: Focus;
  /** Describes the photo, not the category. The label is already on the card,
   *  so repeating it here would waste the slot for screen readers and image
   *  search alike. */
  alt: string;
  desc: string;
  /** Style page this card links to, when one exists. Cards without a match stay
   *  plain, because a link to nothing is worse than no link. */
  href?: string;
};

/**
 * The six categories Mark asked for: what a buyer actually shops for (stock,
 * format, style, finished room) rather than material categories like
 * floor/wall/outdoor.
 *
 * Every photo here is Nelissen's own work, supplied October 2026. Each folder
 * also contains a `thumbnail.jpg`, which is the image Mark picked himself — used
 * here except for visgraat, where his pick showed straight-laid planks rather
 * than a herringbone pattern and so contradicted the card's own title.
 */
export const assortiment: AssortimentItem[] = [
  {
    slug: "voorraad-tegels",
    label: "Voorraad tegels",
    url: "/images/voorraad-tegels/thumbnail.jpg",
    alt: "Pallets met tegels op voorraad in het magazijn",
    desc: "Direct leverbare tegels uit voorraad. Bekijk ons assortiment voor iedere stijl en toepassing.",
  },
  {
    slug: "slabs",
    label: "Slabs",
    url: "/images/slabs/thumbnail.jpg",
    // The slab fills the upper half of the frame; the bottom is an unfinished
    // floor screed.
    focus: "top",
    alt: "Wand bekleed met een slab met uitgesproken marmertekening",
    desc: "Grote en luxe uitstraling met minimale voegen. Ontdek onze slabs voor de perfecte badkamer.",
    href: "/assortiment/slabs-grootformaat",
  },
  {
    slug: "handvorm-tegels",
    label: "Handvorm tegels",
    url: "/images/handvorm-tegels/thumbnail.jpg",
    alt: "Terracotta handvormtegels in visgraatverband boven een bad",
    desc: "Karakter in iedere tegel. Ambachtelijke uitstraling met een unieke, levendige look.",
    href: "/assortiment/handvorm-tegels",
  },
  {
    slug: "visgraat-houtlook-vloeren",
    label: "Visgraat houtlook vloeren",
    // Deliberately not houtlook/thumbnail.jpg: that photo shows planks in
    // wisselend verband, not visgraat, which would contradict the card title.
    url: "/images/houtlook/3b731ae1-6c89-4bf5-ab7b-741b5fa5318a.jpg",
    focus: "bottom",
    alt: "Houtlook vloertegels in visgraatverband bij een openslaande deur",
    desc: "De warme uitstraling van hout, met het gemak van een tegel.",
    href: "/assortiment/houtlook-tegels",
  },
  {
    slug: "120x120-tegels",
    label: "120×120 tegels",
    url: "/images/120x120/thumbnail.jpg",
    focus: "center",
    alt: "Woonkamer met grijze vloertegels van 120 bij 120 centimeter",
    desc: "Groot formaat met rustige lijnen, voor een moderne en luxe uitstraling.",
    href: "/assortiment/slabs-grootformaat",
  },
  {
    slug: "badkamers",
    label: "Badkamers",
    url: "/images/badkamers/thumbnail.jpg",
    alt: "Badkamer met betonlook tegels op vloer en wanden en verzonken baden",
    desc: "Van vloer tot wand. Creëer een badkamer die stijl, comfort en luxe samenbrengt.",
    href: "/assortiment/badkamertegels",
  },
];
